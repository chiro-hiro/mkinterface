#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');
var { exec } = require('child_process');
var supportSolc5 = false;

//Read json from file
function readJSON(file) {
  return JSON.parse(fs.readFileSync(file));
}

function isMemoryType(type) {
  return (/.+\[\]/g).test(type) || type === 'bytes' || type === 'string';
}

//Build inputs
function inputBuild(input) {
  var stack = [];
  if (typeof input !== 'undefined' && input.length > 0) {
    for (var index in input) {
      var element = input[index];
      if (supportSolc5 && isMemoryType(element.type)) {
        stack.push([element.type, 'memory', ((element.indexed) ? 'indexed' : ''), element.name].join(' '));
      } else {
        stack.push([element.type, ((element.indexed) ? 'indexed' : ''), element.name].join(' '));
      }
    }
    return '(' + stack.join(', ') + ')';
  }
  return '()';
}

//Build outputs
function outputBuild(output) {
  var stack = [];
  if (typeof output !== 'undefined' && output.length > 0) {
    for (var index in output) {
      var element = output[index];
      if (element.name !== '') {
        if (supportSolc5 && isMemoryType(element.type)) {
          stack.push([element.type, 'memory', ((element.indexed) ? 'indexed' : ''), element.name].join(' '));
        } else {
          stack.push([element.type, ((element.indexed) ? 'indexed' : ''), element.name].join(' '));
        }
      } else {
        if (isMemoryType(element.type)) {
          stack.push([element.type, 'memory'].join(' '));
        } else {
          stack.push(element.type);
        }
      }
    }
    return 'returns (' + stack.join(', ') + ')';
  }
  return '';
}

//Build modifier
function modifierBuild(element) {
  var stack = [];
  stack.push('public');
  if (element.constant) stack.push('view');
  if (element.payable) stack.push('payable');
  return stack.join(' ');
}

//Render interface
function interfaceBuild(jsonData, subject) {
  if (jsonData.abi) {
    for (var index in jsonData.abi) {
      var element = jsonData.abi[index];
      if (element.type === 'function') {
        var method = element.type + ' '
          + element.name
          + inputBuild(element.inputs) + ' '
          + modifierBuild(element) + ((element.outputs.length > 0) ? ' ' : '')
          + outputBuild(element.outputs) + ';';
        if (subject.functionNames.indexOf(element.name) < 0) {
          subject.functionNames.push(element.name);
          subject.functions.push(method);
        }
      } else if (element.type === 'event') {
        var emit = element.type + ' '
          + element.name
          + inputBuild(element.inputs) + ';'
        if (subject.eventNames.indexOf(element.name) < 0) {
          subject.events.push(emit);
          subject.eventNames.push(element.name);
        }
      }
    }
  }
}

function scanDir(scanPath, filelist) {
  var filelist = filelist || [];
  var dirs = fs.readdirSync(scanPath);
  for (var i = 0; i < dirs.length; i++) {
    var _childPath = path.resolve(scanPath, dirs[i])
    if (fs.statSync(_childPath).isDirectory()) {
      scanDir(_childPath, filelist);
    } else {
      filelist.push(_childPath);
    }
  }
  return filelist;
}

function MainProc() {
  var currentPath = process.cwd();
  var buildPath = path.resolve(currentPath, 'build');
  var contractsPath = path.resolve(currentPath, 'contracts');
  var interfacesPath = path.resolve(currentPath, 'interfaces');
  if (fs.existsSync(buildPath)) {
    if (fs.existsSync(contractsPath)) {
      if (!fs.existsSync(interfacesPath)) {
        fs.mkdirSync(interfacesPath);
      }
      if (fs.existsSync(interfacesPath)) {
        //Filter json file
        var filelist = scanDir(buildPath).filter(i => (/.+json$/i).test(i));
        for (var i = 0; i < filelist.length; i++) {
          let jsonData = readJSON(filelist[i]);
          let contractName = jsonData.contractName;
          let pragmas = jsonData.source.match(/pragma solidity[\ \^0-9\.\<\>\=]+;/ig);
          var contractInferfaceName = jsonData.contractName + 'Interface';
          var contractInferfaceFile = jsonData.contractName + 'Interface.sol';
          if (jsonData.contractName.indexOf('Interface') < 0) {
            var stack = [`${pragmas[0]}\n`, `contract ${contractInferfaceName} {`];
            var subject = { events: [], eventNames: [], functions: [], functionNames: [] };
            interfaceBuild(jsonData, subject);
            stack.push('  //Events');
            stack.push('  ' + subject.events.join('\n  '));
            stack.push('  //Public methods');
            stack.push('  ' + subject.functions.join('\n  '));
            stack.push('}');
            process.stdout.write('Built interface for ' + contractName + '\n');
            fs.writeFileSync(path.join(interfacesPath, contractInferfaceFile), stack.join('\n'));
          }
        }
      } else {
        process.stderr.write("Interface don't have write access.\n");
      }
    } else {
      process.stderr.write("Contracts folder was not found, is it a truffle project?.\n");
    }
  } else {
    process.stderr.write("Build folder was not found, please try `truffle compile all` first.\n");
  }
}

function configuration() {
  let currentPath = process.cwd();
  let configFile = path.join(currentPath, 'mkinterface.json');
  let config = fs.existsSync(configFile) ? readJSON(configFile) : {};
  supportSolc5 = config.supportSolc5 || false;
  let solFiles = scanDir(currentPath).filter(i => (/.+sol$/i).test(i));
  for (let i = 0; i < solFiles.length; i++) {
    let fileName = solFiles[i];
    let fileContent = fs.readFileSync(fileName).toString();
    let pragmaRegex = /pragma solidity[\ \^0-9\.\<\>\=]+;/ig;
    let pragmas = fileContent.match(pragmaRegex);
    let foundPragma = Array.isArray(pragmas);
    if (foundPragma) process.stdout.write(`Found ${fileContent.match(pragmaRegex).join(',')} in ${fileName}\n`);
    //Update ranger of version
    if (typeof config.minVersion !== 'undefined' && typeof config.maxVersion !== 'undefined') {
      fs.writeFileSync(fileName, fileContent.replace(pragmaRegex, `pragma solidity >= ${config.minVersion} <= ${config.maxVersion};`));
      if (foundPragma) process.stdout.write(`  --> pragma solidity >= ${config.minVersion} <= ${config.maxVersion};\n`);
    } else if (typeof config.minVersion !== 'undefined' && typeof config.maxVersion === 'undefined') {
      //Change pragma version to new style
      if (typeof config.supportSolc5 !== 'undefined' && config.supportSolc5) {
        fs.writeFileSync(fileName, fileContent.replace(pragmaRegex, `pragma solidity >= ${config.minVersion};`));
        if (foundPragma) process.stdout.write(`  --> pragma solidity >= ${config.minVersion}\n`);
      }
      //Update version but keep old style
      else if (typeof config.supportSolc5 !== 'undefined' && !config.supportSolc5) {
        fs.writeFileSync(fileName, fileContent.replace(pragmaRegex, `pragma solidity ^${config.minVersion};`));
        if (foundPragma) process.stdout.write(`  --> pragma solidity ^${config.minVersion};\n`);
      }
    }
  }

  //Start truffle compiler
  process.stdout.write('Start `truffle compile all`\n');

  //Compile all Solidity files
  let truffleCompile = exec('truffle compile all', {
    cwd: process.cwd()
  });

  //Print stdout of truffle
  truffleCompile.stdout.on('data', (data) => {
    process.stdout.write(data);
  });

  //On truffle exit
  truffleCompile.on('close', (code, signal) => {
    if (!signal) {
      if (code !== 0) {
        process.stderr.write('Truffle was not success to compile source code\n');
      }
    }
    MainProc();
  });
}

configuration();



#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');

//Read json from file
function readJSON(file) {
    return JSON.parse(fs.readFileSync(file));
}

//Build inputs
function inputBuild(input) {
    var stack = [];
    if (typeof input !== 'undefined' && input.length > 0) {
        for (var index in input) {
            var element = input[index];
            stack.push(element.type + ((element.indexed) ? ' indexed ' : ' ') + element.name);
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
                stack.push(element.type + ((element.indexed) ? ' indexed ' : ' ') + element.name);
            } else {
                stack.push(element.type);
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

function scanDir(scanPath, filelist){
    var filelist = filelist || [];
    var dirs = fs.readdirSync(scanPath);
    for(var i = 0; i < dirs.length; i++){
        var _childPath = path.resolve(scanPath, dirs[i])
        if(fs.statSync(_childPath).isDirectory()){
            scanDir(_childPath, filelist);
        }else{
            filelist.push(_childPath);
        }
    }
    return filelist;

}

(function () {
    var currentPath = process.cwd();
    var buildPath = path.resolve(currentPath, 'build');
    var contractsPath = path.resolve(currentPath, 'contracts');
    var interfacesPath = path.resolve(contractsPath, 'interfaces');
    if(fs.existsSync(buildPath)){
        if(fs.existsSync(contractsPath)){
            if(!fs.existsSync(interfacesPath)){
                fs.mkdirSync(interfacesPath);
            }
            if(fs.existsSync(interfacesPath)){
                var filelist = scanDir(buildPath);
                for(var i = 0; i < filelist.length; i++){
                    var jsonData = readJSON(filelist[i]);
                    var contractName = jsonData.contractName;
                    var contractInferfaceName = jsonData.contractName + 'Interface';
                    var contractInferfaceFile = jsonData.contractName + 'Interface.sol';
                    if(jsonData.contractName.indexOf('Interface') < 0) {
                        var stack = ['pragma solidity ^0.4.24;\n', 'contract ' + contractInferfaceName + ' {'];
                        var subject = { events: [], eventNames: [], functions: [], functionNames: [] };
                        interfaceBuild(jsonData, subject);
                        stack.push('    //Events');
                        stack.push('    ' + subject.events.join('\n    '));
                        stack.push('    //Public methods');
                        stack.push('    ' + subject.functions.join('\n    '));
                        stack.push('}');
                        process.stdout.write('Built interface for ' + contractName + '\n');
                        fs.writeFileSync(path.join(interfacesPath, contractInferfaceFile), stack.join('\n'));
                    }
                }
            }else{
                process.stderr.write("Interface don't have write access.\n");
            }
        }else{
            process.stderr.write("Contracts folder was not found, is it a truffle project?.\n");
        }
    }else{
        process.stderr.write("Build folder was not found, please try `truffle compile` first.\n");
    }
})();

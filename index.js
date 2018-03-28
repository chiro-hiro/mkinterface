#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');
var { exec } = require('child_process');
var truffle = exec('truffle compile');

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
    if (element.constant) stack.push('constant');
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
                    + modifierBuild(element) + ((element.outputs.length > 0) ? ' ': '')
                    + outputBuild(element.outputs) + ';';
                if (subject.functionNames.indexOf(element.name) < 0) {
                    subject.functionNames.push(element.name);
                    subject.functions.push(method);
                }
            } else if(element.type === 'event') {
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

//Make interface and save to file
function makeInterface(config) {
    for (var index in config) {
        var conf = config[index];
        var stack = ['pragma solidity ' + conf.solv + ';\n', 'contract ' + conf.contract + ' {'];
        var subject = { events: [], eventNames: [], functions: [], functionNames: [] };
        for (var fileIndex in conf.entries) {
            interfaceBuild(readJSON(path.join(conf.path, conf.entries[fileIndex])), subject);
        }
        stack.push('    //Events');
        stack.push('    ' + subject.events.join('\n    '));
        stack.push('    //Public methods');
        stack.push('    ' + subject.functions.join('\n    '));
        stack.push('}');
        console.log(`${conf.output} built successful`);
        fs.writeFileSync(conf.output, stack.join('\n'));
    }
}

truffle.stdout.on('data', (data) => {
    console.log(data.toString());
});

truffle.stderr.on('data', (data) => {
    console.log(data.toString());
});

truffle.on('exit', (code) => {
    if (code === 0) {
        if (fs.existsSync('./mkiconf.json')) {
            var configuration = readJSON('./mkiconf.json');
            if (configuration.length > 0) {
                makeInterface(configuration);
            }
        }
    }else{
        throw new Error('Truffle compiler was not working');
    }
});



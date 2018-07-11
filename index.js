#!/usr/bin/env node

'use strict';
var fs = require('fs');
var path = require('path');

//Conver string version to numberic
function toVersion(version) {
    return version.replace('^', '').split('.').map((item) => {
        return parseInt(item);
    });
}

//Compare version string a to b
function versionCompare(a, b) {
    a = toVersion(a);
    b = toVersion(b);
    let c = [];
    let r = 0;
    for (let i = 0; i < a.length; i++) {
        c[i] = a[i] - b[i];
    }
    for (let i = 0; i < c.length; i++) {
        if(c[i] > 0){
            r = 1;
            break;
        }
        if(c[i] < 0){
            r = -1;
            break;
        }
    }
    return r;
}

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

//Make interface and save to file
function makeInterface(config) {
    for (var index in config) {
        var conf = config[index];
        if (fs.existsSync(path.join(conf.path, conf.entry))) {
            var stack = ['pragma solidity ' + conf.solv + ';\n', 'contract ' + conf.contract + ' {'];
            var subject = { events: [], eventNames: [], functions: [], functionNames: [] };
            interfaceBuild(readJSON(path.join(conf.path, conf.entry)), subject);
            stack.push('    //Events');
            stack.push('    ' + subject.events.join('\n    '));
            stack.push('    //Public methods');
            stack.push('    ' + subject.functions.join('\n    '));
            stack.push('}');
            console.log(`${conf.output} built successful`);
            fs.writeFileSync(conf.output, stack.join('\n'));
        } else {
            console.log(`${path.join(conf.path, conf.entry)} wasn't existed`);
        }
    }
}

if (fs.existsSync('./mkiconf.json')) {
    var configuration = readJSON('./mkiconf.json');
    if (configuration.length > 0) {
        makeInterface(configuration);
    }
}
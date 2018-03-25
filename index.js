#!/usr/bin/env node

var fs = require('fs');
var os = require('os');
var path = require('path');
var solc = require('solc');
var yargs = require('yargs')
    .usage('Usage: $0 [options] [input_file...]')
    .option('version', {
        describe: 'Show version and exit.',
        type: 'boolean'
    })
    .option('output-dir', {
        alias: 'o',
        describe: 'Output directory for the contracts.',
        type: 'string'
    })
    .global(['version', 'optimize'])
    .version('mkinterface 1.0.1')
    .showHelpOnFail(false, 'Specify --help for available options')
    .help();

var argv = yargs.argv;
var files = argv._;
var destination = argv['output-dir'] || '.'

if (!fs.existsSync(destination)) {
    fs.mkdirSync(destination);
}

if (!fs.existsSync(destination)) {
    console.log('Can not create destination');
    process.exit(2);
}

if (files.length <= 0) {
    console.log('There are no input files');
    process.exit(3);
}

var input = {};
var fileName = '';
var filePath = '';

for (index in files) {
    filePath = files[index];
    if (!fs.existsSync(filePath)) {
        console.log('File', filePath, 'not existed.');
        process.exit(1);
    }
    //Get basename
    fileName = path.basename(filePath);
    //Build the input
    input[fileName] = fs.readFileSync(filePath).toString();
}

var output = solc.compile({sources: input}, 1, function(){

});

console.log(input, output);
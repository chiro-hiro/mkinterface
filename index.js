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

console.log(path.resolve(destination));

if(files.length > 0){
    files.forEach((filePath)=>{
        if(!fs.existsSync(filePath)){
            console.log('File', filePath, 'not existed.');
            process.exit(1);
        }else{
            var fullFilePath = path.resolve(filePath);
            var fileName = path.basename(filePath, '.sol');
            console.log(fileName, fullFilePath);
        }
    });
}
#! /usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import figlet from 'figlet';

//add the following line
const program = new Command();

console.log(figlet.textSync("Conductor DevTools"));

program
  .version("1.0.0")
  .description("CLI for creating conductor client app")
  .option("-l, --lang  <value>", "set the programming language")
  .option("-a, --app", "create an client app from boilerplate")
  .option("-w, --worker", "create a worker app from boilerplate")
  .option("-n, --name <value>", "name of the client app")
  .option("-t, --task <value>", "name of the task associated to the worker")
  .parse(process.argv);

const options = program.opts();

const createAppProject = (lang: string, name: string) => {
    fs.mkdirSync(name);
}

const createWorkerProject = (lang: string, name: string, task: string) => {
    console.log('creating worker project...');
    fs.mkdirSync(name);
    if (lang === "javascript") {
        fetch('https://raw.githubusercontent.com/conductor-sdk/boilerplates/initial-structure/javascript/workers/index.js').then( resIndex => resIndex.text()).then( dataIndex => {
            console.log('Creating index.js file...');
            dataIndex = dataIndex.replace( "taskname", task );
            fs.writeFileSync( name + '/index.js', dataIndex );            
            fetch('https://raw.githubusercontent.com/conductor-sdk/boilerplates/initial-structure/javascript/workers/package.json').then( resPackage => resPackage.text()).then( dataPackage => {
                console.log('Creating package.json file...');
                dataPackage = dataPackage.replace( "appname", name );
                fs.writeFileSync( name + '/package.json', dataPackage );
                console.log(name + ' worker project created successfully.');
            });
        });
    } else {
        console.log('ERROR: Unsupported programming language.');
    }
}

if (options.app) {
    createAppProject(options.lang, options.name);
} else if (options.worker) {
    createWorkerProject(options.lang, options.name, options.task);
}
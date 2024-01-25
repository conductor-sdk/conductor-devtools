#! /usr/bin/env node

import { Command } from 'commander';
import fs from 'fs';
import path from 'path';
import figlet from 'figlet';

const reset = "\x1b[0m";

const log = {
  green: (text: string) => console.log("\x1b[32m" + text + reset),
  red: (text: string) => console.log("\x1b[31m" + text + reset),
  blue: (text: string) => console.log("\x1b[34m" + text + reset),
  white: (text: string) => console.log("\x1b[37m" + text + reset),
};

const program = new Command();

console.log(figlet.textSync("Conductor DevTools"));

program
  .version("1.0.0")
  .description("CLI for creating conductor client app")
  .option("-l, --lang  <value>", "set the programming language")
  .option("-ty, --type  <value>", "type of boilerplate (worker/app)")
  .option("-n, --name <value>", "name of the client app")
  .option("-ta, --task <value>", "name of the task associated to the worker")
  .option("-b, --boilerplate <value>", "name of boilerplate")
  .parse(process.argv);

const options = program.opts();

const createProject = (options: any) => {
    try {
        log.white('creating ' + options.name + ' ' + options.type + ' project...');
        fs.mkdirSync(options.name);
        
        const bpl = options.boilerplate ? options.boilerplate : 'core';
        fetch('https://raw.githubusercontent.com/conductor-sdk/boilerplates/main/'+options.lang+'/'+options.type+'/'+bpl+'/bp.json').then( res => res.text()).then( data => {
            const def = JSON.parse(data);
            def.files.forEach( (element: { name: string, fields: [{ name: string, attribute: string}] }) => {
                fetch('https://raw.githubusercontent.com/conductor-sdk/boilerplates/main/'+options.lang+'/'+options.type+'/'+bpl+'/'+element.name).then( resElement => resElement.text()).then( dataElement => {
                    log.white('Creating ' + element.name + ' file...');
                    element.fields.forEach( (fieldElement: { name: string, attribute: string }) => {
                        dataElement = dataElement.replace( fieldElement.name, options[fieldElement.attribute] );
                    })
                    fs.writeFileSync( options.name + '/' + element.name, dataElement );
                    log.green(element.name + ' file created successfully.');
                });
            });
        });
    } catch (error) {
        log.red( 'Error generating project from boilerplate');
    }
}

createProject(options);
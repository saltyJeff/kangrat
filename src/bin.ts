#! /usr/bin/env node
import * as program from 'commander';
import * as path from 'path';
import {Kangrat} from './kangratschema';
import build from './lib/build';
import * as fs from 'fs-extra';
import {validate} from 'jsonschema';
import * as winston from 'winston';

require('source-map-support').install();

program
	.version('1.0.0')
	.option('-d, --dir <directory>', 'the path to the folder where the savefile is located')
	.option('-l, --loglevel <loglevel>', 'the log level to print to screen')
	.parse(process.argv);
let startTime = Date.now();
//validate params
if(!program.dir) {
	program.dir = process.cwd();
}
winston.configure({
	level: program.loglevel,
	transports: [
		new (winston.transports.Console)()
	]
});
//begin
(async () => {
	winston.info(`Beginning kangrat build process @ ${program.dir}`);
	let saveFile = path.resolve(program.dir, 'kangratsave.json');
	if(!fs.existsSync(saveFile)) {
		console.error(`No such file found @ ${saveFile}`);
		process.exit(1);
	}
	let save = validate(require(saveFile), require(path.resolve(__dirname, '../../kangratschema.json')));
	if(save.valid) {
		await build(save.instance, program.dir);
		winston.info(`Build complete in ${(Date.now() - startTime)/1000} sec`);
	}
	else {
		let errs = "";
		save.errors.forEach((val) => {
			errs += val + '\n';
		});
		winston.error(
	`The save file @ ${saveFile} is invalid
	-------------------------------------------
	Errors:
	${errs}`);
		process.exit(1);
	}
})();


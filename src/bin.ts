#! /usr/bin/env node
import * as program from 'commander';
import * as path from 'path';
import {Kangrat} from './kangratschema';
import build from './build';
import * as fs from 'fs-extra';
import {validate} from 'jsonschema';
import * as winston from 'winston';

require('source-map-support').install();

program
	.version('1.0.0')
	.option('-i, --input <input>', 'the path where the savefile is located')
	.option('-l, --loglevel <loglevel>', 'the log level to print to screen')
	.parse(process.argv);
let startTime = Date.now();
//validate params
if(!program.input) {
	program.input = path.resolve(process.cwd(), 'kangratsave.json');
}
winston.configure({
	level: program.loglevel,
	transports: [
		new (winston.transports.Console)()
	]
});
//begin
(async () => {
	winston.info(`Beginning kangrat build process @ ${program.input}`);
	if(!fs.existsSync(program.input)) {
		console.error(`No such file found @ ${program.input}`);
		process.exit(1);
	}
	let save = validate(require(program.input), require(path.resolve(__dirname, '../../kangratschema.json')));
	if(save.valid) {
		await build(save.instance, path.dirname(program.input));
		winston.info(`Build complete in ${(Date.now() - startTime)/1000} sec`);
	}
	else {
		let errs = "";
		save.errors.forEach((val) => {
			errs += val + '\n';
		});
		winston.error(
	`The save file @ ${program.input} is invalid
	-------------------------------------------
	Errors:
	${errs}`);
		process.exit(1);
	}
})();


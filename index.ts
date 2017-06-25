#! /usr/bin/env node
import {SaveFile} from './SaveFile';
import {KangratBuild} from './KangratBuild';
import {SafetyCheck} from './SafetyCheck';
import * as FileTypes from './FileTypes';
import * as path from 'path';
import * as program from 'commander';

program
	.version('1.0.0')
	.option('-f, --from <dir>', 'Directory to read from')
	.option('-t, --to <dir>', 'Directory to write to')
	.option('-d, --dangerous', 'Throw switch to disable safety checks')
	.option('-q, --quiet', 'Run in no-output mode')
	.parse(process.argv);
if(program.quiet) {
	console.log = () => {};
}
if(!program.from) {
	console.log('switch -f not found, run kangrat --help for help');
	process.exit(1);
}
if(!program.to) {
	console.log('switch -t not found, run kangrat --help for help');
	process.exit(1);
}
async function run (from: string, to: string, dangerous: boolean = false) {
	let save: SaveFile = new SaveFile();
	await save.readFrom(from);
	let build: KangratBuild = new KangratBuild(save, to);
	await build.buildAll(dangerous);
};
run(path.resolve(process.cwd(), program.from), path.resolve(process.cwd(), program.to), program.dangerous);

//this is in case anyone wants the classes
export {
	SaveFile,
	SafetyCheck,
	run as build,
	FileTypes as FileTypes
}
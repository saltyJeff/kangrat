#! /usr/bin/env node
import {SaveFile} from './SaveFile';
import {NBBuild} from './NBBuild';
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
(async () => {
	let save: SaveFile = new SaveFile();
	await save.readFrom(path.resolve(process.cwd(), program.from));
	let build: NBBuild = new NBBuild(save, path.resolve(process.cwd(), program.to));
	await build.buildAll(!program.dangerous);
})();

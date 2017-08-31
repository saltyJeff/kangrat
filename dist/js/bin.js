#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const program = require("commander");
const path = require("path");
const build_1 = require("./build");
const fs = require("fs-extra");
const jsonschema_1 = require("jsonschema");
const winston = require("winston");
require('source-map-support').install();
program
    .version('1.0.0')
    .option('-i, --input <input>', 'the path where the savefile is located')
    .option('-l, --loglevel <loglevel>', 'the log level to print to screen')
    .parse(process.argv);
let startTime = Date.now();
if (!program.input) {
    program.input = path.resolve(process.cwd(), 'kangratsave.json');
}
winston.configure({
    level: program.loglevel,
    transports: [
        new (winston.transports.Console)()
    ]
});
(() => __awaiter(this, void 0, void 0, function* () {
    winston.info(`Beginning kangrat build process @ ${program.input}`);
    if (!fs.existsSync(program.input)) {
        console.error(`No such file found @ ${program.input}`);
        process.exit(1);
    }
    let save = jsonschema_1.validate(require(program.input), require(path.resolve(__dirname, '../../kangratschema.json')));
    if (save.valid) {
        yield build_1.default(save.instance, path.dirname(program.input));
        winston.info(`Build complete in ${(Date.now() - startTime) / 1000} sec`);
    }
    else {
        let errs = "";
        save.errors.forEach((val) => {
            errs += val + '\n';
        });
        winston.error(`The save file @ ${program.input} is invalid
	-------------------------------------------
	Errors:
	${errs}`);
        process.exit(1);
    }
}))();
//# sourceMappingURL=bin.js.map
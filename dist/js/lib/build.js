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
const fs = require("fs-extra");
const winston = require("winston");
const path = require("path");
const bower = require("bower");
const IMPORTS = `<!--KANGRAT-IMPORTS-->`;
const BINDINGS = `[/*KANGRAT-BINDINGS*/]`;
const ROOT = `<!--KANGRAT-ROOT-->`;
const ID = `kangratId`;
function build(pageSchema, outDir, installDeps = true) {
    return __awaiter(this, void 0, void 0, function* () {
        winston.debug(`ensuring ${outDir} exists`);
        fs.ensureDirSync(outDir);
        let bpPath = path.resolve(outDir, pageSchema.basePage);
        winston.debug(`ensuring basepage ${bpPath} exists`);
        let basePage;
        if (fs.existsSync(bpPath)) {
            basePage = fs.readFileSync(bpPath, 'UTF-8');
        }
        else {
            winston.error(`base page @ ${bpPath} not found`);
            throw new Error(`base page @ ${bpPath} not found`);
        }
        for (let pageName in pageSchema.pages) {
            winston.info(`Page creation of ${pageName.toLocaleUpperCase()} has begun`);
            if (!pageSchema.pages.hasOwnProperty(pageName))
                continue;
            winston.debug(`creating html file for ${pageName}`);
            const filePath = path.resolve(outDir, pageName + '.html');
            fs.ensureFileSync(filePath);
            let elemsAndBindings = getBindingsAndElements(pageSchema, pageName);
            let pageText = basePage
                .replace(IMPORTS, getImportString(pageSchema, pageName))
                .replace(BINDINGS, elemsAndBindings.bindings)
                .replace(ROOT, elemsAndBindings.elements);
            winston.debug(`writing page text to file ${filePath}`);
            fs.writeFileSync(filePath, pageText, "UTF-8");
            winston.info(`Page creation of ${pageName.toLocaleUpperCase()} has completed`);
        }
        if (installDeps) {
            yield installBowerDeps(pageSchema, outDir);
        }
    });
}
exports.default = build;
function getImportString(pageSchema, pageName) {
    let importStr = "";
    let imported = {};
    let templateElems = pageSchema.pages[pageName].template;
    for (let templateElement of templateElems) {
        if (!imported[templateElement.elementTag]) {
            imported[templateElement.elementTag] = true;
            if (!!pageSchema.elements[templateElement.elementTag]) {
                importStr +=
                    `<link rel="import" href="${'bower_components/' + pageSchema.elements[templateElement.elementTag].elementPath}">
				`;
            }
        }
    }
    winston.debug(`import string for ${pageName} set to:
${importStr}`);
    return importStr;
}
function getBindingsAndElements(pageSchema, pageName) {
    let toReturn = {
        bindings: "",
        elements: ""
    };
    let bindings = [];
    let templateElems = pageSchema.pages[pageName].template;
    for (let i = 0; i < templateElems.length; i++) {
        let templateElem = templateElems[i];
        let id = ID + i;
        toReturn.elements +=
            `<${templateElem.elementTag} id="${id}" />
		`;
        for (let fieldName in templateElem.propertyBindings) {
            if (!templateElem.propertyBindings.hasOwnProperty(fieldName))
                continue;
            bindings.push({
                id: id,
                field: fieldName,
                property: templateElem.propertyBindings[fieldName]
            });
        }
    }
    winston.debug(`element string for ${pageName} set to:
${toReturn.elements}`);
    toReturn.bindings = JSON.stringify(bindings);
    winston.debug(`binding string for ${pageName} set to:
${toReturn.bindings}`);
    return toReturn;
}
function installBowerDeps(pageSchema, outDir) {
    return __awaiter(this, void 0, void 0, function* () {
        winston.info('installing bower dependencies');
        let elements = pageSchema.elements;
        let bowerPkgs = [];
        for (let elem in elements) {
            if (!elements.hasOwnProperty(elem))
                continue;
            if (bowerPkgs.indexOf(elements[elem].bowerPackage) == -1) {
                bowerPkgs.push(elements[elem].bowerPackage);
            }
        }
        if (bowerPkgs.length == 0) {
            winston.info(`there wasn't any deps to install!`);
            return;
        }
        winston.debug(`bower dependencies to install:
${JSON.stringify(bowerPkgs)}`);
        if (!fs.existsSync(path.resolve(outDir, 'bower.json'))) {
            fs.writeFileSync(path.resolve(outDir, 'bower.json'), createDefaultBower(pageSchema), 'UTF-8');
        }
        yield new Promise((res, rej) => {
            bower
                .commands
                .install(bowerPkgs, { save: true }, {
                cwd: outDir,
                directory: path.resolve(outDir, 'bower_components')
            })
                .on('log', (log) => {
                winston.debug(log);
            })
                .on('error', (err) => {
                winston.error(err);
                res();
            })
                .on('end', (installed) => {
                winston.info('bower dependencies installed');
                winston.debug(installed);
                res();
            });
        });
    });
}
function createDefaultBower(pageSchema) {
    return (`{
	"name": "${pageSchema.siteName}",
	"description": "Autogenerated by kangrat for ${pageSchema.siteName}",
	"private": true
}
`);
}
//# sourceMappingURL=build.js.map
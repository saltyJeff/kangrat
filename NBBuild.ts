import *  as path from 'path';
import {SaveFile} from './SaveFile';
import * as fs from 'fs-promise';
import {PageElement, Binding, ElementManifest, Field, recognizedTypes} from './FileTypes';
import {SafetyCheck} from './SafetyCheck';
import * as NBerrs from './ErrorTypes';
interface BindingCommand {
    value: string;
    elemId: string;
    property: string;
}
//consts that get replaced (site cannot have these)
const NODEBLOG_ROOT = '<!--NODEBLOG_ROOT-->';
const NODEBLOG_BINDINGS = '[/*NODEBLOG_BINDINGS*/]';
const NODEBLOG_IMPORT = '<!--NODEBLOG_IMPORT-->';
const divider = '-'.repeat(48);
export class NBBuild {
    private save: SaveFile;
    private outputDir: string;
    /**
     * Creates new NBBuild instance
     * @param save the save file to read from
     * @param outputDir the directory to write to
     */
    constructor(save: SaveFile, outputDir: string) {
        this.save = save;
        this.outputDir = outputDir;
    }
    /**
     * Builds the project!
     * @param validate check (true) or not check (false) the files to see if the types match up
     */
    public async buildAll(validate: boolean) {
        let startTime = Date.now();
        console.log(divider);
        console.log(`Building site: ${this.save.getMetadata().name} (v${this.save.getMetadata().version})\noutput: ${this.outputDir}`);
        console.log(divider);
        await fs.ensureDir(this.outputDir);
        if(validate) {
            console.log('Running static checks on site');
            await new SafetyCheck(this.save).checkAll();
            console.log('Everything checks out! (you deserve a pat on the back)');
            console.log(divider);
        }
        let buildPromises: Array<Promise<any>> = [];
        for(let schemaName of await this.save.getSchemaNames()) {
            buildPromises.push(this.buildTemplate(schemaName));
        }
        await Promise.all(buildPromises);
        console.log('copying dependencies');
        await this.copyDependencies();
        console.log('copying data');
        await this.copyData();
        console.log(divider);
        console.log(`Build complete in ${(Date.now()-startTime)/1000} seconds`);
        console.log(divider);
    }
    private async buildTemplate (schemaName: string) {
        console.log('building template: '+schemaName);
        //needed from save file
        let schema = await this.save.getSchema(schemaName);
        let elements = await this.save.getElementManifests();
        let template = await this.save.getTemplate(schemaName);
        //holders for final result
        let pageElements = '';
        let bindings: BindingCommand[] = [];
        let neededImports = '';
        let currentId = 0;
        //build loop
        for(let pgElement of template) {
            let builtIn = pgElement.elementTag.indexOf('-') == -1;
            for(let bind of pgElement.bindings) {
                bindings.push({value: bind.value, property: bind.property, elemId: 'nb'+currentId});
            }
            //well if nothing's blown up yet
            pageElements += `<div class="nbelement"><${pgElement.elementTag} id="${'nb'+(currentId++)}" /></div>\n`;
            if(!builtIn) {
                let element = elements.get(pgElement.elementTag);
                if(element.importType == 'script') {
                    neededImports += `<script src="${element.href}"></script>\n`
                }
                else if(element.importType == 'html') {
                    neededImports += `<link rel="import" href="${element.href}">\n`;
                }
            }
        }
        console.log('writing template to page');
        await this.writePage(schemaName, pageElements, bindings, neededImports);
    }
    private async writePage(schema: string, pageElements: string, bindings: BindingCommand[], neededImports: string) {
        let originalText = await this.save.getBasePage();
        originalText = originalText.replace(NODEBLOG_ROOT, pageElements).replace(NODEBLOG_BINDINGS, JSON.stringify(bindings)).replace(NODEBLOG_IMPORT, neededImports);
        await fs.ensureFile(path.resolve(this.outputDir, schema+'.html'));
        await fs.writeFile(path.resolve(this.outputDir, schema+'.html'), originalText, 'UTF-8');
    }
    private async copyDependencies() {
        await fs.copy(path.resolve(this.save.savePath, 'elements'), path.resolve(this.outputDir, 'elements'));
    }
    private async copyData () {
        await fs.copy(this.save.dataPath, path.resolve(this.outputDir, 'data'));
    }
}
interface SortHolder {
    value: number;
    filename: string;
}
//helper functions
function getFieldType(schema: Field[], name: string) {
    for(let field of schema) {
        if(field.name == name) {
            return field.type;
        }
    }
    return null;
}
function getPropertyType(element: ElementManifest, name: string) {
    if(element.properties[name] != undefined) {
        return element.properties[name];
    }
    return null;
}

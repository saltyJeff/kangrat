import *  as path from 'path';
import {SaveFile} from './SaveFile';
import * as fs from 'fs-extra';
import {PageElement, Binding, ElementManifest, Field, recognizedTypes} from './FileTypes';
import {SafetyCheck} from './SafetyCheck';
import * as KangratErrs from './ErrorTypes';
const colors = require('colors'); //weird lib thing
interface BindingCommand {
    value: string;
    elemId: string;
    property: string;
}
//consts that get replaced (site cannot have these)
const KANGRAT_ROOT = '<!--KANGRAT_ROOT-->';
const KANGRAT_BINDINGS = '[/*KANGRAT_BINDINGS*/]';
const KANGRAT_IMPORT = '<!--KANGRAT_IMPORT-->';
export class KangratBuild {
    private save: SaveFile;
    private outputDir: string;
    /**
     * Creates new KangratBuild instance
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
        console.log(`Building site: ${this.save.getMetadata().name} (v${this.save.getMetadata().version})\noutput: ${this.outputDir}`.red);
        await fs.ensureDir(this.outputDir);
        if(validate) {
            console.log('Running static checks on site'.red);
            await new SafetyCheck(this.save).checkAll();
            console.log('Everything checks out! (you deserve a pat on the back)'.green);
        }
        let buildPromises: Promise<void>[] = [];
        for(let schemaName of await this.save.getSchemaNames()) {
            await this.buildTemplate(schemaName);
        }
        await Promise.all(buildPromises);
        console.log('copying dependencies'.cyan);
        await this.copyDependencies();
        console.log('dependencies copied'.green);
        console.log('copying data'.cyan);
        await this.copyData();
        console.log('data copied'.green);
        console.log(`Build complete in ${(Date.now()-startTime)/1000} seconds`.red);
    }
    private async buildTemplate (schemaName: string) {
        console.log(`building template: ${schemaName}`.cyan);
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
                bindings.push({value: bind.value, property: bind.property, elemId: 'kangrat'+currentId});
            }
            //well if nothing's blown up yet
            pageElements += `<div class="kangratelement"><${pgElement.elementTag} id="${'kangrat'+(currentId++)}" /></div>\n`;
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
        console.log(`writing ${schemaName}.html`.green);
        await this.writePage(schemaName, pageElements, bindings, neededImports);
    }
    private async writePage(schema: string, pageElements: string, bindings: BindingCommand[], neededImports: string) {
        let originalText = await this.save.getBasePage();
        originalText = originalText.replace(KANGRAT_ROOT, pageElements).replace(KANGRAT_BINDINGS, JSON.stringify(bindings)).replace(KANGRAT_IMPORT, neededImports);
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

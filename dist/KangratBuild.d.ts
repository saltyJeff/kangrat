import { SaveFile } from './SaveFile';
export declare class KangratBuild {
    private save;
    private outputDir;
    constructor(save: SaveFile, outputDir: string);
    buildAll(validate: boolean): Promise<void>;
    private buildTemplate(schemaName);
    private writePage(schema, pageElements, bindings, neededImports);
    private copyDependencies();
    private copyData();
}

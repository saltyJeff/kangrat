import { MetaData, Field, PageElement, ElementManifest } from './FileTypes';
export declare class SaveFile {
    protected metadata: MetaData;
    protected schemas: Map<string, Field[]>;
    protected templates: Map<string, PageElement[]>;
    protected elementManifests: Map<string, ElementManifest>;
    protected loadPath: string;
    protected basePage: string;
    readonly dataPath: string;
    readonly savePath: string;
    readFrom(dirname: string): Promise<void>;
    static parseMetaData(obj: any): MetaData;
    static parseFields(obj: any[]): Field[];
    getMetadata(): MetaData;
    static parsePageElements(obj: any[]): PageElement[];
    getSchema(name: string): Promise<Field[]>;
    getSchemaNames(): Promise<string[]>;
    getTemplate(name: string): Promise<PageElement[]>;
    static parseManifest(obj: any): ElementManifest;
    getElementManifests(): Promise<Map<string, ElementManifest>>;
    getBasePage(): Promise<string>;
}

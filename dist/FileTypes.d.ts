export interface MetaData {
    name: string;
    version: number;
}
export interface Field {
    name: string;
    type: string;
}
export interface PageElement {
    elementTag: string;
    bindings: Binding[];
}
export interface Binding {
    property: string;
    value: string;
}
export interface ElementManifest {
    elementTag: string;
    href: string;
    importType: 'html' | 'script';
    properties: any;
}
export declare const recognizedTypes: string[];

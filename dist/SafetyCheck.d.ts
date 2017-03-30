import { SaveFile } from './SaveFile';
export declare class SafetyCheck {
    private save;
    constructor(save: SaveFile);
    checkAll(): Promise<void>;
    private checkTemplate(schemaName);
}

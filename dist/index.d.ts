import { SaveFile } from './SaveFile';
import { SafetyCheck } from './SafetyCheck';
import * as FileTypes from './FileTypes';
declare function run(from: string, to: string, dangerous?: boolean): Promise<void>;
export { SaveFile, SafetyCheck, run as build, FileTypes as FileTypes };

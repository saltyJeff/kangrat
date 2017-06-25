import {SaveFile} from './SaveFile';
import * as NBErrs from './ErrorTypes';
import {PageElement, Binding, ElementManifest, Field, recognizedTypes} from './FileTypes';

export class SafetyCheck {
    private save: SaveFile;
    constructor(save: SaveFile) {
        this.save = save;
    }
    public async checkAll () {
        let schemas = await this.save.getSchemaNames();
        for(let schema of schemas) {
            await this.checkTemplate(schema);
        }
    }
    private async checkTemplate (schemaName: string) {
        console.log('checking template: '+schemaName);
        //needed from save file
        let schema = await this.save.getSchema(schemaName);
        let elements = await this.save.getElementManifests();
        let template = await this.save.getTemplate(schemaName);
        //check loop
        for(let pgElement of template) {
            if(pgElement.elementTag.indexOf('-') == -1) { //no hyphen = built in component so i have no idea whats up
                continue;
            }
            let element = elements.get(pgElement.elementTag);
            if(element == undefined) {
                throw NBErrs.NodeBlogElementNotFound.create(pgElement.elementTag, schemaName);
            }
            for(let bind of pgElement.bindings) {
                //in case you screwed up
                let schemaType = getFieldType(schema, bind.value);
                if (schemaType == null) {
                    throw NBErrs.NodeBlogValueNotFound.create(schemaName, bind.value, schemaName);
                }
                let elementType = getPropertyType(element, bind.property);
                if (elementType == null) {
                    throw NBErrs.NodeBlogPropertyNotFound.create(element.elementTag, bind.property, schemaName);
                }
                if (schemaType != elementType) {
                    throw NBErrs.NodeBlogTypeMismatch.create(schemaType, elementType, schemaName, bind.value, element.elementTag, bind.property);
                }
                let checkType = schemaType;
                if(checkType.indexOf('[') == 0 && checkType.indexOf(']') == schemaType.length - 1) { //checks for array. probably should use regex
                    checkType = schemaType.substring(1, schemaType.length - 1);
                }
                if (recognizedTypes.indexOf(checkType) == -1) {
                    throw NBErrs.NodeBlogTypeNotRecognized.create(schemaType, schemaName, bind.value, schemaName);
                }
            }
        }
    }
}
//helpers
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
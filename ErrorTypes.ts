import {recognizedTypes} from './FileTypes';
export class KangratTypeMismatch extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratTypeMismatch';
    }
    public static create(from: string, to: string, schema: string, field: string, element: string, property: string) {
        return new KangratTypeMismatch(
            `Type mismatch: tried to put a ${from} type value in a ${to} type property
            @ from value: ${schema}.${field}
            to property: ${element}.${property}`);
    }
}
export class KangratElementNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratElementNotFound';
    }
    public static create(element: string, template: string) {
        return new KangratElementNotFound(
            `Element not found: Element type ${element} is neither built in nor registered with a Kangratmanifest.json
            @ template ${template}`);
    }
}
export class KangratPropertyNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratPropertyNotFound';
    }
    public static create(element: string, property: string, template: string) {
        return new KangratPropertyNotFound(
            `Property not found: Element type: ${element} does not have property: ${property}
            @ template: ${template}`);
    }
}
export class KangratValueNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratValueNotFound';
    }
    public static create(schema: string, value: string, template: string) {
        return new KangratValueNotFound(
            `Value not found: schema type: ${schema} does not have value: ${value}
            @ template: ${template}`);
    }
}
export class KangratTypeNotRecognized extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratTypeNotRecognized';
    }
    public static create(type: string, schema: string, value: string, template: string) {
        return new KangratTypeNotRecognized(
            `Type not recognized: schema type: ${schema} has an unrecognized field type: ${type}
            @ value: ${value} in template: ${template}
            should be one of ${recognizedTypes}, or if it is an array it should be one of those types surrounded with [ and ]`);
    }
}
export class KangratIndexTypeError extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'KangratIndexTypeError';
    }
    public static create(schema: string, value: string, type: string) {
        return new KangratIndexTypeError(
            `Index cannot be generated from value: schema ${schema} has impossible type: ${type}
            @ value name: ${value}
            should be one of [Number, Date]`);
    }
}
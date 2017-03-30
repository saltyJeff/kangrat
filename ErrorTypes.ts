import {recognizedTypes} from './FileTypes';
export class NodeBlogTypeMismatch extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogTypeMismatch';
    }
    public static create(from: string, to: string, schema: string, field: string, element: string, property: string) {
        return new NodeBlogTypeMismatch(
            `Type mismatch: tried to put a ${from} type value in a ${to} type property
            @ from value: ${schema}.${field}
            to property: ${element}.${property}`);
    }
}
export class NodeBlogElementNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogElementNotFound';
    }
    public static create(element: string, template: string) {
        return new NodeBlogElementNotFound(
            `Element not found: Element type ${element} is neither built in nor registered with a nodeblogmanifest.json
            @ template ${template}`);
    }
}
export class NodeBlogPropertyNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogPropertyNotFound';
    }
    public static create(element: string, property: string, template: string) {
        return new NodeBlogPropertyNotFound(
            `Property not found: Element type: ${element} does not have property: ${property}
            @ template: ${template}`);
    }
}
export class NodeBlogValueNotFound extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogValueNotFound';
    }
    public static create(schema: string, value: string, template: string) {
        return new NodeBlogValueNotFound(
            `Value not found: schema type: ${schema} does not have value: ${value}
            @ template: ${template}`);
    }
}
export class NodeBlogTypeNotRecognized extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogTypeNotRecognized';
    }
    public static create(type: string, schema: string, value: string, template: string) {
        return new NodeBlogTypeNotRecognized(
            `Type not recognized: schema type: ${schema} has an unrecognized field type: ${type}
            @ value: ${value} in template: ${template}
            should be one of ${recognizedTypes}, or if it is an array it should be one of those types surrounded with [ and ]`);
    }
}
export class NodeBlogIndexTypeError extends Error {
    constructor (message: string) {
        super(message);
        this.name = 'NodeBlogIndexTypeError';
    }
    public static create(schema: string, value: string, type: string) {
        return new NodeBlogIndexTypeError(
            `Index cannot be generated from value: schema ${schema} has impossible type: ${type}
            @ value name: ${value}
            should be one of [Number, Date]`);
    }
}
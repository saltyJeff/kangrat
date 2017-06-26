export declare class KangratTypeMismatch extends Error {
    constructor(message: string);
    static create(from: string, to: string, schema: string, field: string, element: string, property: string): KangratTypeMismatch;
}
export declare class KangratElementNotFound extends Error {
    constructor(message: string);
    static create(element: string, template: string): KangratElementNotFound;
}
export declare class KangratPropertyNotFound extends Error {
    constructor(message: string);
    static create(element: string, property: string, template: string): KangratPropertyNotFound;
}
export declare class KangratValueNotFound extends Error {
    constructor(message: string);
    static create(schema: string, value: string, template: string): KangratValueNotFound;
}
export declare class KangratTypeNotRecognized extends Error {
    constructor(message: string);
    static create(type: string, schema: string, value: string, template: string): KangratTypeNotRecognized;
}
export declare class KangratIndexTypeError extends Error {
    constructor(message: string);
    static create(schema: string, value: string, type: string): KangratIndexTypeError;
}

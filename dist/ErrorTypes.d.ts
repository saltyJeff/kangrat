export declare class NodeBlogTypeMismatch extends Error {
    constructor(message: string);
    static create(from: string, to: string, schema: string, field: string, element: string, property: string): NodeBlogTypeMismatch;
}
export declare class NodeBlogElementNotFound extends Error {
    constructor(message: string);
    static create(element: string, template: string): NodeBlogElementNotFound;
}
export declare class NodeBlogPropertyNotFound extends Error {
    constructor(message: string);
    static create(element: string, property: string, template: string): NodeBlogPropertyNotFound;
}
export declare class NodeBlogValueNotFound extends Error {
    constructor(message: string);
    static create(schema: string, value: string, template: string): NodeBlogValueNotFound;
}
export declare class NodeBlogTypeNotRecognized extends Error {
    constructor(message: string);
    static create(type: string, schema: string, value: string, template: string): NodeBlogTypeNotRecognized;
}
export declare class NodeBlogIndexTypeError extends Error {
    constructor(message: string);
    static create(schema: string, value: string, type: string): NodeBlogIndexTypeError;
}

/// <reference types="node" />
export declare class Generator {
    private source;
    constructor(source: string | NodeJS.ReadableStream);
    generate(): Promise<string>;
    private attach(fn);
}

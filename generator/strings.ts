import {readFileSync} from "fs";
import {join} from 'path';

export interface InterfaceProperty {
    name: string;
    type: string;
    optional: boolean;
}

export const helpers = (): string => {
    return readFileSync(join(__dirname, '../helpers/types.ts'), 'UTF-8');
};

export const entityTypeString = (name: string, base: string, properties: InterfaceProperty[], namespace: string) => `export class ${name} extends ${base||'EntityType'} {
    ${properties.map(prop => `public ${prop.name}${prop.optional?'?':''}: ${prop.type}`).join("\n    ")}
    constructor(data: Object) {
        super(data, "${namespace}", ${JSON.stringify(properties)});
    }
}`;

export const complexTypeString = (name: string, properties: InterfaceProperty[], namespace: string) => `export class ${name} extends ComplexType {
    ${properties.map(prop => `public ${prop.name}${prop.optional?'?':''}: ${prop.type}`).join("\n    ")}
    constructor(data: Object) {
        super(data, "${namespace}", ${JSON.stringify(properties)})
    }
}`;

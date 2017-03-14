"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = require("fs");
const path_1 = require("path");
exports.helpers = () => {
    return fs_1.readFileSync(path_1.join(__dirname, '../helpers/types.ts'), 'UTF-8');
};
exports.entityTypeString = (name, base, properties, namespace) => `export class ${name} extends ${base || 'EntityType'} {
    ${properties.map(prop => `public ${prop.name}${prop.optional ? '?' : ''}: ${prop.type}`).join("\n    ")}
    constructor(data: Object) {
        super(data, "${namespace}", ${JSON.stringify(properties)});
    }
}`;
exports.complexTypeString = (name, properties, namespace) => `export class ${name} extends ComplexType {
    ${properties.map(prop => `public ${prop.name}${prop.optional ? '?' : ''}: ${prop.type}`).join("\n    ")}
    constructor(data: Object) {
        super(data, "${namespace}", ${JSON.stringify(properties)})
    }
}`;
//# sourceMappingURL=strings.js.map
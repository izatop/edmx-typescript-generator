"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const edmx_reader_1 = require("edmx-reader");
const strings_1 = require("./strings");
const createTypeNormalizationFunction = (namespace) => {
    return (type) => {
        let normalized = 0 === type.indexOf('Collection(') ? /^Collection\(([^)]+)\)$/.exec(type)[1].concat('[]') : type;
        return -1 === normalized.indexOf(namespace) ? normalized : normalized.substr(namespace.length + 1);
    };
};
class Generator {
    constructor(source) {
        this.source = source;
    }
    generate() {
        return __awaiter(this, void 0, void 0, function* () {
            const schema = yield edmx_reader_1.convert(this.source);
            const entityTypeStrategy = new EntityTypeStrategy();
            const complexTypeStrategy = new ComplexTypeStrategy();
            const parallel = [
                this.attach(() => strings_1.helpers()),
                this.attach(() => `export namespace ${schema.Namespace} {`),
                this.attach(() => schema.ComplexType.map(x => complexTypeStrategy.execute(x, schema.Namespace)).join("\n")),
                this.attach(() => schema.EntityType.map(x => entityTypeStrategy.execute(x, schema.Namespace)).join("\n")),
                this.attach(() => '}')
            ];
            return Promise.all(parallel)
                .then(strings => strings.join("\n\n"));
        });
    }
    attach(fn) {
        return new Promise(resolve => resolve(fn()));
    }
}
exports.Generator = Generator;
class GeneratorStrategy {
    constructor() { }
}
class EntityTypeStrategy extends GeneratorStrategy {
    execute(object, namespace) {
        const type = createTypeNormalizationFunction(namespace);
        let name = object.Name, base = object.BaseType || '', properties = object.Property.map(prop => ({ name: prop.Name, type: type(prop.Type), optional: prop.Nullable }));
        return strings_1.entityTypeString(name, type(base), properties, namespace);
    }
}
class ComplexTypeStrategy extends GeneratorStrategy {
    execute(object, namespace) {
        const type = createTypeNormalizationFunction(namespace);
        let name = object.Name, properties = object.Property.map(prop => ({ name: prop.Name, type: type(prop.Type), optional: prop.Nullable }));
        return strings_1.complexTypeString(name, properties, namespace);
    }
}
//# sourceMappingURL=generator.js.map
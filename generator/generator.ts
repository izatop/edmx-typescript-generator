import {convert, ComplexType, EntityType} from 'edmx-reader';
import {complexTypeString, entityTypeString, helpers} from "./strings";

const createTypeNormalizationFunction = (namespace: string) => {
    return (type: string) => {
        let normalized = 0 === type.indexOf('Collection(') ? /^Collection\(([^)]+)\)$/.exec(type)[1].concat('[]') : type;
        return -1 === normalized.indexOf(namespace) ? normalized : normalized.substr(namespace.length + 1);
    }
};

export class Generator {
    constructor(private source: string | NodeJS.ReadableStream) {}

    async generate() {
        const schema = await convert(this.source);
        const entityTypeStrategy = new EntityTypeStrategy();
        const complexTypeStrategy = new ComplexTypeStrategy();

        const parallel = [
            this.attach(() => helpers()),
            this.attach(() => `export namespace ${schema.Namespace} {`),
            this.attach(() => schema.ComplexType.map(x => complexTypeStrategy.execute(x, schema.Namespace)).join("\n")),
            this.attach(() => schema.EntityType.map(x => entityTypeStrategy.execute(x, schema.Namespace)).join("\n")),
            this.attach(() => '}')
        ];

        return Promise.all(parallel)
            .then(strings => strings.join("\n\n"));
    }

    private attach(fn: () => string): Promise<string> {
        return new Promise(resolve => resolve(fn()));
    }
}

abstract class GeneratorStrategy {
    constructor() {}
    abstract execute(object: any, namespace: string): string;
}

class EntityTypeStrategy extends GeneratorStrategy {
    execute(object: EntityType, namespace: string) {
        const type = createTypeNormalizationFunction(namespace);
        let name = object.Name,
            base = object.BaseType || '',
            properties = object.Property.map(prop => ({name: prop.Name, type: type(prop.Type), optional: prop.Nullable}));
        
        return entityTypeString(name, type(base), properties, namespace);
    }
}

class ComplexTypeStrategy extends GeneratorStrategy {
    execute(object: ComplexType, namespace: string) {
        const type = createTypeNormalizationFunction(namespace);
        let name = object.Name,
            properties = object.Property.map(prop => ({name: prop.Name, type: type(prop.Type), optional: prop.Nullable}));
        
        return complexTypeString(name, properties, namespace);
    }
}

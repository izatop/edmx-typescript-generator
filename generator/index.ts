import {convert, ComplexType, EntityType} from 'edmx-reader';
import {complexTypeString, entityTypeString} from "./strings";
import {helpers} from "./helpers";

export class Generator {
    constructor(private source: string | NodeJS.ReadableStream) {}

    async generate() {
        const schema = await convert(this.source);
        const entityTypeStrategy = new EntityTypeStrategy();
        const complexTypeStrategy = new ComplexTypeStrategy();

        const parallel = [
            this.attach(() => [helpers()]),
            this.attach(() => schema.EntityType.map(x => entityTypeStrategy.execute(x))),
            this.attach(() => schema.ComplexType.map(x => complexTypeStrategy.execute(x))),
        ];

        return Promise.all(parallel)
            .then(strings => [].concat(...strings.map(x => x.join("\n\n"))).join("\n\n"));
    }

    private attach(fn: () => string[]): Promise<string[]> {
        return new Promise(resolve => resolve(fn()));
    }
}

abstract class GeneratorStrategy {
    constructor() {}
    abstract execute(object: any): string;
}

class EntityTypeStrategy extends GeneratorStrategy {
    execute(object: EntityType) {
        let name = object.Name;
        if (object.BaseType) {
            name = `${object.Name} extends ${object.BaseType}`;
        }

        return entityTypeString(name, object.Property.map(prop => ({name: prop.Name, type: prop.Type, optional: prop.Nullable})));
    }
}

class ComplexTypeStrategy extends GeneratorStrategy {
    execute(object: ComplexType) {
        let name = object.Name;
        return complexTypeString(name, object.Property.map(prop => ({name: prop.Name, type: prop.Type, optional: prop.Nullable})));
    }
}

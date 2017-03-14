export namespace Edm {
    export abstract class Type<T> {
        constructor(protected _value: T) {}
        
        get value(): T {
            return this._value;
        }
        
        toString() {
            return this.constructor.name.concat('(', this._value.toString(), ')');
        }
    }
    
    export class Guid extends Type<string> {}
    
    export class Stream extends Type<Buffer> {
        protected type: string;
    }
    
    export class DateTime extends Type<Date> {}
    
    export class DateTimeOffset extends Type<string> {}
    
    export class Time extends Type<string> {}
    
    export type Binary = Buffer;
    export type Boolean = boolean;
    export type Byte = number;
    export type String = string;
    export type Single = number;
    export type Decimal = number;
    export type Double = number;
    export type Float = number;
    export type Int16 = number;
    export type Int32 = number;
    export type Int64 = number;
    export type SByte = number;
    export type GeographyPoint = number[];
}

export class EntityType {
    constructor(data: Object, namespace: string, schema: Object) {}
}

export class ComplexType {
    constructor(data: Object, namespace: string, schema: Object) {}
}

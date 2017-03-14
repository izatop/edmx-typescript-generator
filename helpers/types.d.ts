/// <reference types="node" />
export declare namespace Edm {
    abstract class Type<T> {
        protected _value: T;
        constructor(_value: T);
        readonly value: T;
        toString(): string;
    }
    class Guid extends Type<string> {
    }
    class Stream extends Type<Buffer> {
        protected type: string;
    }
    class DateTime extends Type<Date> {
    }
    class DateTimeOffset extends Type<string> {
    }
    class Time extends Type<string> {
    }
    type Binary = Buffer;
    type Boolean = boolean;
    type Byte = number;
    type String = string;
    type Single = number;
    type Decimal = number;
    type Double = number;
    type Float = number;
    type Int16 = number;
    type Int32 = number;
    type Int64 = number;
    type SByte = number;
    type GeographyPoint = number[];
}
export declare class EntityType {
    constructor(data: Object, namespace: string, schema: Object);
}
export declare class ComplexType {
    constructor(data: Object, namespace: string, schema: Object);
}

export const helpers = () => `export namespace Edm {
    const here = this;
    export abstract class Type {
        constructor(private _value) {}
        
        abstract get value(): any;
        
        toString() {
            return this.constructor.name.concat('(', this.value, ')');
        }
    }
    
    export class Guid extends Type {
        get value() {
            return this._value;
        }
        
        toString() {
            return this._value;
        }
    }

    export class Stream extends Type {
        public type: string;
        public buffer: Buffer;
        
        constructor(field, target: Object) {
            this.type = target[field.concat('_Type')];
            this.buffer = new Buffer(target[field.concat('_Base64Data')], 'base64');
        }
    }
    
    export class DateTimeOffset {
        constructor(private value) {}
        toString() {
            return this.value;
        }
    }
    
    export class Time {
        constructor(private value) {}
        toString() {
            return this.value;
        }
    }
    
    export class DateTime {
        constructor(private value) {}
        toString() {
            return this.value;
        }
        
        get date(): Date {
            return new Date(this.value.concat('Z'));
        }
    }
    
    export class GeographyPoint {
        constructor(private value) {}
    }
    
    export type Boolean = boolean;
    export type String = string;
    export type Binary = Buffer;
    export type Decimal = number;
    export type Double = number;
    export type Float = number;
    export type Int16 = number;
    export type Int32 = number;
    export type Int64 = number;
    export type Byte = number;
    export type SByte = number;
}`;

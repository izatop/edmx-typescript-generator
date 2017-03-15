"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Edm;
(function (Edm) {
    class Type {
        constructor(_value) {
            this._value = _value;
        }
        get value() {
            return this._value;
        }
        toString() {
            return this.constructor.name.concat('(', this._value.toString(), ')');
        }
    }
    Edm.Type = Type;
    class Guid extends Type {
    }
    Edm.Guid = Guid;
    class Stream extends Type {
    }
    Edm.Stream = Stream;
    class DateTime extends Type {
    }
    Edm.DateTime = DateTime;
    class DateTimeOffset extends Type {
    }
    Edm.DateTimeOffset = DateTimeOffset;
    class Time extends Type {
    }
    Edm.Time = Time;
})(Edm = exports.Edm || (exports.Edm = {}));
class EntityType {
    constructor(data, namespace, schema) { }
}
exports.EntityType = EntityType;
class ComplexType {
    constructor(data, namespace, schema) { }
}
exports.ComplexType = ComplexType;
//# sourceMappingURL=types.js.map
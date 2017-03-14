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
const test = require("tape");
const index_1 = require("./index");
const fs_1 = require("fs");
const path_1 = require("path");
const testString1 = `export class Address extends ComplexType {
    public Street: Edm.String
    public City: Edm.String
    public State: Edm.String
    public ZipCode: Edm.String
    public Country: Edm.String
    constructor(data: Object) {
        super(data, "ODataDemo", [{"name":"Street","type":"Edm.String"},{"name":"City","type":"Edm.String"},{"name":"State","type":"Edm.String"},{"name":"ZipCode","type":"Edm.String"},{"name":"Country","type":"Edm.String"}])
    }
}`;
const testString2 = `export class Product extends EntityType {
    public ID: Edm.Int32
    public Name: Edm.String
    public Description: Edm.String
    public ReleaseDate: Edm.DateTime
    public DiscontinuedDate: Edm.DateTime
    public Rating: Edm.Int16
    public Price: Edm.Double
    constructor(data: Object) {
        super(data, "ODataDemo", [{"name":"ID","type":"Edm.Int32","optional":false},{"name":"Name","type":"Edm.String"},{"name":"Description","type":"Edm.String"},{"name":"ReleaseDate","type":"Edm.DateTime","optional":false},{"name":"DiscontinuedDate","type":"Edm.DateTime"},{"name":"Rating","type":"Edm.Int16","optional":false},{"name":"Price","type":"Edm.Double","optional":false}]);
    }
}`;
test('Test generator', (t) => __awaiter(this, void 0, void 0, function* () {
    const helpers = fs_1.readFileSync(path_1.join(__dirname, 'helpers/types.ts'), 'UTF-8');
    const generator = new index_1.Generator(fs_1.createReadStream('./index.spec.edmx.xml'));
    const result = yield generator.generate();
    t.plan(4);
    t.ok(result.indexOf(helpers) !== -1);
    t.ok(result.indexOf('export namespace ODataDemo') !== -1);
    t.ok(result.indexOf(testString1) !== -1);
    t.ok(result.indexOf(testString2) !== -1);
}));
//# sourceMappingURL=index.spec.js.map
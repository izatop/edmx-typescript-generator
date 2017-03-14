import * as test from 'tape';
import {Generator} from './index';
import {createReadStream, readFileSync} from "fs";
import {join} from "path";

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

test('Test generator', async t => {
    const helpers = readFileSync(join(__dirname, 'helpers/types.ts'), 'UTF-8');
    const generator = new Generator(createReadStream('./index.spec.edmx.xml'));
    const result = await generator.generate();
    
    t.plan(4);
    t.ok(result.indexOf(helpers) !== -1);
    t.ok(result.indexOf('export namespace ODataDemo') !== -1);
    t.ok(result.indexOf(testString1) !== -1);
    t.ok(result.indexOf(testString2) !== -1);
});

import * as test from 'tape';
import {Generator} from './index';
import {createReadStream} from "fs";

test('Test generator', async t => {
    const generator = new Generator(createReadStream('./index.spec.edmx.xml'));
    const result = await generator.generate();
    console.log(result);
    t.plan(1);
    t.ok(typeof result === 'string');
});

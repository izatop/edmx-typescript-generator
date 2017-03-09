import {parse} from 'url';
import {createReadStream, createWriteStream} from 'fs';
import {get as httpGet} from 'http';
import {get as httpsGet} from 'https';
import {Generator} from '../generator';

const [,,input, output]: string[] = process.argv;
const error = (str) => {
    console.error(str);
    process.exit();
};

if (!input) {
    error('Usage: node bin/cli uri.xml out-file.ts');
}

const file = parse(input);
const generate = async (stream: NodeJS.ReadableStream) => {
    const g = new Generator(stream);
    const string = await g.generate();

    if (output) {
        const writer = createWriteStream(output);
        writer.end(string);
    } else {
        console.log(string);
    }
};

switch (file.protocol) {
    case 'http:':
        httpGet(input, generate);
        break;

    case 'https:':
        httpsGet(input, generate);
        break;

    default:
        generate(createReadStream(input, {encoding: 'UTF-8'}));
}

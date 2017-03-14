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
const url_1 = require("url");
const fs_1 = require("fs");
const http_1 = require("http");
const https_1 = require("https");
const generator_1 = require("../generator/generator");
const [, , input, output] = process.argv;
const error = (str) => {
    console.error(str);
    process.exit();
};
if (!input) {
    error('Usage: node bin/cli uri.xml out-file.ts');
}
const file = url_1.parse(input);
const generate = (stream) => __awaiter(this, void 0, void 0, function* () {
    const g = new generator_1.Generator(stream);
    const string = yield g.generate();
    if (output) {
        const writer = fs_1.createWriteStream(output);
        writer.end(string);
    }
    else {
        console.log(string);
    }
});
switch (file.protocol) {
    case 'http:':
        http_1.get(input, generate);
        break;
    case 'https:':
        https_1.get(input, generate);
        break;
    default:
        generate(fs_1.createReadStream(input, { encoding: 'UTF-8' }));
}
//# sourceMappingURL=cli.js.map
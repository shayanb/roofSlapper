#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var chalk_1 = __importDefault(require("chalk"));
var clear_1 = __importDefault(require("clear"));
var figlet_1 = __importDefault(require("figlet"));
var commander_1 = __importDefault(require("commander"));
var logger_1 = __importDefault(require("./logger"));
var server_1 = __importDefault(require("./server"));
// determine if we are in development mode
// https://github.com/TypeStrong/ts-node/issues/846#issuecomment-631828160
// @ts-ignore
if (process[Symbol.for("ts-node.register.instance")]) {
    process.env.ETH95_DEV = "true";
}
clear_1.default();
console.log("");
console.log(chalk_1.default.red(figlet_1.default.textSync("Roof Slapper 32", { font: "ANSI Shadow" })));
commander_1.default
    .version(require("../package.json").version)
    .name("eth95")
    .description("A GUI for controlling Ethereum dapps")
    .usage("[path-to-artifacts-dir] [options]")
    .option("-b, --buidler", "watches the default Buidler artifact directory")
    .option("-t, --truffle", "watches the default Truffle artifact directory")
    .option("-p, --port <number>", "specify port to host the frontend")
    .parse(process.argv);
commander_1.default.outputHelp();
console.log("");
// determine what path (if any) to try
var targetPath;
if (commander_1.default.args[0]) {
    targetPath = commander_1.default.args[0];
}
else if (commander_1.default.truffle) {
    targetPath = "./build/contracts";
}
else if (commander_1.default.buidler) {
    targetPath = "./artifacts";
}
if (targetPath) {
    var artifactPath = path_1.default.resolve(targetPath);
    var validPath = fs_1.default.existsSync(artifactPath) && fs_1.default.lstatSync(artifactPath).isDirectory();
    if (!validPath) {
        logger_1.default.error("Invalid directory: " + chalk_1.default.white(artifactPath) + "\n");
        process.exit(1);
    }
    logger_1.default.info("Artifact directory: " + chalk_1.default.yellow(artifactPath));
    server_1.default({
        port: commander_1.default.port || 3000,
        artifactPath: artifactPath,
    });
}
else {
    server_1.default({
        port: commander_1.default.port || 3000,
    });
}

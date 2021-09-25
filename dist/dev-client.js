"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var parcel_bundler_1 = __importDefault(require("parcel-bundler"));
var entryFiles = [path_1.default.join(__dirname, "./app/index.html")];
var bundler = new parcel_bundler_1.default(entryFiles, { logLevel: 1 });
var clientMiddleware = function () { return bundler.middleware(); };
exports.default = clientMiddleware;

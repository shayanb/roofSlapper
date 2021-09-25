"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJsonFilePaths = void 0;
var path_1 = __importDefault(require("path"));
var fs_1 = __importDefault(require("fs"));
exports.getJsonFilePaths = function (artifactPath) {
    var files = fs_1.default.readdirSync(artifactPath);
    var jsonFiles = files.filter(function (filename) { var _a; return ((_a = filename.split(".").pop()) === null || _a === void 0 ? void 0 : _a.toLowerCase()) === "json"; });
    var jsonPaths = jsonFiles.map(function (filename) {
        return path_1.default.join(artifactPath, filename);
    });
    return jsonPaths;
};

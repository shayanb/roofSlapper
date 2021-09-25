"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TAG_INFO = exports.TAG_SUCCESS = exports.TAG_ERROR = void 0;
var chalk_1 = __importDefault(require("chalk"));
exports.TAG_ERROR = chalk_1.default.red("error");
exports.TAG_SUCCESS = chalk_1.default.green("success");
exports.TAG_INFO = chalk_1.default.yellow("info");
var getTime = function () {
    return "[" + new Date().toLocaleTimeString("en-US", { hour12: false }) + "]";
};
exports.default = {
    error: function (x) { return console.log(getTime(), exports.TAG_ERROR, x); },
    success: function (x) { return console.log(getTime(), exports.TAG_SUCCESS, x); },
    info: function (x) { return console.log(getTime(), exports.TAG_INFO, x); },
};

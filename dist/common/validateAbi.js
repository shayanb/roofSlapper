"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateAbi = function (rawAbi) {
    var abi;
    try {
        abi = JSON.parse(rawAbi);
    }
    catch (error) {
        return false;
    }
    if (Array.isArray(abi) && abi.length > 0 && abi.every(function (x) { return x.type; })) {
        return true;
    }
    return false;
};
exports.default = validateAbi;

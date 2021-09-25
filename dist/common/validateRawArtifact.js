"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var validateRawArtifact = function (rawArtifact) {
    var artifact;
    try {
        artifact = JSON.parse(rawArtifact);
    }
    catch (error) {
        return false;
    }
    var hasFunctions = function (abi) {
        return abi.filter(function (x) { return x.type === "function"; }).length > 0;
    };
    if (artifact.contractName && artifact.abi && hasFunctions(artifact.abi)) {
        return true;
    }
    return false;
};
exports.default = validateRawArtifact;

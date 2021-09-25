"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var http_1 = __importDefault(require("http"));
var express_1 = __importDefault(require("express"));
var ws_1 = __importDefault(require("ws"));
var chalk_1 = __importDefault(require("chalk"));
var chokidar_1 = __importDefault(require("chokidar"));
var dev_client_1 = __importDefault(require("./dev-client"));
var validateRawArtifact_1 = __importDefault(require("./common/validateRawArtifact"));
var logger_1 = __importDefault(require("./logger"));
var artifact_paths_1 = require("./artifact-paths");
var startServer = function (_a) {
    var port = _a.port, _b = _a.paths, paths = _b === void 0 ? [] : _b, artifactPath = _a.artifactPath;
    return __awaiter(void 0, void 0, void 0, function () {
        var app, server, wss, removeExtension, sender;
        return __generator(this, function (_c) {
            app = express_1.default();
            // use middleware if in development, otherwise serve prod build
            if (process.env.ETH95_DEV) {
                app.use("/", dev_client_1.default());
            }
            else {
                app.use("/", express_1.default.static(__dirname + "/app"));
            }
            server = http_1.default.createServer(app);
            wss = new ws_1.default.Server({ clientTracking: false, noServer: true });
            server.on("upgrade", function (request, socket, head) {
                wss.handleUpgrade(request, socket, head, function (ws) {
                    wss.emit("connection", ws, request);
                });
            });
            removeExtension = function (str) {
                return str.split(".").slice(0, -1).join(".");
            };
            if (artifactPath) {
                chokidar_1.default
                    .watch(artifactPath + "/*.json")
                    .on("add", function (filePath) {
                    var rawJson = fs_1.default.readFileSync(filePath);
                    if (sender && validateRawArtifact_1.default(rawJson)) {
                        logger_1.default.info("New contract: " + path_1.default.basename(filePath));
                        var artifact = JSON.parse(rawJson.toString());
                        var payload = {
                            type: "NEW_CONTRACT",
                            artifact: artifact,
                            path: filePath,
                            name: removeExtension(path_1.default.basename(filePath)),
                        };
                        sender.send(JSON.stringify(payload));
                    }
                })
                    .on("change", function (filePath) {
                    var rawJson = fs_1.default.readFileSync(filePath);
                    if (sender && validateRawArtifact_1.default(rawJson)) {
                        logger_1.default.info("Contract changed: " + path_1.default.basename(filePath));
                        var artifact = JSON.parse(rawJson.toString());
                        var payload = {
                            type: "CHANGE_CONTRACT",
                            artifact: artifact,
                            path: filePath,
                            name: removeExtension(path_1.default.basename(filePath)),
                        };
                        sender.send(JSON.stringify(payload));
                    }
                })
                    .on("unlink", function (filePath) {
                    if (sender) {
                        logger_1.default.info("Contract deleted: " + path_1.default.basename(filePath));
                        var payload = {
                            type: "DELETE_CONTRACT",
                            path: filePath,
                        };
                        sender.send(JSON.stringify(payload));
                    }
                });
            }
            wss.on("connection", function (ws) {
                sender = ws;
                ws.on("message", function (message) {
                    var msg = JSON.parse(message);
                    if (msg.type === "CONNECTION_OPENED" && artifactPath) {
                        // load initial state (i.e. send all valid files over)
                        var jsonFilePaths = artifact_paths_1.getJsonFilePaths(artifactPath);
                        var count_1 = 0;
                        jsonFilePaths.forEach(function (filePath) {
                            var rawJson = fs_1.default.readFileSync(filePath);
                            if (validateRawArtifact_1.default(rawJson)) {
                                var artifact = JSON.parse(rawJson.toString());
                                var payload = {
                                    type: "NEW_CONTRACT",
                                    artifact: artifact,
                                    path: filePath,
                                    name: removeExtension(path_1.default.basename(filePath)),
                                };
                                ws.send(JSON.stringify(payload));
                                count_1++;
                            }
                        });
                        logger_1.default.info("Sent " + count_1 + " contract(s) to client");
                    }
                });
                ws.on("close", function () {
                    // console.log("Websocket connection closed.");
                });
            });
            server.listen(port, function () {
                logger_1.default.success("Your dashboard is ready at: " + chalk_1.default.yellow("http://localhost:" + port));
            });
            return [2 /*return*/];
        });
    });
};
exports.default = startServer;

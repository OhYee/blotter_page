var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
import * as utils from '../utils';
import { Pool } from '../pool';
import { uploadChunk, uploadComplete, initUploadParts } from '../api';
import Base from './base';
/** 是否为正整数 */
function isPositiveInteger(n) {
    var re = /^[1-9]\d*$/;
    return re.test(String(n));
}
var Resume = /** @class */ (function (_super) {
    __extends(Resume, _super);
    function Resume() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Resume.prototype.run = function () {
        return __awaiter(this, void 0, void 0, function () {
            var pool, uploadChunks, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.config.chunkSize || !isPositiveInteger(this.config.chunkSize)) {
                            throw new Error('chunkSize must be a positive integer');
                        }
                        if (this.config.chunkSize > 1024) {
                            throw new Error('chunkSize maximum value is 1024');
                        }
                        return [4 /*yield*/, this.initBeforeUploadChunks()];
                    case 1:
                        _a.sent();
                        pool = new Pool(function (chunkInfo) { return _this.uploadChunk(chunkInfo); }, this.config.concurrentRequestLimit);
                        uploadChunks = this.chunks.map(function (chunk, index) { return pool.enqueue({ chunk: chunk, index: index }); });
                        result = Promise.all(uploadChunks).then(function () { return _this.mkFileReq(); });
                        result.then(function () {
                            utils.removeLocalFileInfo(_this.getLocalKey());
                        }, function (err) {
                            // uploadId 无效，上传参数有误（多由于本地存储信息的 uploadId 失效
                            if (err.code === 612 || err.code === 400) {
                                utils.removeLocalFileInfo(_this.getLocalKey());
                            }
                        });
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Resume.prototype.uploadChunk = function (chunkInfo) {
        return __awaiter(this, void 0, void 0, function () {
            var index, chunk, info, shouldCheckMD5, reuseSaved, md5, onProgress, requestOptions, response;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        index = chunkInfo.index, chunk = chunkInfo.chunk;
                        info = this.uploadedList[index];
                        shouldCheckMD5 = this.config.checkByMD5;
                        reuseSaved = function () {
                            _this.updateChunkProgress(chunk.size, index);
                        };
                        if (info && !shouldCheckMD5) {
                            reuseSaved();
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, utils.computeMd5(chunk)];
                    case 1:
                        md5 = _a.sent();
                        if (info && md5 === info.md5) {
                            reuseSaved();
                            return [2 /*return*/];
                        }
                        onProgress = function (data) {
                            _this.updateChunkProgress(data.loaded, index);
                        };
                        requestOptions = {
                            body: chunk,
                            onProgress: onProgress,
                            onCreate: function (xhr) { return _this.addXhr(xhr); }
                        };
                        return [4 /*yield*/, uploadChunk(this.token, this.key, chunkInfo.index + 1, this.getUploadInfo(), requestOptions)
                            // 在某些浏览器环境下，xhr 的 progress 事件无法被触发，progress 为 null，这里在每次分片上传完成后都手动更新下 progress
                        ];
                    case 2:
                        response = _a.sent();
                        // 在某些浏览器环境下，xhr 的 progress 事件无法被触发，progress 为 null，这里在每次分片上传完成后都手动更新下 progress
                        onProgress({
                            loaded: chunk.size,
                            total: chunk.size
                        });
                        this.uploadedList[index] = {
                            etag: response.data.etag,
                            md5: response.data.md5,
                            size: chunk.size
                        };
                        utils.setLocalFileInfo(this.getLocalKey(), {
                            id: this.uploadId,
                            data: this.uploadedList
                        });
                        return [2 /*return*/];
                }
            });
        });
    };
    Resume.prototype.mkFileReq = function () {
        return __awaiter(this, void 0, void 0, function () {
            var data, result;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        data = __assign(__assign(__assign({ parts: this.uploadedList.map(function (value, index) { return ({
                                etag: value.etag,
                                partNumber: index + 1
                            }); }), fname: this.putExtra.fname }, this.putExtra.mimeType && { mimeType: this.putExtra.mimeType }), this.putExtra.customVars && { customVars: this.putExtra.customVars }), this.putExtra.metadata && { metadata: this.putExtra.metadata });
                        return [4 /*yield*/, uploadComplete(this.token, this.key, this.getUploadInfo(), {
                                onCreate: function (xhr) { return _this.addXhr(xhr); },
                                body: JSON.stringify(data)
                            })];
                    case 1:
                        result = _a.sent();
                        this.updateMkFileProgress(1);
                        return [2 /*return*/, result];
                }
            });
        });
    };
    Resume.prototype.initBeforeUploadChunks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var localInfo, res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        localInfo = utils.getLocalFileInfo(this.getLocalKey());
                        if (!!localInfo) return [3 /*break*/, 2];
                        // 防止本地信息已被破坏，初始化时 clear 一下
                        utils.removeLocalFileInfo(this.getLocalKey());
                        return [4 /*yield*/, initUploadParts(this.token, this.bucket, this.key, this.uploadUrl)];
                    case 1:
                        res = _a.sent();
                        this.uploadId = res.data.uploadId;
                        this.uploadedList = [];
                        return [3 /*break*/, 3];
                    case 2:
                        this.uploadId = localInfo.id;
                        this.uploadedList = localInfo.data;
                        _a.label = 3;
                    case 3:
                        this.chunks = utils.getChunks(this.file, this.config.chunkSize);
                        this.loaded = {
                            mkFileProgress: 0,
                            chunks: this.chunks.map(function (_) { return 0; })
                        };
                        this.notifyResumeProgress();
                        return [2 /*return*/];
                }
            });
        });
    };
    Resume.prototype.getUploadInfo = function () {
        return {
            id: this.uploadId,
            url: this.uploadUrl
        };
    };
    Resume.prototype.getLocalKey = function () {
        return utils.createLocalKey(this.file.name, this.key, this.file.size);
    };
    Resume.prototype.updateChunkProgress = function (loaded, index) {
        this.loaded.chunks[index] = loaded;
        this.notifyResumeProgress();
    };
    Resume.prototype.updateMkFileProgress = function (progress) {
        this.loaded.mkFileProgress = progress;
        this.notifyResumeProgress();
    };
    Resume.prototype.notifyResumeProgress = function () {
        var _this = this;
        this.progress = {
            total: this.getProgressInfoItem(utils.sum(this.loaded.chunks) + this.loaded.mkFileProgress, this.file.size + 1 // 防止在 complete 未调用的时候进度显示 100%
            ),
            chunks: this.chunks.map(function (chunk, index) { return (_this.getProgressInfoItem(_this.loaded.chunks[index], chunk.size)); }),
            uploadInfo: {
                id: this.uploadId,
                url: this.uploadUrl
            }
        };
        this.onData(this.progress);
    };
    return Resume;
}(Base));
export default Resume;
//# sourceMappingURL=resume.js.map
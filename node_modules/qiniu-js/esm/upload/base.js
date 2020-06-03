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
import { getUploadUrl } from '../api';
export var DEFAULT_CHUNK_SIZE = 4; // 单位 MB
var GB = Math.pow(1024, 3);
var Base = /** @class */ (function () {
    function Base(options, handlers, statisticsLogger) {
        this.statisticsLogger = statisticsLogger;
        this.xhrList = [];
        this.aborted = false;
        this.retryCount = 0;
        this.config = __assign({ useCdnDomain: true, disableStatisticsReport: false, retryCount: 3, checkByMD5: false, uphost: '', upprotocol: 'https:', forceDirect: false, chunkSize: DEFAULT_CHUNK_SIZE, concurrentRequestLimit: 3 }, options.config);
        this.putExtra = __assign({ fname: '' }, options.putExtra);
        this.file = options.file;
        this.key = options.key;
        this.token = options.token;
        this.onData = handlers.onData;
        this.onError = handlers.onError;
        this.onComplete = handlers.onComplete;
        try {
            this.bucket = utils.getPutPolicy(this.token).bucket;
        }
        catch (e) {
            this.onError(e);
        }
    }
    Base.prototype.putFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var err, err, err, _a, result, err_1, reqId, code, needRetry, notReachRetryCount;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        this.aborted = false;
                        if (!this.putExtra.fname) {
                            this.putExtra.fname = this.file.name;
                        }
                        if (this.file.size > 10000 * GB) {
                            err = new Error('file size exceed maximum value 10000G');
                            this.onError(err);
                            throw err;
                        }
                        if (this.putExtra.customVars) {
                            if (!utils.isCustomVarsValid(this.putExtra.customVars)) {
                                err = new Error('customVars key should start width x:');
                                this.onError(err);
                                throw err;
                            }
                        }
                        if (this.putExtra.metadata) {
                            if (!utils.isMetaDataValid(this.putExtra.metadata)) {
                                err = new Error('metadata key should start with x-qn-meta-');
                                this.onError(err);
                                throw err;
                            }
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        _a = this;
                        return [4 /*yield*/, getUploadUrl(this.config, this.token)];
                    case 2:
                        _a.uploadUrl = _b.sent();
                        this.uploadAt = new Date().getTime();
                        return [4 /*yield*/, this.run()];
                    case 3:
                        result = _b.sent();
                        this.onComplete(result.data);
                        if (!this.config.disableStatisticsReport) {
                            this.sendLog(result.reqId, 200);
                        }
                        return [2 /*return*/, result];
                    case 4:
                        err_1 = _b.sent();
                        this.clear();
                        if (err_1.isRequestError && !this.config.disableStatisticsReport) {
                            reqId = this.aborted ? '' : err_1.reqId;
                            code = this.aborted ? -2 : err_1.code;
                            this.sendLog(reqId, code);
                        }
                        needRetry = err_1.isRequestError && err_1.code === 0 && !this.aborted;
                        notReachRetryCount = ++this.retryCount <= this.config.retryCount;
                        // 以下条件满足其中之一则会进行重新上传：
                        // 1. 满足 needRetry 的条件且 retryCount 不为 0
                        // 2. uploadId 无效时在 resume 里会清除本地数据，并且这里触发重新上传
                        if (needRetry && notReachRetryCount || err_1.code === 612) {
                            return [2 /*return*/, this.putFile()];
                        }
                        this.onError(err_1);
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    Base.prototype.clear = function () {
        this.xhrList.forEach(function (xhr) { return xhr.abort(); });
        this.xhrList = [];
    };
    Base.prototype.stop = function () {
        this.clear();
        this.aborted = true;
    };
    Base.prototype.addXhr = function (xhr) {
        this.xhrList.push(xhr);
    };
    Base.prototype.sendLog = function (reqId, code) {
        this.statisticsLogger.log({
            code: code,
            reqId: reqId,
            host: utils.getDomainFromUrl(this.uploadUrl),
            remoteIp: '',
            port: utils.getPortFromUrl(this.uploadUrl),
            duration: (new Date().getTime() - this.uploadAt) / 1000,
            time: Math.floor(this.uploadAt / 1000),
            bytesSent: this.progress ? this.progress.total.loaded : 0,
            upType: 'jssdk-h5',
            size: this.file.size
        }, this.token);
    };
    Base.prototype.getProgressInfoItem = function (loaded, size) {
        return {
            loaded: loaded,
            size: size,
            percent: loaded / size * 100
        };
    };
    return Base;
}());
export default Base;
//# sourceMappingURL=base.js.map
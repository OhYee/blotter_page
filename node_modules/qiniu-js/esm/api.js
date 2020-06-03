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
import * as utils from './utils';
import { regionUphostMap } from './config';
import { urlSafeBase64Encode } from './base64';
export function getUpHosts(token, protocol) {
    return __awaiter(this, void 0, void 0, function () {
        var putPolicy, url;
        return __generator(this, function (_a) {
            putPolicy = utils.getPutPolicy(token);
            url = protocol + '//api.qiniu.com/v2/query?ak=' + putPolicy.ak + '&bucket=' + putPolicy.bucket;
            return [2 /*return*/, utils.request(url, { method: 'GET' })];
        });
    });
}
/** 获取上传url */
export function getUploadUrl(config, token) {
    return __awaiter(this, void 0, void 0, function () {
        var protocol, upHosts, host, res, hosts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    protocol = config.upprotocol;
                    if (config.uphost) {
                        return [2 /*return*/, protocol + "//" + config.uphost];
                    }
                    if (config.region) {
                        upHosts = regionUphostMap[config.region];
                        host = config.useCdnDomain ? upHosts.cdnUphost : upHosts.srcUphost;
                        return [2 /*return*/, protocol + "//" + host];
                    }
                    return [4 /*yield*/, getUpHosts(token, protocol)];
                case 1:
                    res = _a.sent();
                    hosts = res.data.up.acc.main;
                    return [2 /*return*/, protocol + "//" + hosts[0]];
            }
        });
    });
}
/**
 * @param bucket 空间名
 * @param key 目标文件名
 * @param uploadInfo 上传信息
 */
function getBaseUrl(bucket, key, uploadInfo) {
    var url = uploadInfo.url, id = uploadInfo.id;
    return url + "/buckets/" + bucket + "/objects/" + (key != null ? urlSafeBase64Encode(key) : '~') + "/uploads/" + id;
}
/**
 * @param token 上传鉴权凭证
 * @param bucket 上传空间
 * @param key 目标文件名
 * @param uploadUrl 上传地址
 */
export function initUploadParts(token, bucket, key, uploadUrl) {
    var url = uploadUrl + "/buckets/" + bucket + "/objects/" + (key != null ? urlSafeBase64Encode(key) : '~') + "/uploads";
    return utils.request(url, {
        method: 'POST',
        headers: utils.getAuthHeaders(token)
    });
}
/**
 * @param token 上传鉴权凭证
 * @param index 当前 chunk 的索引
 * @param uploadInfo 上传信息
 * @param options 请求参数
 */
export function uploadChunk(token, key, index, uploadInfo, options) {
    var bucket = utils.getPutPolicy(token).bucket;
    var url = getBaseUrl(bucket, key, uploadInfo) + ("/" + index);
    return utils.request(url, __assign(__assign({}, options), { method: 'PUT', headers: utils.getHeadersForChunkUpload(token) }));
}
/**
 * @param token 上传鉴权凭证
 * @param key 目标文件名
 * @param uploadInfo 上传信息
 * @param options 请求参数
 */
export function uploadComplete(token, key, uploadInfo, options) {
    var bucket = utils.getPutPolicy(token).bucket;
    var url = getBaseUrl(bucket, key, uploadInfo);
    return utils.request(url, __assign(__assign({}, options), { method: 'POST', headers: utils.getHeadersForMkFile(token) }));
}
/**
 * @param token 上传鉴权凭证
 * @param key 目标文件名
 * @param uploadInfo 上传信息
 */
export function deleteUploadedChunks(token, key, uploadinfo) {
    var bucket = utils.getPutPolicy(token).bucket;
    var url = getBaseUrl(bucket, key, uploadinfo);
    return utils.request(url, {
        method: 'DELETE',
        headers: utils.getAuthHeaders(token)
    });
}
//# sourceMappingURL=api.js.map
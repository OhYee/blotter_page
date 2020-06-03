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
import SparkMD5 from 'spark-md5';
import { urlSafeBase64Decode } from './base64';
export var MB = Math.pow(1024, 2);
// 文件分块
export function getChunks(file, blockSize) {
    var chunkByteSize = blockSize * MB; // 转换为字节
    // 如果 chunkByteSize 比文件大，则直接取文件的大小
    if (chunkByteSize > file.size) {
        chunkByteSize = file.size;
    }
    else {
        // 因为最多 10000 chunk，所以如果 chunkSize 不符合则把每片 chunk 大小扩大两倍
        while (file.size > chunkByteSize * 10000) {
            chunkByteSize *= 2;
        }
    }
    var chunks = [];
    var count = Math.ceil(file.size / chunkByteSize);
    for (var i = 0; i < count; i++) {
        var chunk = file.slice(chunkByteSize * i, i === count - 1 ? file.size : chunkByteSize * (i + 1));
        chunks.push(chunk);
    }
    return chunks;
}
export function isMetaDataValid(params) {
    return Object.keys(params).every(function (key) { return key.indexOf('x-qn-meta-') === 0; });
}
export function isCustomVarsValid(params) {
    return Object.keys(params).every(function (key) { return key.indexOf('x:') === 0; });
}
export function sum(list) {
    return list.reduce(function (data, loaded) { return data + loaded; }, 0);
}
export function setLocalFileInfo(localKey, info) {
    try {
        localStorage.setItem(localKey, JSON.stringify(info));
    }
    catch (err) {
        if (window.console && window.console.warn) {
            // eslint-disable-next-line no-console
            console.warn('setLocalFileInfo failed');
        }
    }
}
export function createLocalKey(name, key, size) {
    var localKey = key == null ? '_' : "_key_" + key + "_";
    return "qiniu_js_sdk_upload_file_name_" + name + localKey + "size_" + size;
}
export function removeLocalFileInfo(localKey) {
    try {
        localStorage.removeItem(localKey);
    }
    catch (err) {
        if (window.console && window.console.warn) {
            // eslint-disable-next-line no-console
            console.warn('removeLocalFileInfo failed');
        }
    }
}
export function getLocalFileInfo(localKey) {
    try {
        var localInfo = localStorage.getItem(localKey);
        return localInfo ? JSON.parse(localInfo) : null;
    }
    catch (err) {
        if (window.console && window.console.warn) {
            // eslint-disable-next-line no-console
            console.warn('getLocalFileInfo failed');
        }
        return null;
    }
}
export function getAuthHeaders(token) {
    var auth = 'UpToken ' + token;
    return { Authorization: auth };
}
export function getHeadersForChunkUpload(token) {
    var header = getAuthHeaders(token);
    return __assign({ 'content-type': 'application/octet-stream' }, header);
}
export function getHeadersForMkFile(token) {
    var header = getAuthHeaders(token);
    return __assign({ 'content-type': 'application/json' }, header);
}
export function createXHR() {
    if (window.XMLHttpRequest) {
        return new XMLHttpRequest();
    }
    return window.ActiveXObject('Microsoft.XMLHTTP');
}
export function computeMd5(data) {
    return __awaiter(this, void 0, void 0, function () {
        var buffer, spark;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, readAsArrayBuffer(data)];
                case 1:
                    buffer = _a.sent();
                    spark = new SparkMD5.ArrayBuffer();
                    spark.append(buffer);
                    return [2 /*return*/, spark.end()];
            }
        });
    });
}
export function readAsArrayBuffer(data) {
    return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        // evt 类型目前存在问题 https://github.com/Microsoft/TypeScript/issues/4163
        reader.onload = function (evt) {
            if (evt.target) {
                var body = evt.target.result;
                resolve(body);
            }
            else {
                reject(new Error('progress event target is undefined'));
            }
        };
        reader.onerror = function () {
            reject(new Error('fileReader read failed'));
        };
        reader.readAsArrayBuffer(data);
    });
}
export function request(url, options) {
    return new Promise(function (resolve, reject) {
        var xhr = createXHR();
        xhr.open(options.method, url);
        if (options.onCreate) {
            options.onCreate(xhr);
        }
        if (options.headers) {
            var headers_1 = options.headers;
            Object.keys(headers_1).forEach(function (k) {
                xhr.setRequestHeader(k, headers_1[k]);
            });
        }
        xhr.upload.addEventListener('progress', function (evt) {
            if (evt.lengthComputable && options.onProgress) {
                options.onProgress({
                    loaded: evt.loaded,
                    total: evt.total
                });
            }
        });
        xhr.onreadystatechange = function () {
            var responseText = xhr.responseText;
            if (xhr.readyState !== 4) {
                return;
            }
            var reqId = xhr.getResponseHeader('x-reqId') || '';
            if (xhr.status !== 200) {
                var message = "xhr request failed, code: " + xhr.status;
                if (responseText) {
                    message += " response: " + responseText;
                }
                reject({
                    code: xhr.status,
                    message: message,
                    reqId: reqId,
                    isRequestError: true
                });
                return;
            }
            try {
                resolve({
                    data: JSON.parse(responseText),
                    reqId: reqId
                });
            }
            catch (err) {
                reject(err);
            }
        };
        xhr.send(options.body);
    });
}
export function getPortFromUrl(url) {
    if (url && url.match) {
        var groups = url.match(/(^https?)/);
        if (!groups) {
            return '';
        }
        var type = groups[1];
        groups = url.match(/^https?:\/\/([^:^/]*):(\d*)/);
        if (groups) {
            return groups[2];
        }
        if (type === 'http') {
            return '80';
        }
        return '443';
    }
    return '';
}
export function getDomainFromUrl(url) {
    if (url && url.match) {
        var groups = url.match(/^https?:\/\/([^:^/]*)/);
        return groups ? groups[1] : '';
    }
    return '';
}
export function getPutPolicy(token) {
    var segments = token.split(':');
    // token 构造的差异参考：https://github.com/qbox/product/blob/master/kodo/auths/UpToken.md#admin-uptoken-authorization
    var ak = segments.length > 3 ? segments[1] : segments[0];
    var putPolicy = JSON.parse(urlSafeBase64Decode(segments[segments.length - 1]));
    return {
        ak: ak,
        bucket: putPolicy.scope.split(':')[0]
    };
}
export function createObjectURL(file) {
    var URL = window.URL || window.webkitURL || window.mozURL;
    return URL.createObjectURL(file);
}
export function getTransform(image, orientation) {
    var width = image.width, height = image.height;
    switch (orientation) {
        case 1:
            // default
            return {
                width: width,
                height: height,
                matrix: [1, 0, 0, 1, 0, 0]
            };
        case 2:
            // horizontal flip
            return {
                width: width,
                height: height,
                matrix: [-1, 0, 0, 1, width, 0]
            };
        case 3:
            // 180° rotated
            return {
                width: width,
                height: height,
                matrix: [-1, 0, 0, -1, width, height]
            };
        case 4:
            // vertical flip
            return {
                width: width,
                height: height,
                matrix: [1, 0, 0, -1, 0, height]
            };
        case 5:
            // vertical flip + -90° rotated
            return {
                width: height,
                height: width,
                matrix: [0, 1, 1, 0, 0, 0]
            };
        case 6:
            // -90° rotated
            return {
                width: height,
                height: width,
                matrix: [0, 1, -1, 0, height, 0]
            };
        case 7:
            // horizontal flip + -90° rotate
            return {
                width: height,
                height: width,
                matrix: [0, -1, -1, 0, height, width]
            };
        case 8:
            // 90° rotated
            return {
                width: height,
                height: width,
                matrix: [0, -1, 1, 0, 0, width]
            };
        default:
            throw new Error("orientation " + orientation + " is unavailable");
    }
}
//# sourceMappingURL=utils.js.map
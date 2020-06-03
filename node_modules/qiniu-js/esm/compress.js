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
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import { EXIF } from 'exif-js';
import { createObjectURL, getTransform } from './utils';
var mimeTypes = {
    PNG: 'image/png',
    JPEG: 'image/jpeg',
    WEBP: 'image/webp',
    BMP: 'image/bmp'
};
var maxSteps = 4;
var scaleFactor = Math.log(2);
var supportMimeTypes = Object.keys(mimeTypes).map(function (type) { return mimeTypes[type]; });
var defaultType = mimeTypes.JPEG;
function isSupportedType(type) {
    return supportMimeTypes.includes(type);
}
var Compress = /** @class */ (function () {
    function Compress(file, config) {
        this.file = file;
        this.config = config;
        this.config = __assign({ quality: 0.92, noCompressIfLarger: false }, this.config);
    }
    Compress.prototype.process = function () {
        return __awaiter(this, void 0, void 0, function () {
            var srcDimension, originImage, canvas, scale, scaleCanvas, distBlob;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.outputType = this.file.type;
                        srcDimension = {};
                        if (!isSupportedType(this.file.type)) {
                            throw new Error("unsupported file type: " + this.file.type);
                        }
                        return [4 /*yield*/, this.getOriginImage()];
                    case 1:
                        originImage = _a.sent();
                        return [4 /*yield*/, this.getCanvas(originImage)];
                    case 2:
                        canvas = _a.sent();
                        scale = 1;
                        if (this.config.maxWidth) {
                            scale = Math.min(1, this.config.maxWidth / canvas.width);
                        }
                        if (this.config.maxHeight) {
                            scale = Math.min(1, scale, this.config.maxHeight / canvas.height);
                        }
                        srcDimension.width = canvas.width;
                        srcDimension.height = canvas.height;
                        return [4 /*yield*/, this.doScale(canvas, scale)];
                    case 3:
                        scaleCanvas = _a.sent();
                        distBlob = this.toBlob(scaleCanvas);
                        if (distBlob.size > this.file.size && this.config.noCompressIfLarger) {
                            return [2 /*return*/, {
                                    dist: this.file,
                                    width: srcDimension.width,
                                    height: srcDimension.height
                                }];
                        }
                        return [2 /*return*/, {
                                dist: distBlob,
                                width: scaleCanvas.width,
                                height: scaleCanvas.height
                            }];
                }
            });
        });
    };
    Compress.prototype.clear = function (ctx, width, height) {
        // jpeg 没有 alpha 通道，透明区间会被填充成黑色，这里把透明区间填充为白色
        if (this.outputType === defaultType) {
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, width, height);
        }
        else {
            ctx.clearRect(0, 0, width, height);
        }
    };
    /** 通过 file 初始化 image 对象 */
    Compress.prototype.getOriginImage = function () {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var url = createObjectURL(_this.file);
            var img = new Image();
            img.onload = function () {
                resolve(img);
            };
            img.onerror = function () {
                reject('image load error');
            };
            img.src = url;
        });
    };
    Compress.prototype.getCanvas = function (img) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            // 通过得到图片的信息来调整显示方向以正确显示图片，主要解决 ios 系统上的图片会有旋转的问题
            EXIF.getData(img, function () {
                var orientation = EXIF.getTag(img, 'Orientation') || 1;
                var _a = getTransform(img, orientation), width = _a.width, height = _a.height, matrix = _a.matrix;
                var canvas = document.createElement('canvas');
                var context = canvas.getContext('2d');
                canvas.width = width;
                canvas.height = height;
                if (!context) {
                    reject(new Error('context is null'));
                    return;
                }
                _this.clear(context, width, height);
                context.transform.apply(context, __spread(matrix));
                context.drawImage(img, 0, 0);
                resolve(canvas);
            });
        });
    };
    Compress.prototype.doScale = function (source, scale) {
        return __awaiter(this, void 0, void 0, function () {
            var sctx, steps, factor, mirror, mctx, width, height, originWidth, originHeight, src, context, i, dw, dh, canvas, data;
            return __generator(this, function (_a) {
                if (scale === 1) {
                    return [2 /*return*/, source];
                }
                sctx = source.getContext('2d');
                steps = Math.min(maxSteps, Math.ceil((1 / scale) / scaleFactor));
                factor = Math.pow(scale, (1 / steps));
                mirror = document.createElement('canvas');
                mctx = mirror.getContext('2d');
                width = source.width, height = source.height;
                originWidth = width;
                originHeight = height;
                mirror.width = width;
                mirror.height = height;
                if (!mctx || !sctx) {
                    throw new Error("mctx or sctx can't be null");
                }
                for (i = 0; i < steps; i++) {
                    dw = width * factor | 0 // eslint-disable-line no-bitwise
                    ;
                    dh = height * factor | 0 // eslint-disable-line no-bitwise
                    ;
                    // 到最后一步的时候 dw, dh 用目标缩放尺寸，否则会出现最后尺寸偏小的情况
                    if (i === steps - 1) {
                        dw = originWidth * scale;
                        dh = originHeight * scale;
                    }
                    if (i % 2 === 0) {
                        src = source;
                        context = mctx;
                    }
                    else {
                        src = mirror;
                        context = sctx;
                    }
                    // 每次画前都清空，避免图像重叠
                    this.clear(context, width, height);
                    context.drawImage(src, 0, 0, width, height, 0, 0, dw, dh);
                    width = dw;
                    height = dh;
                }
                canvas = src === source ? mirror : source;
                data = context.getImageData(0, 0, width, height);
                // resize
                canvas.width = width;
                canvas.height = height;
                // store image data
                context.putImageData(data, 0, 0);
                return [2 /*return*/, canvas];
            });
        });
    };
    /** 这里把 base64 字符串转为 blob 对象 */
    Compress.prototype.toBlob = function (result) {
        var dataURL = result.toDataURL(this.outputType, this.config.quality);
        var buffer = atob(dataURL.split(',')[1]).split('').map(function (char) { return char.charCodeAt(0); });
        var blob = new Blob([new Uint8Array(buffer)], { type: this.outputType });
        return blob;
    };
    return Compress;
}());
var compressImage = function (file, options) { return new Compress(file, options).process(); };
export default compressImage;
//# sourceMappingURL=compress.js.map
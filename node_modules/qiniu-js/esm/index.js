import StatisticsLogger from './statisticsLog';
import createUploadManager from './upload';
import { Observable } from './observable';
import compressImage from './compress';
var statisticsLogger = new StatisticsLogger();
/**
 * @param file 上传文件
 * @param key 目标文件名
 * @param token 上传凭证
 * @param putExtra 上传文件的相关资源信息配置
 * @param config 上传任务的配置
 * @returns 返回用于上传任务的可观察对象
 */
function upload(file, key, token, putExtra, config) {
    var options = {
        file: file,
        key: key,
        token: token,
        putExtra: putExtra,
        config: config
    };
    return new Observable(function (observer) {
        var manager = createUploadManager(options, {
            onData: function (data) { return observer.next(data); },
            onError: function (err) { return observer.error(err); },
            onComplete: function (res) { return observer.complete(res); }
        }, statisticsLogger);
        manager.putFile();
        return manager.stop.bind(manager);
    });
}
export { getHeadersForMkFile, getHeadersForChunkUpload } from './utils';
export { urlSafeBase64Encode, urlSafeBase64Decode } from './base64';
export { deleteUploadedChunks, getUploadUrl } from './api';
export { imageMogr2, watermark, imageInfo, exif, pipeline } from './image';
export { region } from './config';
export { upload, compressImage };
//# sourceMappingURL=index.js.map
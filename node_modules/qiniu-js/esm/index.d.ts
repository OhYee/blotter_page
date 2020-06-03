import { Extra, Config, UploadProgress } from './upload';
import { Observable } from './observable';
import { CustomError } from './utils';
import { UploadCompleteData } from './api';
import compressImage from './compress';
/**
 * @param file 上传文件
 * @param key 目标文件名
 * @param token 上传凭证
 * @param putExtra 上传文件的相关资源信息配置
 * @param config 上传任务的配置
 * @returns 返回用于上传任务的可观察对象
 */
declare function upload(file: File, key: string | null | undefined, token: string, putExtra?: Partial<Extra>, config?: Partial<Config>): Observable<UploadProgress, CustomError, UploadCompleteData>;
export { getHeadersForMkFile, getHeadersForChunkUpload } from './utils';
export { urlSafeBase64Encode, urlSafeBase64Decode } from './base64';
export { CompressResult } from './compress';
export { deleteUploadedChunks, getUploadUrl } from './api';
export { imageMogr2, watermark, imageInfo, exif, pipeline } from './image';
export { region } from './config';
export { upload, compressImage };

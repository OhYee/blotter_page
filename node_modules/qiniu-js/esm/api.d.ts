import * as utils from './utils';
import { Config, UploadInfo } from './upload';
interface UpHosts {
    data: {
        up: {
            acc: {
                main: string[];
            };
        };
    };
}
export declare function getUpHosts(token: string, protocol: 'https:' | 'http:'): Promise<UpHosts>;
/** 获取上传url */
export declare function getUploadUrl(config: Config, token: string): Promise<string>;
export interface InitPartsData {
    /** 该文件的上传 id， 后续该文件其他各个块的上传，已上传块的废弃，已上传块的合成文件，都需要该 id */
    uploadId: string;
    /** uploadId 的过期时间 */
    expireAt: number;
}
/**
 * @param token 上传鉴权凭证
 * @param bucket 上传空间
 * @param key 目标文件名
 * @param uploadUrl 上传地址
 */
export declare function initUploadParts(token: string, bucket: string, key: string | null | undefined, uploadUrl: string): utils.Response<InitPartsData>;
export interface UploadChunkData {
    etag: string;
    md5: string;
}
/**
 * @param token 上传鉴权凭证
 * @param index 当前 chunk 的索引
 * @param uploadInfo 上传信息
 * @param options 请求参数
 */
export declare function uploadChunk(token: string, key: string | null | undefined, index: number, uploadInfo: UploadInfo, options: Partial<utils.RequestOptions>): utils.Response<UploadChunkData>;
export declare type UploadCompleteData = any;
/**
 * @param token 上传鉴权凭证
 * @param key 目标文件名
 * @param uploadInfo 上传信息
 * @param options 请求参数
 */
export declare function uploadComplete(token: string, key: string | null | undefined, uploadInfo: UploadInfo, options: Partial<utils.RequestOptions>): utils.Response<UploadCompleteData>;
/**
 * @param token 上传鉴权凭证
 * @param key 目标文件名
 * @param uploadInfo 上传信息
 */
export declare function deleteUploadedChunks(token: string, key: string | null | undefined, uploadinfo: UploadInfo): utils.Response<void>;
export {};

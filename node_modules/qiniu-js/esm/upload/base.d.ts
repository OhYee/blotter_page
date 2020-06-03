import * as utils from '../utils';
import { UploadCompleteData } from '../api';
import StatisticsLogger from '../statisticsLog';
import { region } from '../config';
export declare const DEFAULT_CHUNK_SIZE = 4;
/** 上传文件的资源信息配置 */
export interface Extra {
    /** 文件原文件名 */
    fname: string;
    /** 用来放置自定义变量 */
    customVars?: {
        [key: string]: string;
    };
    /** 自定义元信息 */
    metadata?: {
        [key: string]: string;
    };
    /** 文件类型设置 */
    mimeType?: string;
}
/** 上传任务的配置信息 */
export interface Config {
    /** 是否开启 cdn 加速 */
    useCdnDomain: boolean;
    /** 是否对分片进行 md5校验 */
    checkByMD5: boolean;
    /** 强制直传 */
    forceDirect: boolean;
    /** 上传失败后重试次数 */
    retryCount: number;
    /** 自定义上传域名 */
    uphost: string;
    /** 自定义分片上传并发请求量 */
    concurrentRequestLimit: number;
    /** 是否禁止静态日志上报 */
    disableStatisticsReport: boolean;
    /** 分片大小，单位为 MB */
    chunkSize: number;
    /** 上传域名协议 */
    upprotocol: 'http:' | 'https:';
    /** 上传区域 */
    region?: typeof region[keyof typeof region];
}
export interface UploadOptions {
    file: File;
    key: string | null | undefined;
    token: string;
    putExtra?: Partial<Extra>;
    config?: Partial<Config>;
}
export interface UploadInfo {
    id: string;
    url: string;
}
/** 传递给外部的上传进度信息 */
export interface UploadProgress {
    total: ProgressCompose;
    uploadInfo?: UploadInfo;
    chunks?: ProgressCompose[];
}
export interface UploadHandler {
    onData: (data: UploadProgress) => void;
    onError: (err: utils.CustomError) => void;
    onComplete: (res: any) => void;
}
export interface Progress {
    loaded: number;
    total: number;
}
export interface ProgressCompose {
    loaded: number;
    size: number;
    percent: number;
}
export declare type XHRHandler = (xhr: XMLHttpRequest) => void;
export default abstract class Base {
    private statisticsLogger;
    protected config: Config;
    protected putExtra: Extra;
    protected xhrList: XMLHttpRequest[];
    protected file: File;
    protected key: string | null | undefined;
    protected aborted: boolean;
    protected retryCount: number;
    protected token: string;
    protected uploadUrl: string;
    protected bucket: string;
    protected uploadAt: number;
    protected progress: UploadProgress;
    protected onData: (data: UploadProgress) => void;
    protected onError: (err: utils.CustomError) => void;
    protected onComplete: (res: any) => void;
    protected abstract run(): utils.Response<any>;
    constructor(options: UploadOptions, handlers: UploadHandler, statisticsLogger: StatisticsLogger);
    putFile(): Promise<utils.ResponseSuccess<UploadCompleteData>>;
    private clear;
    stop(): void;
    addXhr(xhr: XMLHttpRequest): void;
    private sendLog;
    getProgressInfoItem(loaded: number, size: number): {
        loaded: number;
        size: number;
        percent: number;
    };
}

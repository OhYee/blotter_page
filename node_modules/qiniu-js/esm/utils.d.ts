import { Progress, LocalInfo } from './upload';
export declare const MB: number;
export declare function getChunks(file: File, blockSize: number): Blob[];
export declare function isMetaDataValid(params: {
    [key: string]: string;
}): boolean;
export declare function isCustomVarsValid(params: {
    [key: string]: string;
}): boolean;
export declare function sum(list: number[]): number;
export declare function setLocalFileInfo(localKey: string, info: LocalInfo): void;
export declare function createLocalKey(name: string, key: string | null | undefined, size: number): string;
export declare function removeLocalFileInfo(localKey: string): void;
export declare function getLocalFileInfo(localKey: string): LocalInfo | null;
export declare function getAuthHeaders(token: string): {
    Authorization: string;
};
export declare function getHeadersForChunkUpload(token: string): {
    Authorization: string;
    'content-type': string;
};
export declare function getHeadersForMkFile(token: string): {
    Authorization: string;
    'content-type': string;
};
export declare function createXHR(): XMLHttpRequest;
export declare function computeMd5(data: Blob): Promise<string>;
export declare function readAsArrayBuffer(data: Blob): Promise<ArrayBuffer>;
export interface ResponseSuccess<T> {
    data: T;
    reqId: string;
}
export interface ResponseError {
    code: number; /** 请求错误状态码，只有在 err.isRequestError 为 true 的时候才有效。可查阅码值对应说明。*/
    message: string; /** 错误信息，包含错误码，当后端返回提示信息时也会有相应的错误信息。 */
    isRequestError: true | undefined; /** 用于区分是否 xhr 请求错误当 xhr 请求出现错误并且后端通过 HTTP 状态码返回了错误信息时，该参数为 true否则为 undefined 。 */
    reqId: string; /** xhr请求错误的 X-Reqid。 */
}
export declare type CustomError = ResponseError | Error | any;
export declare type XHRHandler = (xhr: XMLHttpRequest) => void;
export interface RequestOptions {
    method: string;
    onProgress?: (data: Progress) => void;
    onCreate?: XHRHandler;
    body?: BodyInit | null;
    headers?: {
        [key: string]: string;
    };
}
export declare type Response<T> = Promise<ResponseSuccess<T>>;
export declare function request<T>(url: string, options: RequestOptions): Response<T>;
export declare function getPortFromUrl(url: string): string;
export declare function getDomainFromUrl(url: string): string;
export declare function getPutPolicy(token: string): {
    ak: string;
    bucket: string;
};
export declare function createObjectURL(file: File): string;
export interface TransformValue {
    width: number;
    height: number;
    matrix: [number, number, number, number, number, number];
}
export declare function getTransform(image: HTMLImageElement, orientation: number): TransformValue;

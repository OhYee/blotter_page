import * as utils from '../utils';
import { UploadChunkData } from '../api';
import Base, { Extra } from './base';
export interface UploadedChunkStorage extends UploadChunkData {
    size: number;
}
export interface ChunkLoaded {
    mkFileProgress: 0 | 1;
    chunks: number[];
}
export interface ChunkInfo {
    chunk: Blob;
    index: number;
}
export interface LocalInfo {
    data: UploadedChunkStorage[];
    id: string;
}
export interface ChunkPart {
    etag: string;
    partNumber: number;
}
export interface UploadChunkBody extends Extra {
    parts: ChunkPart[];
}
export default class Resume extends Base {
    private chunks;
    /** 当前上传过程中已完成的上传信息 */
    private uploadedList;
    /** 当前上传片进度信息 */
    private loaded;
    private uploadId;
    protected run(): Promise<utils.ResponseSuccess<any>>;
    private uploadChunk;
    private mkFileReq;
    private initBeforeUploadChunks;
    private getUploadInfo;
    private getLocalKey;
    private updateChunkProgress;
    private updateMkFileProgress;
    private notifyResumeProgress;
}

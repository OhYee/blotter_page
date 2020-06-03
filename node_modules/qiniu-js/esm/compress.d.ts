export interface CompressOptions {
    quality?: number;
    noCompressIfLarger?: boolean;
    maxWidth?: number;
    maxHeight?: number;
}
export interface Dimension {
    width?: number;
    height?: number;
}
export interface CompressResult {
    dist: Blob;
    width: number;
    height: number;
}
declare const compressImage: (file: File, options: CompressOptions) => Promise<CompressResult>;
export default compressImage;

export interface ImageViewOptions {
    mode: number;
    format?: string;
    w?: number;
    h?: number;
    q?: number;
}
export interface ImageWatermark {
    image: string;
    mode: number;
    fontsize?: number;
    dissolve?: number;
    dx?: number;
    dy?: number;
    gravity?: string;
    text?: string;
    font?: string;
    fill?: string;
}
export interface ImageMogr2 {
    'auto-orient'?: boolean;
    strip?: boolean;
    thumbnail?: number;
    crop?: number;
    gravity?: number;
    format?: number;
    blur?: number;
    quality?: number;
    rotate?: number;
}
declare type Pipeline = (ImageWatermark & {
    fop: 'watermark';
}) | (ImageViewOptions & {
    fop: 'imageView2';
}) | (ImageMogr2 & {
    fop: 'imageMogr2';
});
export interface Entry {
    domain: string;
    key: string;
}
export declare function imageView2(op: ImageViewOptions, key?: string, domain?: string): string;
export declare function imageMogr2(op: ImageMogr2, key?: string, domain?: string): string;
export declare function watermark(op: ImageWatermark, key?: string, domain?: string): string;
export declare function imageInfo(key: string, domain: string): import("./utils").Response<unknown>;
export declare function exif(key: string, domain: string): import("./utils").Response<unknown>;
export declare function pipeline(arr: Pipeline[], key?: string, domain?: string): string;
export {};

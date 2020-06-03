export declare type RunTask<T> = (...args: T[]) => Promise<void>;
export interface QueueContent<T> {
    task: T;
    resolve: () => void;
    reject: (err?: any) => void;
}
export declare class Pool<T> {
    private runTask;
    private limit;
    queue: Array<QueueContent<T>>;
    processing: Array<QueueContent<T>>;
    constructor(runTask: RunTask<T>, limit: number);
    enqueue(task: T): Promise<unknown>;
    run(item: QueueContent<T>): void;
    check(): void;
}

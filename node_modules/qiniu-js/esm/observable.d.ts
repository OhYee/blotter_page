/** 消费者接口 */
export interface IObserver<T, E, C> {
    /** 用来接收 Observable 中的 next 类型通知 */
    next: (value: T) => void;
    /** 用来接收 Observable 中的 error 类型通知 */
    error: (err: E) => void;
    /** 用来接收 Observable 中的 complete 类型通知 */
    complete: (res: C) => void;
}
export interface NextObserver<T, E, C> {
    next: (value: T) => void;
    error?: (err: E) => void;
    complete?: (res: C) => void;
}
export interface ErrorObserver<T, E, C> {
    next?: (value: T) => void;
    error: (err: E) => void;
    complete?: (res: C) => void;
}
export interface CompletionObserver<T, E, C> {
    next?: (value: T) => void;
    error?: (err: E) => void;
    complete: (res: C) => void;
}
export declare type PartialObserver<T, E, C> = NextObserver<T, E, C> | ErrorObserver<T, E, C> | CompletionObserver<T, E, C>;
export interface IUnsubscribable {
    /** 取消 observer 的订阅 */
    unsubscribe(): void;
}
/** Subscription 的接口 */
export interface ISubscriptionLike extends IUnsubscribable {
    readonly closed: boolean;
}
export declare type TeardownLogic = () => void;
export interface ISubscribable<T, E, C> {
    subscribe(observer?: PartialObserver<T, E, C> | ((value: T) => void), error?: (error: any) => void, complete?: () => void): IUnsubscribable;
}
/** 表示可清理的资源，比如 Observable 的执行 */
declare class Subscription implements ISubscriptionLike {
    /** 用来标示该 Subscription 是否被取消订阅的标示位 */
    closed: boolean;
    /** 清理 subscription 持有的资源 */
    private _unsubscribe;
    /** 取消 observer 的订阅 */
    unsubscribe(): void;
    /** 添加一个 tear down 在该 Subscription 的 unsubscribe() 期间调用 */
    add(teardown: TeardownLogic): void;
}
/**
 * 实现 Observer 接口并且继承 Subscription 类，Observer 是消费 Observable 值的公有 API
 * 所有 Observers 都转化成了 Subscriber，以便提供类似 Subscription 的能力，比如 unsubscribe
*/
export declare class Subscriber<T, E, C> extends Subscription implements IObserver<T, E, C> {
    protected isStopped: boolean;
    protected destination: Partial<IObserver<T, E, C>>;
    constructor(observerOrNext?: PartialObserver<T, E, C> | ((value: T) => void) | null, error?: ((err: E) => void) | null, complete?: ((res: C) => void) | null);
    unsubscribe(): void;
    next(value: T): void;
    error(err: E): void;
    complete(result: C): void;
}
/** 可观察对象，当前的上传事件的集合 */
export declare class Observable<T, E, C> implements ISubscribable<T, E, C> {
    private _subscribe;
    constructor(_subscribe: (subscriber: Subscriber<T, E, C>) => TeardownLogic);
    subscribe(observer: PartialObserver<T, E, C>): Subscription;
    subscribe(next: null | undefined, error: null | undefined, complete: (res: C) => void): Subscription;
    subscribe(next: null | undefined, error: (error: E) => void, complete?: (res: C) => void): Subscription;
    subscribe(next: (value: T) => void, error: null | undefined, complete: (res: C) => void): Subscription;
}
export {};

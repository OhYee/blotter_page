interface LogInfo {
    code: number;
    reqId: string;
    host: string;
    remoteIp: string;
    port: string;
    duration: number;
    time: number;
    bytesSent: number;
    upType: 'jssdk-h5';
    size: number;
}
export default class StatisticsLogger {
    log(info: LogInfo, token: string): void;
    send(logString: string, token: string, retryCount: number): void;
}
export {};

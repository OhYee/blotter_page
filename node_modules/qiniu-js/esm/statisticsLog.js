import { createXHR } from './utils';
var StatisticsLogger = /** @class */ (function () {
    function StatisticsLogger() {
    }
    StatisticsLogger.prototype.log = function (info, token) {
        var logString = Object.values(info).join(',');
        this.send(logString, token, 0);
    };
    StatisticsLogger.prototype.send = function (logString, token, retryCount) {
        var _this = this;
        var xhr = createXHR();
        xhr.open('POST', 'https://uplog.qbox.me/log/3');
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.setRequestHeader('Authorization', 'UpToken ' + token);
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4 && xhr.status !== 200 && ++retryCount <= 3) {
                _this.send(logString, token, retryCount);
            }
        };
        xhr.send(logString);
    };
    return StatisticsLogger;
}());
export default StatisticsLogger;
//# sourceMappingURL=statisticsLog.js.map
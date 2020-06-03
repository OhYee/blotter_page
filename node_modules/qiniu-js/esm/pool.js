var Pool = /** @class */ (function () {
    function Pool(runTask, limit) {
        this.runTask = runTask;
        this.limit = limit;
        this.queue = [];
        this.processing = [];
    }
    Pool.prototype.enqueue = function (task) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            _this.queue.push({
                task: task,
                resolve: resolve,
                reject: reject
            });
            _this.check();
        });
    };
    Pool.prototype.run = function (item) {
        var _this = this;
        this.queue = this.queue.filter(function (v) { return v !== item; });
        this.processing.push(item);
        this.runTask(item.task).then(function () {
            _this.processing = _this.processing.filter(function (v) { return v !== item; });
            item.resolve();
            _this.check();
        }, function (err) { return item.reject(err); });
    };
    Pool.prototype.check = function () {
        var _this = this;
        var processingNum = this.processing.length;
        var availableNum = this.limit - processingNum;
        this.queue.slice(0, availableNum).forEach(function (item) {
            _this.run(item);
        });
    };
    return Pool;
}());
export { Pool };
//# sourceMappingURL=pool.js.map
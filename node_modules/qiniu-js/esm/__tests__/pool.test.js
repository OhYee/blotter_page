import { Pool } from "../pool";
var m = jest.fn();
var task = function () {
    return new Promise(function (resolve, _) {
        m();
        resolve();
    });
};
describe("test Pool for control concurrency", function () {
    var pool = new Pool(task, 2);
    test("pool.js", function () {
        var chunk = new Blob();
        var data = [
            { chunk: chunk, index: 0 },
            { chunk: chunk, index: 1 },
            { chunk: chunk, index: 2 },
            { chunk: chunk, index: 3 },
            { chunk: chunk, index: 4 },
            { chunk: chunk, index: 5 }
        ];
        return Promise.all(data.map(function (value) {
            pool.enqueue(value);
            expect(pool.processing.length).toBeLessThanOrEqual(2);
        })).then(function () {
            expect(m.mock.calls.length).toBe(6);
        });
    });
});
//# sourceMappingURL=pool.test.js.map
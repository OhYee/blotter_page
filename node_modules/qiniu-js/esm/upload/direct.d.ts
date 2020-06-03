import Base from './base';
export default class Direct extends Base {
    protected run(): Promise<import("../utils").ResponseSuccess<any>>;
    private updateDirectProgress;
    private finishDirectProgress;
}

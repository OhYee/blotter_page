import Resume from './resume';
import Direct from './direct';
import { UploadOptions, UploadHandler } from './base';
import StatisticsLogger from '../statisticsLog';
export * from './base';
export * from './resume';
export default function createUploadManager(options: UploadOptions, handlers: UploadHandler, statisticsLogger: StatisticsLogger): Resume | Direct;

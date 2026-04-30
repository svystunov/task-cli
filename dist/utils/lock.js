/** File locking utility */
import * as fs from 'fs';
import * as path from 'path';
export class FileLock {
    constructor(lockPath) {
        this.locked = false;
        this.lockPath = lockPath;
    }
    async acquire() {
        if (this.locked) {
            throw new Error('Lock already acquired');
        }
        const lockDir = path.dirname(this.lockPath);
        if (!fs.existsSync(lockDir)) {
            fs.mkdirSync(lockDir, { recursive: true });
        }
        // Try to create lock file exclusively
        try {
            fs.writeFileSync(this.lockPath, process.pid.toString(), { flag: 'wx' });
            this.locked = true;
        }
        catch (err) {
            throw new Error(`Could not acquire lock: ${this.lockPath}`);
        }
    }
    async release() {
        if (!this.locked) {
            throw new Error('Lock not acquired');
        }
        try {
            fs.unlinkSync(this.lockPath);
            this.locked = false;
        }
        catch (err) {
            throw new Error(`Could not release lock: ${this.lockPath}`);
        }
    }
    isAcquired() {
        return this.locked;
    }
}
export async function withLock(lockPath, callback) {
    const lock = new FileLock(lockPath);
    try {
        await lock.acquire();
        return await callback();
    }
    finally {
        if (lock.isAcquired()) {
            await lock.release();
        }
    }
}
//# sourceMappingURL=lock.js.map
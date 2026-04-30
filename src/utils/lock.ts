/** File locking utility */

import * as fs from 'fs';
import * as path from 'path';

export class FileLock {
  private lockPath: string;
  private locked: boolean = false;

  constructor(lockPath: string) {
    this.lockPath = lockPath;
  }

  async acquire(): Promise<void> {
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
    } catch (err) {
      throw new Error(`Could not acquire lock: ${this.lockPath}`);
    }
  }

  async release(): Promise<void> {
    if (!this.locked) {
      throw new Error('Lock not acquired');
    }

    try {
      fs.unlinkSync(this.lockPath);
      this.locked = false;
    } catch (err) {
      throw new Error(`Could not release lock: ${this.lockPath}`);
    }
  }

  isAcquired(): boolean {
    return this.locked;
  }
}

export async function withLock<T>(
  lockPath: string,
  callback: () => Promise<T>
): Promise<T> {
  const lock = new FileLock(lockPath);
  try {
    await lock.acquire();
    return await callback();
  } finally {
    if (lock.isAcquired()) {
      await lock.release();
    }
  }
}

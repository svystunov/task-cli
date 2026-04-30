/** File locking utility */
export declare class FileLock {
    private lockPath;
    private locked;
    constructor(lockPath: string);
    acquire(): Promise<void>;
    release(): Promise<void>;
    isAcquired(): boolean;
}
export declare function withLock<T>(lockPath: string, callback: () => Promise<T>): Promise<T>;
//# sourceMappingURL=lock.d.ts.map
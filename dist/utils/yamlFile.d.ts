/** YAML file utilities */
export interface TaskData {
    id: string;
    name: string;
    estimated_s: number;
    estimated_t: number;
    description: string;
    comments: CommentData[];
}
export interface CommentData {
    id: string;
    spent_s: number;
    spent_t: number;
    assign: string;
    priority: string;
    status: string;
    content: string;
}
export declare function parseTaskFile(filePath: string): TaskData;
export declare function parseTaskContent(content: string): TaskData;
export declare function serializeTaskData(data: TaskData): string;
export declare function saveTaskFile(filePath: string, data: TaskData): void;
//# sourceMappingURL=yamlFile.d.ts.map
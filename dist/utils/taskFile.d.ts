/** Task file utilities */
import { TaskData } from './yamlFile.js';
export declare function getTaskFilePath(taskId: string, taskName: string, tasksDir: string): string;
export declare function getNextTaskId(tasksDir: string): string;
export declare function incrementNextTaskId(tasksDir: string): void;
export declare function createTaskFile(taskId: string, taskName: string, estimatedS: number, estimatedT: number, description: string, tasksDir: string): string;
export declare function loadTask(taskId: string, tasksDir: string): TaskData;
export declare function updateTaskFile(taskId: string, taskData: TaskData, tasksDir: string): string;
export declare function deleteTaskFile(taskId: string, tasksDir: string): void;
export declare function listTasks(tasksDir: string): {
    id: string;
    name: string;
    filePath: string;
}[];
//# sourceMappingURL=taskFile.d.ts.map
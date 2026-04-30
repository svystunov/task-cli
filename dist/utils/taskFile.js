/** Task file utilities */
import * as fs from 'fs';
import * as path from 'path';
import { toSlug } from './slug.js';
import { parseTaskFile, saveTaskFile } from './yamlFile.js';
import { NEXT_ID_FILE } from '../constants.js';
export function getTaskFilePath(taskId, taskName, tasksDir) {
    const slug = toSlug(taskName);
    const filename = `${taskId}-${slug}.md`;
    return path.join(tasksDir, filename);
}
export function getNextTaskId(tasksDir) {
    const nextIdFile = path.join(tasksDir, '..', NEXT_ID_FILE);
    if (!fs.existsSync(nextIdFile)) {
        // Create initial next_id.txt
        fs.writeFileSync(nextIdFile, '1');
        return '00001';
    }
    const content = fs.readFileSync(nextIdFile, 'utf-8').trim();
    const nextId = parseInt(content, 10);
    return nextId.toString().padStart(5, '0');
}
export function incrementNextTaskId(tasksDir) {
    const nextIdFile = path.join(tasksDir, '..', NEXT_ID_FILE);
    let currentId = 1;
    if (fs.existsSync(nextIdFile)) {
        const content = fs.readFileSync(nextIdFile, 'utf-8').trim();
        currentId = parseInt(content, 10);
    }
    fs.writeFileSync(nextIdFile, (currentId + 1).toString());
}
export function createTaskFile(taskId, taskName, estimatedS, estimatedT, description, tasksDir) {
    const filePath = getTaskFilePath(taskId, taskName, tasksDir);
    const taskData = {
        id: taskId,
        name: taskName,
        estimated_s: estimatedS,
        estimated_t: estimatedT,
        description,
        comments: []
    };
    saveTaskFile(filePath, taskData);
    incrementNextTaskId(tasksDir);
    return filePath;
}
export function loadTask(taskId, tasksDir) {
    // Find task file by ID prefix
    const files = fs.readdirSync(tasksDir);
    const taskFile = files.find(f => f.startsWith(`${taskId}-`));
    if (!taskFile) {
        throw new Error(`Task ${taskId} not found`);
    }
    return parseTaskFile(path.join(tasksDir, taskFile));
}
export function updateTaskFile(taskId, taskData, tasksDir) {
    // Find task file by ID prefix
    const files = fs.readdirSync(tasksDir);
    const taskFile = files.find(f => f.startsWith(`${taskId}-`));
    if (!taskFile) {
        throw new Error(`Task ${taskId} not found`);
    }
    const filePath = path.join(tasksDir, taskFile);
    saveTaskFile(filePath, taskData);
    return filePath;
}
export function deleteTaskFile(taskId, tasksDir) {
    const files = fs.readdirSync(tasksDir);
    const taskFile = files.find(f => f.startsWith(`${taskId}-`));
    if (taskFile) {
        fs.unlinkSync(path.join(tasksDir, taskFile));
    }
}
export function listTasks(tasksDir) {
    if (!fs.existsSync(tasksDir)) {
        return [];
    }
    const files = fs.readdirSync(tasksDir);
    return files
        .filter(f => f.endsWith('.md'))
        .map(f => {
        const match = f.match(/^(\d+)-(.+)\.md$/);
        if (match) {
            return {
                id: match[1],
                name: match[2].replace(/-/g, ' '),
                filePath: path.join(tasksDir, f)
            };
        }
        return null;
    })
        .filter((item) => item !== null)
        .sort((a, b) => parseInt(a.id, 10) - parseInt(b.id, 10));
}
//# sourceMappingURL=taskFile.js.map
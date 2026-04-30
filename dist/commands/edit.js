/** Command: edit - Edit a task */
import { Command } from 'commander';
import { loadTask, updateTaskFile } from '../utils/taskFile.js';
import { TASKS_DIR } from '../constants.js';
export const editCommand = new Command('edit')
    .description('Edit a task')
    .argument('<id>', 'Task ID')
    .option('-d, --description <text>', 'New description')
    .option('-n, --name <text>', 'New name')
    .action((id, options) => {
    const tasksDir = TASKS_DIR;
    try {
        const taskData = loadTask(id, tasksDir);
        let changed = false;
        if (options.description) {
            taskData.description = options.description;
            changed = true;
        }
        if (options.name) {
            taskData.name = options.name;
            changed = true;
        }
        if (!changed) {
            console.log('No changes specified.');
            return;
        }
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Task updated: ${filePath}`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=edit.js.map
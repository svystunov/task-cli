/** Command: delete - Delete a task */
import { Command } from 'commander';
import { deleteTaskFile } from '../utils/taskFile.js';
import { TASKS_DIR } from '../constants.js';
export const deleteCommand = new Command('delete')
    .description('Delete a task')
    .argument('<id>', 'Task ID')
    .action((id) => {
    const tasksDir = TASKS_DIR;
    try {
        deleteTaskFile(id, tasksDir);
        console.log(`Task ${id} deleted.`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=delete.js.map
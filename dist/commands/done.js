/** Command: done - Mark task as done */
import { Command } from 'commander';
import { loadTask, updateTaskFile } from '../utils/taskFile.js';
import { getStatuses } from '../utils/config.js';
import { TASKS_DIR, CONFIG_DIR } from '../constants.js';
export const doneCommand = new Command('done')
    .description('Mark task as done')
    .argument('<id>', 'Task ID')
    .action((id) => {
    const tasksDir = TASKS_DIR;
    const configDir = CONFIG_DIR;
    // Validate status
    const statuses = getStatuses(configDir);
    if (!statuses.some(s => s.key === 'done')) {
        console.error('Error: "done" status not defined in config');
        process.exit(1);
    }
    try {
        const taskData = loadTask(id, tasksDir);
        // Update first comment's status to done
        if (taskData.comments.length > 0) {
            taskData.comments[0].status = 'done';
        }
        else {
            // Add a comment if none exists
            taskData.comments.push({
                id: `${id}-1`,
                spent_s: 0,
                spent_t: 0,
                assign: '',
                priority: 'normal',
                status: 'done',
                content: 'Task marked as done'
            });
        }
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Task ${id} marked as done: ${filePath}`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=done.js.map
/** Command: assign - Assign/unassign tasks */
import { Command } from 'commander';
import { loadTask, updateTaskFile } from '../utils/taskFile.js';
import { validateAssignee, getTeamMembers } from '../utils/config.js';
import { TASKS_DIR, CONFIG_DIR } from '../constants.js';
export const assignCommand = new Command('assign')
    .description('Assign a task to a user')
    .argument('<id>', 'Task ID')
    .argument('<user>', 'Assignee')
    .action((id, user) => {
    const tasksDir = TASKS_DIR;
    const configDir = CONFIG_DIR;
    // Validate assignee
    if (!validateAssignee(user, configDir)) {
        const team = getTeamMembers(configDir);
        console.error(`Error: Invalid assignee '${user}'`);
        console.error('Valid team members:');
        team.forEach(m => console.error(`  ${m.key} - ${m.description}`));
        process.exit(1);
    }
    try {
        const taskData = loadTask(id, tasksDir);
        // Update first comment's assignee
        if (taskData.comments.length > 0) {
            taskData.comments[0].assign = user;
        }
        else {
            // Add a comment if none exists
            taskData.comments.push({
                id: `${id}-1`,
                spent_s: 0,
                spent_t: 0,
                assign: user,
                priority: 'normal',
                status: 'draft',
                content: `Assigned to ${user}`
            });
        }
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Task ${id} assigned to ${user}: ${filePath}`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
export const unassignCommand = new Command('unassign')
    .description('Unassign a task')
    .argument('<id>', 'Task ID')
    .action((id) => {
    const tasksDir = TASKS_DIR;
    try {
        const taskData = loadTask(id, tasksDir);
        // Update first comment's assignee
        if (taskData.comments.length > 0) {
            taskData.comments[0].assign = '';
        }
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Task ${id} unassigned: ${filePath}`);
    }
    catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
    }
});
//# sourceMappingURL=assign.js.map
/** Command: list - List tasks with optional filters */
import { Command } from 'commander';
import { listTasks } from '../utils/taskFile.js';
import { getStatuses, getPriorities, getTeamMembers } from '../utils/config.js';
import { parseTaskFile } from '../utils/yamlFile.js';
import { TASKS_DIR, CONFIG_DIR } from '../constants.js';
export const listCommand = new Command('list')
    .description('List tasks with optional filters')
    .option('-s, --status <status>', 'Filter by status')
    .option('-a, --assignee <user>', 'Filter by assignee')
    .option('-P, --priority <level>', 'Filter by priority')
    .action((options) => {
    const tasksDir = TASKS_DIR;
    const configDir = CONFIG_DIR;
    // Validate filters if provided
    if (options.status) {
        const statuses = getStatuses(configDir);
        if (!statuses.some(s => s.key === options.status)) {
            console.error(`Error: Invalid status '${options.status}'`);
            console.error('Valid statuses:');
            statuses.forEach(s => console.error(`  ${s.key} - ${s.description}`));
            process.exit(1);
        }
    }
    if (options.assignee) {
        const team = getTeamMembers(configDir);
        if (!team.some(m => m.key === options.assignee)) {
            console.error(`Error: Invalid assignee '${options.assignee}'`);
            console.error('Valid team members:');
            team.forEach(m => console.error(`  ${m.key} - ${m.description}`));
            process.exit(1);
        }
    }
    if (options.priority) {
        const priorities = getPriorities(configDir);
        if (!priorities.some(p => p.key === options.priority)) {
            console.error(`Error: Invalid priority '${options.priority}'`);
            console.error('Valid priorities:');
            priorities.forEach(p => console.error(`  ${p.key} - ${p.description}`));
            process.exit(1);
        }
    }
    const tasks = listTasks(tasksDir);
    // Apply filters
    let filteredTasks = tasks;
    if (options.status) {
        filteredTasks = filteredTasks.filter(t => {
            try {
                const taskData = parseTaskFile(t.filePath);
                return taskData.comments.length > 0 && taskData.comments[0].status === options.status;
            }
            catch {
                return false;
            }
        });
    }
    if (options.assignee) {
        filteredTasks = filteredTasks.filter(t => {
            try {
                const taskData = parseTaskFile(t.filePath);
                return taskData.comments.length > 0 && taskData.comments[0].assign === options.assignee;
            }
            catch {
                return false;
            }
        });
    }
    if (options.priority) {
        filteredTasks = filteredTasks.filter(t => {
            try {
                const taskData = parseTaskFile(t.filePath);
                return taskData.comments.length > 0 && taskData.comments[0].priority === options.priority;
            }
            catch {
                return false;
            }
        });
    }
    if (filteredTasks.length === 0) {
        console.log('No tasks found.');
        return;
    }
    console.log('Tasks:');
    filteredTasks.forEach(t => {
        console.log(`  ${t.id} - ${t.name}`);
    });
});
//# sourceMappingURL=list.js.map
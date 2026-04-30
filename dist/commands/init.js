/** Command: init - Initialize task directory structure */
import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { DEFAULT_TEAM, DEFAULT_STATUSES, DEFAULT_PRIORITY } from '../constants.js';
export const initCommand = new Command('init')
    .description('Initialize task directory structure with default config files')
    .action(() => {
    const taskDir = '.task';
    // Create directory structure
    const configDir = path.join(taskDir, 'config');
    const tasksDir = path.join(taskDir, 'tasks');
    if (!fs.existsSync(taskDir)) {
        fs.mkdirSync(taskDir, { recursive: true });
    }
    if (!fs.existsSync(configDir)) {
        fs.mkdirSync(configDir, { recursive: true });
    }
    if (!fs.existsSync(tasksDir)) {
        fs.mkdirSync(tasksDir, { recursive: true });
    }
    // Create default config files
    const teamFile = path.join(configDir, 'team.md');
    if (!fs.existsSync(teamFile)) {
        fs.writeFileSync(teamFile, DEFAULT_TEAM);
    }
    const statusesFile = path.join(configDir, 'statuses.md');
    if (!fs.existsSync(statusesFile)) {
        fs.writeFileSync(statusesFile, DEFAULT_STATUSES);
    }
    const priorityFile = path.join(configDir, 'priority.md');
    if (!fs.existsSync(priorityFile)) {
        fs.writeFileSync(priorityFile, DEFAULT_PRIORITY);
    }
    // Create next_id.txt
    const nextIdFile = path.join(taskDir, 'next_id.txt');
    if (!fs.existsSync(nextIdFile)) {
        fs.writeFileSync(nextIdFile, '1');
    }
    console.log('Task directory structure initialized:');
    console.log(`  ${taskDir}/`);
    console.log(`  ${configDir}/`);
    console.log(`  ${tasksDir}/`);
    console.log(`  ${nextIdFile}`);
});
//# sourceMappingURL=init.js.map
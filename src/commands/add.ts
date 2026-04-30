/** Command: add - Add a new task */

import { Command } from 'commander';
import * as path from 'path';
import { getNextTaskId, createTaskFile } from '../utils/taskFile.js';
import { validateAssignee, validateStatus, validatePriority, getTeamMembers, getStatuses, getPriorities } from '../utils/config.js';
import { TASKS_DIR, CONFIG_DIR } from '../constants.js';

export const addCommand = new Command('add')
  .description('Add a new task')
  .argument('<description>', 'Task description')
  .option('-P, --priority <level>', 'Priority level (low/normal/high/critical)', 'normal')
  .option('-a, --assignee <user>', 'Assignee', 'dev')
  .option('-d, --due <date>', 'Due date (YYYY-MM-DD)')
  .option('-s, --status <status>', 'Status', 'draft')
  .option('--estimated-s <seconds>', 'Estimated seconds', '0')
  .option('--estimated-t <tokens>', 'Estimated tokens', '0')
  .action((description, options) => {
    const tasksDir = TASKS_DIR;
    const configDir = CONFIG_DIR;
    
    // Validate assignee
    if (!validateAssignee(options.assignee, configDir)) {
      const team = getTeamMembers(configDir);
      console.error(`Error: Invalid assignee '${options.assignee}'`);
      console.error('Valid team members:');
      team.forEach(m => console.error(`  ${m.key} - ${m.description}`));
      process.exit(1);
    }
    
    // Validate status
    if (!validateStatus(options.status, configDir)) {
      const statuses = getStatuses(configDir);
      console.error(`Error: Invalid status '${options.status}'`);
      console.error('Valid statuses:');
      statuses.forEach(s => console.error(`  ${s.key} - ${s.description}`));
      process.exit(1);
    }
    
    // Validate priority
    if (!validatePriority(options.priority, configDir)) {
      const priorities = getPriorities(configDir);
      console.error(`Error: Invalid priority '${options.priority}'`);
      console.error('Valid priorities:');
      priorities.forEach(p => console.error(`  ${p.key} - ${p.description}`));
      process.exit(1);
    }
    
    // Get next task ID
    const taskId = getNextTaskId(tasksDir);
    
    // Create task file
    const filePath = createTaskFile(
      taskId,
      description,
      parseInt(options.estimatedS, 10),
      parseInt(options.estimatedT, 10),
      description,
      tasksDir
    );
    
    console.log(`Task created: ${filePath}`);
    console.log(`  ID: ${taskId}`);
    console.log(`  Name: ${description}`);
    console.log(`  Priority: ${options.priority}`);
    console.log(`  Assignee: ${options.assignee}`);
    console.log(`  Status: ${options.status}`);
  });

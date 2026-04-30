/** Command: show - Show task details */

import { Command } from 'commander';
import * as path from 'path';
import { loadTask } from '../utils/taskFile.js';
import { TASKS_DIR } from '../constants.js';

export const showCommand = new Command('show')
  .description('Show task details')
  .argument('<id>', 'Task ID')
  .action((id) => {
    const tasksDir = TASKS_DIR;
    
    try {
      const taskData = loadTask(id, tasksDir);
      
      console.log(`Task ${id}: ${taskData.name}`);
      console.log(`  Estimated time: ${taskData.estimated_s}s / ${taskData.estimated_t} tokens`);
      console.log('');
      console.log('Description:');
      console.log(taskData.description);
      console.log('');
      
      if (taskData.comments.length > 0) {
        console.log('Comments:');
        taskData.comments.forEach((comment, index) => {
          console.log(`  Comment ${index + 1} (${comment.id}):`);
          console.log(`    Assign: ${comment.assign}`);
          console.log(`    Priority: ${comment.priority}`);
          console.log(`    Status: ${comment.status}`);
          console.log(`    Spent: ${comment.spent_s}s / ${comment.spent_t} tokens`);
          console.log(`    ${comment.content}`);
        });
      } else {
        console.log('No comments.');
      }
    } catch (err: any) {
      console.error(`Error: ${err.message}`);
      process.exit(1);
    }
  });

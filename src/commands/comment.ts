/** Command: comment - Manage task comments */

import { Command } from 'commander';
import * as path from 'path';
import { loadTask, updateTaskFile } from '../utils/taskFile.js';
import { validateAssignee, validateStatus, validatePriority, getTeamMembers, getStatuses, getPriorities } from '../utils/config.js';
import { TASKS_DIR, CONFIG_DIR } from '../constants.js';

export const commentCommand = new Command('comment')
  .description('Manage task comments')
  .addCommand(new Command('add')
    .description('Add a comment to a task')
    .argument('<id>', 'Task ID')
    .argument('<text>', 'Comment text')
    .option('--author <user>', 'Author', 'dev')
    .action((id, text, options) => {
      const tasksDir = TASKS_DIR;
      const configDir = CONFIG_DIR;
      
      // Validate author
      if (!validateAssignee(options.author, configDir)) {
        const team = getTeamMembers(configDir);
        console.error(`Error: Invalid author '${options.author}'`);
        console.error('Valid team members:');
        team.forEach(m => console.error(`  ${m.key} - ${m.description}`));
        process.exit(1);
      }
      
      try {
        const taskData = loadTask(id, tasksDir);
        
        // Get current comment values from last comment or defaults
        let assign = options.author;
        let priority = 'normal';
        let status = 'draft';
        let spent_s = 0;
        let spent_t = 0;
        
        if (taskData.comments.length > 0) {
          const lastComment = taskData.comments[taskData.comments.length - 1];
          assign = lastComment.assign;
          priority = lastComment.priority;
          status = lastComment.status;
        }
        
        // Find next comment number
        const commentNum = taskData.comments.length + 1;
        const commentId = `${id}-${commentNum}`;
        
        taskData.comments.push({
          id: commentId,
          spent_s,
          spent_t,
          assign,
          priority,
          status,
          content: text
        });
        
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Comment added to task ${id}: ${filePath}`);
      } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    }))
  .addCommand(new Command('list')
    .description('List comments for a task')
    .argument('<id>', 'Task ID')
    .action((id) => {
      const tasksDir = TASKS_DIR;
      
      try {
        const taskData = loadTask(id, tasksDir);
        
        if (taskData.comments.length === 0) {
          console.log('No comments.');
          return;
        }
        
        console.log(`Comments for task ${id}:`);
        taskData.comments.forEach((comment, index) => {
          console.log(`  ${index + 1}. [${comment.id}] ${comment.content}`);
        });
      } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    }))
  .addCommand(new Command('show')
    .description('Show a specific comment')
    .argument('<id>', 'Task ID')
    .option('-c, --comment <id>', 'Comment ID')
    .action((id, options) => {
      const tasksDir = TASKS_DIR;
      
      try {
        const taskData = loadTask(id, tasksDir);
        
        if (options.comment) {
          // Show specific comment
          const comment = taskData.comments.find(c => c.id === options.comment);
          if (!comment) {
            console.error(`Comment ${options.comment} not found.`);
            process.exit(1);
          }
          console.log(`Comment ${comment.id}:`);
          console.log(`  Assign: ${comment.assign}`);
          console.log(`  Priority: ${comment.priority}`);
          console.log(`  Status: ${comment.status}`);
          console.log(`  Spent: ${comment.spent_s}s / ${comment.spent_t} tokens`);
          console.log(`  ${comment.content}`);
        } else {
          // Show all comments
          if (taskData.comments.length === 0) {
            console.log('No comments.');
            return;
          }
          console.log(`Comments for task ${id}:`);
          taskData.comments.forEach((comment, index) => {
            console.log(`  ${index + 1}. [${comment.id}] ${comment.content}`);
          });
        }
      } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    }))
  .addCommand(new Command('edit')
    .description('Edit a comment')
    .argument('<id>', 'Task ID')
    .argument('<comment_id>', 'Comment ID')
    .argument('<new_text>', 'New comment text')
    .action((id, commentId, newText) => {
      const tasksDir = TASKS_DIR;
      
      try {
        const taskData = loadTask(id, tasksDir);
        
        const comment = taskData.comments.find(c => c.id === commentId);
        if (!comment) {
          console.error(`Comment ${commentId} not found.`);
          process.exit(1);
        }
        
        comment.content = newText;
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Comment ${commentId} updated: ${filePath}`);
      } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    }))
  .addCommand(new Command('delete')
    .description('Delete a comment')
    .argument('<id>', 'Task ID')
    .argument('<comment_id>', 'Comment ID')
    .action((id, commentId) => {
      const tasksDir = TASKS_DIR;
      
      try {
        const taskData = loadTask(id, tasksDir);
        
        const commentIndex = taskData.comments.findIndex(c => c.id === commentId);
        if (commentIndex === -1) {
          console.error(`Comment ${commentId} not found.`);
          process.exit(1);
        }
        
        taskData.comments.splice(commentIndex, 1);
        const filePath = updateTaskFile(id, taskData, tasksDir);
        console.log(`Comment ${commentId} deleted: ${filePath}`);
      } catch (err: any) {
        console.error(`Error: ${err.message}`);
        process.exit(1);
      }
    }));

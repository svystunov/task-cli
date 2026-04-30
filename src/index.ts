/** Task Management CLI - Main entry point */

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { initCommand } from './commands/init.js';
import { addCommand } from './commands/add.js';
import { listCommand } from './commands/list.js';
import { showCommand } from './commands/show.js';
import { editCommand } from './commands/edit.js';
import { deleteCommand } from './commands/delete.js';
import { assignCommand, unassignCommand } from './commands/assign.js';
import { commentCommand } from './commands/comment.js';
import { doneCommand } from './commands/done.js';

const program = new Command();

program
  .name('task')
  .description('Task Management CLI - Manage tasks with assignees, tags, and comments')
  .version('0.1.0');

// Add subcommands
program.addCommand(initCommand);
program.addCommand(addCommand);
program.addCommand(listCommand);
program.addCommand(showCommand);
program.addCommand(editCommand);
program.addCommand(deleteCommand);
program.addCommand(assignCommand);
program.addCommand(unassignCommand);
program.addCommand(commentCommand);
program.addCommand(doneCommand);

program.parse();

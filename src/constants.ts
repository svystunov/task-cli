/** Constants and configuration for task CLI */

export const CONFIG_DIR = '.task/config';
export const TASKS_DIR = '.task/tasks';
export const NEXT_ID_FILE = 'next_id.txt';
export const LOCK_FILE = '.task/.lock';

export const TASK_FILE_PATTERN = '{id:05d}-{slug}.md';

export const TASK_YAML_FIELDS = ['id', 'name', 'estimated_s', 'estimated_t'];
export const COMMENT_YAML_FIELDS = ['id', 'spent_s', 'spent_t', 'assign', 'priority', 'status'];

export const YAML_SEP = '---';

export const DEFAULT_TEAM = `# Team members list
dev Developer
`;

export const DEFAULT_STATUSES = `# Task statuses enum
draft Initial state
ready_for_work Task was groomed and ready for work
ready_for_test Task was developed and ready for QA
done Task completed
`;

export const DEFAULT_PRIORITY = `# Task priority enum
low Low priority task
normal Default priority
high High priority
critical Do it now
`;

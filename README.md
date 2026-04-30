# Task Management CLI

A CLI tool for managing tasks with support for assignees, tags, and comments.

## Installation

```bash
npm install svystunov/task-cli#main
```

## Usage

### Basic Commands

```bash
# Show help on command
task help

# Create task folders and init task config files with default values for statuses and team 
task init

# Add a new task
task add "Buy groceries" --priority high --assign me

# List all tasks
task list

# List tasks with filters
task list --status pending --assign BA --priority high

# Show task details
task show 1

# Mark task as done
task done 1

# Edit a task
task edit 1 --description "Buy milk and eggs"

# Delete a task
task delete 1
```

### Assignment

```bash
# Assign a task
task assign 1 john

# Unassign a task
task unassign 1
```

### Comments

```bash
# Add a comment
task comment add 1 "This is important" --author me

# List comments
task comment list 1

# Show a comment
task comment show 1

# Edit a comment
task comment edit 1 "Updated comment"

# Delete a comment
task comment delete 1
```

### Options

- `-P, --priority <level>`: Priority (low/medium/high)
- `-a, --assignee <user>`: Assignee
- `-d, --due <date>`: Due date (YYYY-MM-DD)
- `-s, --status <status>`: Status (draft/ready_to_work/...)

## File structure

Everything should be stored in a project-related `.task` folder.

```
.task/
├── config/
│   ├── team.md
│   ├── statuses.md
│   └── priority.md
├── tasks/
│   ├── 00001-the-init-task-for-repo-initialization.md
│   ├── 00002-ci-cd-initial-configuration.md
│   └── ...
└── next_id.txt
```

### Team members

Task assignment should be done to a person from the list.

`.task/config/team.md`:
```
# Team members list
BA Business Analyst
PM Product Manage
...
[1 word - key]<Space>[Description]
```
### Task statuses

`.task/config/statuses.md`:
```
# Task statuses enum
draft  Initial state
ready_for_work Task was groomed and ready for work
ready_for_test Task was developed and ready for QA
...
[1 word - key]<Space>[Description]
```

### Task priority

`.task/config/priority.md`:
```
# Task priority enum
normal  default normal task priority
low task with low priority
critical do it now
...
[1 word - key]<Space>[Description]
```


### Tasks

Tasks are stored inside the project file system.

```
.task/tasks/00001-the-init-task-for-repo-initialization.md
.task/tasks/00002-ci-cd-initial-configuration.md
```

Each file contains 1 task and several comments.

Format: YAML + MD (separated by `---`):
```
---
id: 00002
name: CI/CD initial configuration. Setup of git. Project scaffolding
estimated_t: 20000
estimated_s: 600
---
<Full task description>
CI/CD initial configuration. Register project on Argo CD. 
Setup of git repo on corporate github. 
Project scaffolding - initial file structure
---
id: 00002-1
spent_s: 0
spent_t: 0
assign: PM
priority: normal
status: draft
---
Initial assignment
---
id: 00002-2
spent_s: 120
spent_t: 5000
assign: DevOps
priority: high
status: ready_for_work
---
Pls proceed
---
```
#### Task attributes

| Field           | Required | Constraints                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`            | Yes      | 5 digits sequential number. Describes task number                                                                 |
| `name`          | Yes      | 128 max length string. Short/simplified task description                                                          |        
| `estimated_s`   | Yes      | Int number. Amount of seconds the task was estimated                                                              |
| `estimated_t`   | Yes      | Int number. Amount of tokens the task was estimated                                                               |


After YAML part there is a task description in MD wrapped in "---"


#### Comment attributes

| Field           | Required | Constraints                                                                                                       |
| --------------- | -------- | ----------------------------------------------------------------------------------------------------------------- |
| `id`            | Yes      | 5 digits sequential task's number and unique sequential comment's number split by "-"                             |
| `spent_s`       | Yes      | Int number. Amount of seconds spent on this task                                                                  |
| `spent_t`       | Yes      | Int number. Amount of tokens spent on this task                                                                   |
| `assign`        | Yes      | One word. Who is assigned to this task now                                                                        |
| `priority`      | Yes      | One word. What is the task's priority now                                                                         |
| `status`        | Yes      | One word. What is the task's status now                                                                           |

After YAML part there is a comment in MD wrapped in "---"



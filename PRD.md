# PRD: Task Management CLI

## 1. Overview

Build a CLI tool for managing tasks with support for assignees, tags, comments, priorities, and statuses. Tasks are stored as individual markdown files in a project-local `.task/` directory.

## 2. Requirements

### 2.1 Core Functionality

| Feature | Description |
|---------|-------------|
| `task init` | Create `.task/` directory structure with default config files |
| `task add` | Create a new task with metadata |
| `task list` | List tasks with optional filters (status, assignee, priority) |
| `task show` | Display task details and comments |
| `task edit` | Update task metadata |
| `task delete` | Remove a task |
| `task assign` | Assign/unassign tasks to team members |
| `task comment` | Add/list/show/edit/delete comments on tasks |
| `task done` | Mark task as completed |

### 2.2 File Structure

```
.task/
├── config/
│   ├── team.md        # Team members list
│   ├── statuses.md    # Task status enum
│   └── priority.md    # Priority levels
├── tasks/
│   ├── 00001-task-name.md
│   ├── 00002-task-name.md
│   └── ...
└── next_id.txt        # Sequential ID counter
```

### 2.3 Task File Format

```yaml
---
id: 00002
name: CI/CD initial configuration
estimated_s: 600
estimated_t: 20000
---
# Task Description

Full task description in markdown...

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
```

**Format Rules:**
- YAML blocks separated by `---` (YAML document separator)
- First YAML block is task metadata
- Following YAML blocks are comments
- MD content follows each YAML block
- Task ID: 5-digit sequential number
- Comment ID: `{task_id}-{comment_sequence}`

### 2.4 Configuration Files

**team.md**
```
# Team members list
BA Business Analyst
PM Product Manager
dev1 Developer One
```

**statuses.md**
```
# Task statuses enum
draft Initial state
ready_for_work Task was groomed and ready for work
ready_for_test Task was developed and ready for QA
done Task completed
```

**priority.md**
```
# Task priority enum
low Low priority task
normal Default priority
high High priority
critical Do it now
```

## 3. Implementation Details

### 3.1 ID Management
- Use `.task/next_id.txt` to track sequential task IDs
- Lock file during ID generation to prevent conflicts
- Task filename format: `{id}-{slug}.md` (slug uses hyphens, lowercase, alphanumeric only)

### 3.2 File Locking
- Use file locking on `.task/tasks/` directory operations
- Lock acquired before any write operation
- Lock released after successful write

### 3.3 Data Validation
- Validate task ID format (5 digits)
- Validate comment ID format ({task_id}-{comment_num})
- Validate assignee exists in team.md
- Validate status exists in statuses.md
- Validate priority exists in priority.md
- Validate name length ≤ 128 chars
- Validate estimated_s and estimated_t are positive integers

### 3.4 Commands

| Command | Syntax | Description |
|---------|--------|-------------|
| `task init` | `task init` | Initialize task directory structure |
| `task add` | `task add "<name>" [--priority <level>] [--assign <user>] [--due <date>] [--status <status>]` | Create new task |
| `task list` | `task list [--status <status>] [--assign <user>] [--priority <level>]` | List tasks with filters |
| `task show` | `task show <id>` | Show task details and comments |
| `task edit` | `task edit <id> [--name <name>] [--description <desc>]` | Edit task |
| `task delete` | `task delete <id>` | Delete task |
| `task assign` | `task assign <id> <user>` | Assign task to user |
| `task unassign` | `task unassign <id>` | Remove assignment |
| `task comment add` | `task comment add <id> "<text>" [--author <user>]` | Add comment |
| `task comment list` | `task comment list <id>` | List comments |
| `task comment show` | `task comment show <id> [--comment <comment_id>]` | Show comment(s) |
| `task comment edit` | `task comment edit <id> <comment_id> "<new_text>"` | Edit comment |
| `task comment delete` | `task comment delete <id> <comment_id>` | Delete comment |
| `task done` | `task done <id>` | Mark task as done |

### 3.5 Options

| Option | Description |
|--------|-------------|
| `-P, --priority <level>` | Priority level (low/normal/high/critical) |
| `-a, --assignee <user>` | Assignee (team member key) |
| `-d, --due <date>` | Due date (YYYY-MM-DD) |
| `-s, --status <status>` | Status (from statuses.md) |
| `--author <user>` | Comment author |

## 4. Technical Stack

- **Language**: Python 3.10+
- **CLI Framework**: Click or Typer
- **YAML Parser**: PyYAML
- **File Locking**: `fcntl` (Unix) / `msvcrt` (Windows)
- **Date Handling**: `datetime` module

## 5. Non-Goals (Current Version)

- No backup/restore mechanism
- No concurrent modification handling beyond file locking
- No migration strategy for format changes
- No search functionality
- No reporting/analytics
- No integration with external systems (Jira, GitHub, etc.)

## 6. Future Enhancements

- Search across tasks and comments
- Export to CSV/JSON
- Import from Jira/GitHub
- Reporting dashboard
- Due date reminders
- Task dependencies
- Time tracking
- Attachments

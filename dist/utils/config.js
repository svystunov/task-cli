/** Configuration file utilities */
import * as fs from 'fs';
import * as path from 'path';
export function parseConfigFile(filePath) {
    if (!fs.existsSync(filePath)) {
        return [];
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    const lines = content.split('\n');
    const items = [];
    for (const line of lines) {
        const trimmed = line.trim();
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
            continue;
        }
        // Parse: [key] [description]
        const match = trimmed.match(/^(\S+)\s+(.+)$/);
        if (match) {
            items.push({
                key: match[1],
                description: match[2]
            });
        }
    }
    return items;
}
export function getTeamMembers(configDir) {
    const teamFile = path.join(configDir, 'team.md');
    return parseConfigFile(teamFile);
}
export function getStatuses(configDir) {
    const statusesFile = path.join(configDir, 'statuses.md');
    return parseConfigFile(statusesFile);
}
export function getPriorities(configDir) {
    const priorityFile = path.join(configDir, 'priority.md');
    return parseConfigFile(priorityFile);
}
export function validateAssignee(assignee, configDir) {
    const team = getTeamMembers(configDir);
    return team.some(m => m.key === assignee);
}
export function validateStatus(status, configDir) {
    const statuses = getStatuses(configDir);
    return statuses.some(s => s.key === status);
}
export function validatePriority(priority, configDir) {
    const priorities = getPriorities(configDir);
    return priorities.some(p => p.key === priority);
}
//# sourceMappingURL=config.js.map
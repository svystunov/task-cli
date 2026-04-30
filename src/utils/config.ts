/** Configuration file utilities */

import * as fs from 'fs';
import * as path from 'path';

export interface TeamMember {
  key: string;
  description: string;
}

export interface ConfigItem {
  key: string;
  description: string;
}

export function parseConfigFile(filePath: string): ConfigItem[] {
  if (!fs.existsSync(filePath)) {
    return [];
  }

  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  
  const items: ConfigItem[] = [];
  
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

export function getTeamMembers(configDir: string): TeamMember[] {
  const teamFile = path.join(configDir, 'team.md');
  return parseConfigFile(teamFile) as TeamMember[];
}

export function getStatuses(configDir: string): ConfigItem[] {
  const statusesFile = path.join(configDir, 'statuses.md');
  return parseConfigFile(statusesFile);
}

export function getPriorities(configDir: string): ConfigItem[] {
  const priorityFile = path.join(configDir, 'priority.md');
  return parseConfigFile(priorityFile);
}

export function validateAssignee(assignee: string, configDir: string): boolean {
  const team = getTeamMembers(configDir);
  return team.some(m => m.key === assignee);
}

export function validateStatus(status: string, configDir: string): boolean {
  const statuses = getStatuses(configDir);
  return statuses.some(s => s.key === status);
}

export function validatePriority(priority: string, configDir: string): boolean {
  const priorities = getPriorities(configDir);
  return priorities.some(p => p.key === priority);
}

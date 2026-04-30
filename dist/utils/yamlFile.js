/** YAML file utilities */
import * as fs from 'fs';
import * as yaml from 'yaml';
import { YAML_SEP } from '../constants.js';
export function parseTaskFile(filePath) {
    const content = fs.readFileSync(filePath, 'utf-8');
    return parseTaskContent(content);
}
export function parseTaskContent(content) {
    const parts = content.split(YAML_SEP);
    if (parts.length < 2 || parts.length % 2 !== 0) {
        throw new Error('Invalid task file format: expected YAML-MD pairs');
    }
    const taskYaml = parts[0].trim();
    const taskDesc = parts[1].trim();
    const taskData = yaml.parse(taskYaml);
    const comments = [];
    for (let i = 2; i < parts.length; i += 2) {
        const commentYaml = parts[i].trim();
        const commentContent = parts[i + 1].trim();
        const commentData = yaml.parse(commentYaml);
        comments.push({
            ...commentData,
            content: commentContent
        });
    }
    return {
        id: taskData.id,
        name: taskData.name,
        estimated_s: taskData.estimated_s,
        estimated_t: taskData.estimated_t,
        description: taskDesc,
        comments
    };
}
export function serializeTaskData(data) {
    const parts = [];
    // Task YAML
    const taskYaml = yaml.stringify({
        id: data.id,
        name: data.name,
        estimated_s: data.estimated_s,
        estimated_t: data.estimated_t
    });
    parts.push(taskYaml.trim());
    parts.push(data.description);
    // Comments
    for (const comment of data.comments) {
        const commentYaml = yaml.stringify({
            id: comment.id,
            spent_s: comment.spent_s,
            spent_t: comment.spent_t,
            assign: comment.assign,
            priority: comment.priority,
            status: comment.status
        });
        parts.push(commentYaml.trim());
        parts.push(comment.content);
    }
    return parts.join('\n' + YAML_SEP + '\n');
}
export function saveTaskFile(filePath, data) {
    const content = serializeTaskData(data);
    fs.writeFileSync(filePath, content, 'utf-8');
}
//# sourceMappingURL=yamlFile.js.map
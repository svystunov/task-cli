/** Configuration file utilities */
export interface TeamMember {
    key: string;
    description: string;
}
export interface ConfigItem {
    key: string;
    description: string;
}
export declare function parseConfigFile(filePath: string): ConfigItem[];
export declare function getTeamMembers(configDir: string): TeamMember[];
export declare function getStatuses(configDir: string): ConfigItem[];
export declare function getPriorities(configDir: string): ConfigItem[];
export declare function validateAssignee(assignee: string, configDir: string): boolean;
export declare function validateStatus(status: string, configDir: string): boolean;
export declare function validatePriority(priority: string, configDir: string): boolean;
//# sourceMappingURL=config.d.ts.map
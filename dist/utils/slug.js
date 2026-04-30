/** Utility functions for slug generation */
export function toSlug(text) {
    return text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/[\s]+/g, '-')
        .replace(/-+/g, '-')
        .substring(0, 100);
}
//# sourceMappingURL=slug.js.map
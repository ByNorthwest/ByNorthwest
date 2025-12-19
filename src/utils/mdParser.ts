export interface ParsedMarkdown {
    attributes: Record<string, any>;
    body: string;
}

export function parseMarkdown(markdown: string): ParsedMarkdown {
    const frontmatterRegex = /^---\s*([\s\S]*?)\s*---/;
    const match = markdown.match(frontmatterRegex);

    if (!match) {
        return {
            attributes: {},
            body: markdown
        };
    }

    const frontmatterBlock = match[1];
    const body = markdown.replace(frontmatterRegex, '').trim();

    const attributes: Record<string, any> = {};

    if (frontmatterBlock) {
        frontmatterBlock.split('\n').forEach(line => {
            const colonIndex = line.indexOf(':');
            if (colonIndex !== -1) {
                const key = line.slice(0, colonIndex).trim();
                let value: any = line.slice(colonIndex + 1).trim();

                // Basic type parsing
                if (value.startsWith('"') && value.endsWith('"')) {
                    value = value.slice(1, -1);
                } else if (value.startsWith('[') && value.endsWith(']')) {
                    // Simple array parsing for tags: ["a", "b"]
                    value = (value.slice(1, -1) as string).split(',').map((v: string) => v.trim().replace(/^"|"$/g, ''));
                } else if (value === 'true') {
                    value = true;
                } else if (value === 'false') {
                    value = false;
                }

                attributes[key] = value;
            }
        });
    }

    return { attributes, body };
}

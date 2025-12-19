export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    content: string; // Markdown
    excerpt: string;
    tags: string[];
    createdAt: string; // ISO date
    updatedAt: string;
    published: boolean;
}

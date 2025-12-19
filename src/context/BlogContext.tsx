import React, { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import type { BlogPost } from '../types';
import { parseMarkdown } from '../utils/mdParser';

interface BlogState {
    posts: BlogPost[];
}

const BlogContext = createContext<{
    state: BlogState;
} | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [state, setState] = useState<BlogState>({ posts: [] });

    useEffect(() => {
        const loadPosts = async () => {
            // Load all markdown files from the content directory
            const modules = import.meta.glob('../content/*.md', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>;

            const posts: BlogPost[] = [];

            for (const path in modules) {
                const rawContent = await modules[path]();
                const { attributes, body } = parseMarkdown(rawContent);

                // Extract slug from filename: ../content/my-post.md -> my-post
                const slug = path.split('/').pop()?.replace('.md', '') || '';

                if (attributes.published !== false) {
                    posts.push({
                        id: slug, // Use slug as ID
                        slug: slug,
                        title: attributes.title || 'Untitled',
                        content: body,
                        excerpt: attributes.excerpt || '',
                        tags: attributes.tags || [],
                        createdAt: attributes.date || new Date().toISOString(),
                        updatedAt: attributes.date || new Date().toISOString(),
                        published: true
                    });
                }
            }

            // Sort by date descending
            posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

            setState({ posts });
        };

        loadPosts();
    }, []);

    return (
        <BlogContext.Provider value={{ state }}>
            {children}
        </BlogContext.Provider>
    );
};

export const useBlog = () => {
    const context = useContext(BlogContext);
    if (!context) {
        throw new Error('useBlog must be used within a BlogProvider');
    }
    return context;
};

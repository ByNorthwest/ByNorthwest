import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useBlog } from '../context/BlogContext';
import { Tag } from '../components/ui/Tag';
import { SEO } from '../components/ui/SEO';
import { Search, Calendar, ChevronRight } from 'lucide-react';
import styles from '../styles/pages/Blogs.module.css';

export const Blogs: React.FC = () => {
    const { state } = useBlog();
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Get all unique tags
    const allTags = Array.from(new Set(state.posts.flatMap(post => post.tags)));

    // Filter posts
    const filteredPosts = selectedTag
        ? state.posts.filter(post => post.tags.includes(selectedTag))
        : state.posts;

    // Group posts by year for timeline
    const params = new URLSearchParams(typeof window !== 'undefined' ? window.location.search : '');
    const postsByYear: Record<string, typeof filteredPosts> = {};

    filteredPosts.forEach(post => {
        const year = new Date(post.createdAt).getFullYear().toString();
        if (!postsByYear[year]) {
            postsByYear[year] = [];
        }
        postsByYear[year].push(post);
    });

    const years = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 3fr 1fr',
            gap: 'var(--spacing-2xl)',
            maxWidth: 'var(--container-width)',
            margin: '0 auto',
            padding: 'var(--spacing-xl) var(--spacing-md)'
        }}>
            {/* Left: Timeline (Years) */}
            <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-xl)' }}>
                {/* This column is mainly for visual balance, the actual years are rendered with the posts */}
            </div>

            {/* Center: Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3xl)' }}>
                {years.map(year => (
                    <div key={year} style={{ display: 'flex', gap: 'var(--spacing-xl)' }}>
                        {/* Year Marker */}
                        <div style={{
                            minWidth: '80px',
                            textAlign: 'right',
                            fontFamily: 'var(--font-mono)',
                            fontSize: '2rem',
                            fontWeight: 'bold',
                            color: 'var(--color-primary)',
                            position: 'sticky',
                            top: '100px',
                            height: 'fit-content'
                        }}>
                            {year}
                        </div>

                        {/* Year's Posts */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2xl)', flex: 1, borderLeft: '2px solid var(--color-border)', paddingLeft: 'var(--spacing-xl)' }}>
                            {postsByYear[year].map(post => (
                                <article key={post.id} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-sm)' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)' }}>
                                        <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-text-tertiary)', fontSize: '0.9rem' }}>
                                            {new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }).toUpperCase()}
                                        </span>
                                        <Link to={`/blogs/${post.slug}`} style={{ textDecoration: 'none' }}>
                                            <h2 style={{
                                                margin: 0,
                                                fontSize: '1.5rem',
                                                color: 'var(--color-text-primary)',
                                                cursor: 'pointer'
                                            }} className="hover-link">
                                                {post.title}
                                            </h2>
                                        </Link>
                                    </div>
                                    <p style={{
                                        margin: 0,
                                        color: 'var(--color-text-secondary)',
                                        lineHeight: 1.6,
                                        maxWidth: '600px'
                                    }}>
                                        {post.excerpt}
                                    </p>
                                    <div style={{ display: 'flex', gap: 'var(--spacing-xs)', marginTop: 'var(--spacing-xs)' }}>
                                        {post.tags.map(tag => (
                                            <Tag
                                                key={tag}
                                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                                accent={tag === selectedTag}
                                            >
                                                #{tag}
                                            </Tag>
                                        ))}
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Right: Sticky Tag Cloud */}
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'sticky', top: '100px' }}>
                    <h3 style={{
                        fontFamily: 'var(--font-mono)',
                        textTransform: 'uppercase',
                        letterSpacing: '1px',
                        color: 'var(--color-text-tertiary)',
                        marginBottom: 'var(--spacing-md)'
                    }}>
                        Filter by
                    </h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-sm)' }}>
                        {allTags.map(tag => (
                            <Tag
                                key={tag}
                                onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
                                accent={tag === selectedTag}
                            >
                                {tag}
                            </Tag>
                        ))}
                    </div>
                    {selectedTag && (
                        <button
                            onClick={() => setSelectedTag(null)}
                            style={{
                                marginTop: 'var(--spacing-md)',
                                background: 'none',
                                border: 'none',
                                color: 'var(--color-text-tertiary)',
                                cursor: 'pointer',
                                fontFamily: 'var(--font-mono)',
                                textDecoration: 'underline'
                            }}
                        >
                            Clear Filter
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

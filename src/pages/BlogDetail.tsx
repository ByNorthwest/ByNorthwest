import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Markdown from 'react-markdown';
import { useBlog } from '../context/BlogContext';
import { Tag } from '../components/ui/Tag';
import { SEO } from '../components/ui/SEO';
import { TableOfContents } from '../components/ui/TableOfContents';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import styles from '../styles/pages/BlogDetail.module.css';

import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

// Custom CodeBlock component with Copy functionality
const CodeBlock = ({ language, children }: { language: string, children: string }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        navigator.clipboard.writeText(children);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className={styles.codeBlockContainer}>
            <div className={styles.codeHeader}>
                <span className={styles.codeLang}>{language}</span>
                <button
                    className={styles.copyButton}
                    onClick={handleCopy}
                    aria-label="Copy code"
                >
                    {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
                    <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
            </div>
            <SyntaxHighlighter
                language={language}
                style={vscDarkPlus}
                customStyle={{
                    margin: 0,
                    padding: '1.5em',
                    fontSize: '0.9rem',
                    lineHeight: '1.5',
                    borderRadius: '0 0 var(--radius-md) var(--radius-md)',
                }}
                wrapLines={true}
            >
                {children}
            </SyntaxHighlighter>
        </div>
    );
};

// Custom Image Component
const BlogImage = ({ src, alt }: { src?: string, alt?: string }) => {
    return (
        <figure className={styles.imageFigure}>
            <img
                src={src}
                alt={alt}
                className={styles.mdImg}
                loading="lazy"
            />
            {alt && <figcaption className={styles.imageCaption}>{alt}</figcaption>}
        </figure>
    );
};

export const BlogDetail: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const { state } = useBlog();
    const post = state.posts.find(p => p.slug === slug);

    if (!post) {
        return (
            <div style={{ textAlign: 'center', padding: 'var(--spacing-3xl)' }}>
                <h2>Post not found</h2>
                <Link to="/" style={{ color: 'var(--color-primary)', textDecoration: 'underline' }}>Back to Blogs</Link>
            </div>
        );
    }

    // Estimate reading time
    const wordCount = post.content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200);

    return (
        <div className={styles.pageWrapper}>
            <SEO title={`${post.title} - Northwest`} description={post.excerpt} />

            <div className={styles.container}>
                <Link to="/" className={styles.backLink}>
                    <ArrowLeft size={20} />
                    Back to Timeline
                </Link>

                <div className={styles.contentGrid}>
                    <article className={styles.article}>
                        <header className={styles.header}>
                            <div className={styles.meta}>
                                <span className={styles.date}>
                                    <Calendar size={16} />
                                    {new Date(post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </span>
                                <span className={styles.readTime}>
                                    <Clock size={16} />
                                    {readingTime} min read
                                </span>
                            </div>

                            <h1 className={styles.title}>{post.title}</h1>

                            <div className={styles.tags}>
                                {post.tags.map(tag => (
                                    <Tag key={tag}>#{tag}</Tag>
                                ))}
                            </div>
                        </header>

                        <div className={styles.content}>
                            <Markdown
                                components={{
                                    h1: ({ children }) => <h2 className={styles.mdH1} id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}>{children}</h2>,
                                    h2: ({ children }) => <h2 className={styles.mdH2} id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}>{children}</h2>,
                                    h3: ({ children }) => <h3 className={styles.mdH3} id={String(children).toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}>{children}</h3>,
                                    p: ({ children }) => <p className={styles.mdP}>{children}</p>,
                                    ul: ({ children }) => <ul className={styles.mdUl}>{children}</ul>,
                                    ol: ({ children }) => <ol className={styles.mdOl}>{children}</ol>,
                                    li: ({ children }) => <li className={styles.mdLi}>{children}</li>,
                                    blockquote: ({ children }) => <blockquote className={styles.mdBlockquote}>{children}</blockquote>,
                                    code: ({ className, children, ...props }) => {
                                        const match = /language-(\w+)/.exec(className || '');
                                        const isInline = !match;
                                        return isInline ? (
                                            <code className={styles.mdInlineCode} {...props}>{children}</code>
                                        ) : (
                                            <CodeBlock language={match[1]}>
                                                {String(children).replace(/\n$/, '')}
                                            </CodeBlock>
                                        );
                                    },
                                    img: BlogImage,
                                    a: ({ href, children }) => <a href={href} className={styles.mdLink} target="_blank" rel="noopener noreferrer">{children}</a>,
                                    hr: () => <hr className={styles.mdHr} />
                                }}
                            >
                                {post.content}
                            </Markdown>
                        </div>
                    </article>

                    <aside className={styles.sidebar}>
                        <TableOfContents content={post.content} />
                    </aside>
                </div>
            </div>
        </div>
    );
};

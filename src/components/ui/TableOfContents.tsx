import React, { useEffect, useState } from 'react';
import styles from '../../styles/components/TableOfContents.module.css';

interface TOCProps {
    content: string;
}

interface Heading {
    id: string;
    text: string;
    level: number;
}

export const TableOfContents: React.FC<TOCProps> = ({ content }) => {
    const [headings, setHeadings] = useState<Heading[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        // Parse headings from markdown content
        const lines = content.split('\n');
        const extractedHeadings: Heading[] = [];
        let isInCodeBlock = false;

        lines.forEach((line) => {
            // Skip code blocks
            if (line.trim().startsWith('```')) {
                isInCodeBlock = !isInCodeBlock;
                return;
            }
            if (isInCodeBlock) return;

            // Match H2 and H3
            const match = line.match(/^(##|###)\s+(.+)$/);
            if (match) {
                const level = match[1].length; // 2 for ##, 3 for ###
                const text = match[2].trim();
                const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                extractedHeadings.push({ id, text, level });
            }
        });

        setHeadings(extractedHeadings);
    }, [content]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '0px 0px -80% 0px' }
        );

        headings.forEach(({ id }) => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, [headings]);

    if (headings.length === 0) return null;

    return (
        <nav className={styles.toc} aria-label="Table of contents">
            <h4 className={styles.tocTitle}>On this page</h4>
            <ul className={styles.tocList}>
                {headings.map((heading) => (
                    <li
                        key={heading.id}
                        className={`${styles.tocItem} ${heading.level === 3 ? styles.tocSubItem : ''}`}
                    >
                        <a
                            href={`#${heading.id}`}
                            className={`${styles.tocLink} ${activeId === heading.id ? styles.active : ''}`}
                            onClick={(e) => {
                                e.preventDefault();
                                document.getElementById(heading.id)?.scrollIntoView({
                                    behavior: 'smooth'
                                });
                                setActiveId(heading.id);
                            }}
                        >
                            {heading.text}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
};

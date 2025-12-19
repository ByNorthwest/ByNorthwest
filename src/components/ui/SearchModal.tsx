import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { Search, X, Command } from 'lucide-react';
import { useBlog } from '../../context/BlogContext';
import styles from '../../styles/components/SearchModal.module.css';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const { state } = useBlog();
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    // Initialize Fuse with useMemo to update when posts change
    const fuse = React.useMemo(() => new Fuse(state.posts, {
        keys: [
            { name: 'title', weight: 0.7 },
            { name: 'excerpt', weight: 0.5 },
            { name: 'content', weight: 0.3 },
            { name: 'tags', weight: 0.4 }
        ],
        threshold: 0.4,
        includeMatches: true
    }), [state.posts]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            setQuery('');
            setResults([]);
        }
    }, [isOpen]);

    useEffect(() => {
        if (query.trim()) {
            const searchResults = fuse.search(query).slice(0, 5); // Limit to 5 results
            setResults(searchResults);
            setSelectedIndex(0);
        } else {
            setResults([]);
        }
    }, [query, fuse]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (!isOpen) return;

            switch (e.key) {
                case 'ArrowDown':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setSelectedIndex(prev => (prev - 1 + Math.max(1, results.length)) % Math.max(1, results.length));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (results.length > 0) {
                        const post = results[selectedIndex].item;
                        handleSelect(post.slug);
                    }
                    break;
                case 'Escape':
                    e.preventDefault();
                    onClose();
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, results, selectedIndex]);

    const handleSelect = (slug: string) => {
        navigate(`/blogs/${slug}`);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.searchHeader}>
                    <Search className={styles.searchIcon} size={20} />
                    <input
                        ref={inputRef}
                        type="text"
                        className={styles.searchInput}
                        placeholder="Search articles..."
                        value={query}
                        onChange={e => setQuery(e.target.value)}
                    />
                    <button className={styles.closeButton} onClick={onClose}>
                        <span className={styles.escParams}>ESC</span>
                        <X size={18} />
                    </button>
                </div>

                {results.length > 0 && (
                    <ul className={styles.resultsList}>
                        {results.map((result, index) => (
                            <li
                                key={result.item.slug}
                                className={`${styles.resultItem} ${index === selectedIndex ? styles.selected : ''}`}
                                onClick={() => handleSelect(result.item.slug)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className={styles.resultTitle}>{result.item.title}</div>
                                <div className={styles.resultExcerpt}>
                                    {result.item.excerpt || 'No description available'}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}

                {query && results.length === 0 && (
                    <div className={styles.noResults}>
                        No results found for "{query}"
                    </div>
                )}
            </div>
        </div>
    );
};

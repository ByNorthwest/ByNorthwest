import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, BookOpen, Search } from 'lucide-react';
import { SearchModal } from '../ui/SearchModal';
import styles from '../../styles/components/Navbar.module.css';

const navLinks = [
    { path: '/', label: 'Blogs' },
    { path: '/about', label: 'About' },
];

export const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const location = useLocation();

    // Cmd+K shortcut
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                setIsSearchOpen(true);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <nav className={styles.navbar}>
            <div className={`container ${styles['navbar-container']}`}>
                <Link to="/" className={styles['navbar-brand']}>
                    <BookOpen size={24} strokeWidth={2.5} />
                    <span style={{ fontWeight: 700, letterSpacing: '0.5px' }}>NORTHWEST</span>
                </Link>

                <div className={styles.navActions}>
                    <button
                        className={styles.searchButton}
                        onClick={() => setIsSearchOpen(true)}
                        aria-label="Search"
                    >
                        <Search size={20} />
                    </button>

                    <button
                        className={styles['navbar-toggle']}
                        onClick={() => setIsOpen(!isOpen)}
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>

                <ul className={`${styles['navbar-nav']} ${isOpen ? styles.open : ''}`}>
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <Link
                                to={link.path}
                                className={`${styles['navbar-link']} ${location.pathname === link.path ? styles.active : ''
                                    }`}
                                onClick={() => setIsOpen(false)}
                            >
                                {link.label}
                                {location.pathname === link.path && (
                                    <span className={styles['active-indicator']} />
                                )}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </nav>
    );
};


import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import styles from '../../styles/components/Footer.module.css';

export const Footer: React.FC = () => {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles['footer-content']}>
                    <div className={styles['footer-section']}>
                        <h4>Navigation</h4>
                        <ul className={styles['footer-links']}>
                            <li><Link to="/" className={styles['footer-link']}>Blogs</Link></li>
                            <li><Link to="/about" className={styles['footer-link']}>About</Link></li>
                        </ul>
                    </div>

                    <div className={styles['footer-section']}>
                        <h4>Connect</h4>
                        <p className={styles['footer-link']}>
                            Building the future, one line at a time.
                        </p>
                    </div>
                </div>

                <div className={styles['footer-bottom']}>
                    <p>© {new Date().getFullYear()} Northwest. All rights reserved.</p>
                    <div className={styles['footer-social']}>
                        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                            <Github size={20} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <Twitter size={20} />
                        </a>
                        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                            <Linkedin size={20} />
                        </a>
                        <a href="mailto:contact@example.com">
                            <Mail size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

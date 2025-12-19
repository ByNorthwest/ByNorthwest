import React from 'react';
import styles from '../../styles/components/Tag.module.css';

interface TagProps {
    children: React.ReactNode;
    onClick?: () => void;
    accent?: boolean;
}

export const Tag: React.FC<TagProps> = ({ children, onClick, accent = false }) => {
    const className = accent
        ? `${styles.tag} ${styles['tag-accent']}`
        : onClick
            ? `${styles.tag} ${styles['tag-clickable']}`
            : styles.tag;

    return (
        <span className={className} onClick={onClick}>
            {children}
        </span>
    );
};

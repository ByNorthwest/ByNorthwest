import React from 'react';
import type { ReactNode } from 'react';
import styles from '../../styles/components/Card.module.css';

interface CardProps {
    children: ReactNode;
    glass?: boolean;
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    glass = false,
    className = '',
    onClick
}) => {
    const cardClass = glass ? `${styles.card} ${styles['card-glass']}` : styles.card;

    return (
        <div className={`${cardClass} ${className}`} onClick={onClick}>
            {children}
        </div>
    );
};

import React from 'react';
import type { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from '../../styles/components/Button.module.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    children: ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'medium',
    children,
    className = '',
    ...props
}) => {
    const variantClass = styles[`button-${variant}`];
    const sizeClass = size !== 'medium' ? styles[`button-${size}`] : '';

    return (
        <button
            className={`${styles.button} ${variantClass} ${sizeClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

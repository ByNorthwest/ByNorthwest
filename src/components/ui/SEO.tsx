import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description?: string;
}

export const SEO: React.FC<SEOProps> = ({ title, description }) => {
    return (
        <Helmet>
            <title>{title}</title>
            <meta name="description" content={description || "Northwest's Blog - Engineering, Distributed Systems, and Design"} />
        </Helmet>
    );
};

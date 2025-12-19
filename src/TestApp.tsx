import React from 'react';
import { BrowserRouter } from 'react-router-dom';

function MinimalApp() {
    return (
        <BrowserRouter>
            <div style={{ padding: '2rem' }}>
                <h1>Minimal Test</h1>
                <p>Testing if React Router works</p>
            </div>
        </BrowserRouter>
    );
}

export default MinimalApp;

import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { BlogProvider } from './context/BlogContext';
import { Layout } from './components/Layout/Layout';
import { Blogs } from './pages/Blogs';
import { BlogDetail } from './pages/BlogDetail';
import { About } from './pages/About';
import './styles/globals.css';

function App() {
  return (
    <BlogProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Blogs />} />
            <Route path="/blogs" element={<Navigate to="/" replace />} />
            <Route path="/blogs/:slug" element={<BlogDetail />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </BlogProvider>
  );
}

export default App;

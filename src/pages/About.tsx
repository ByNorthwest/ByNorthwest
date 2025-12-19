import React from 'react';
import { Card } from '../components/ui/Card';
import { SEO } from '../components/ui/SEO';
import { Github, Twitter, Linkedin, Mail, Code, Database, Globe, Cpu } from 'lucide-react';

export const About: React.FC = () => {
    return (
        <div style={{ padding: 'var(--spacing-3xl) 0', maxWidth: '800px', margin: '0 auto' }}>
            <SEO title="About - Northwest" description="Senior Backend Engineer specializing in distributed systems and database internals." />
            <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-3xl)' }}>
                <h1 style={{ fontSize: '3rem', marginBottom: 'var(--spacing-md)', color: 'var(--color-primary)' }}>About Me</h1>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                    Building digital experiences with a focus on comprehensive system design.
                </p>
            </div>

            <div style={{ display: 'grid', gap: 'var(--spacing-2xl)' }}>
                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <span style={{ fontSize: '1.2rem' }}>👋</span>
                        </div>
                        <h2 style={{ margin: 0 }}>Hello, I'm Northwest</h2>
                    </div>

                    <Card glass>
                        <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: 'var(--color-text-primary)' }}>
                            <p style={{ marginBottom: '1em' }}>
                                I'm a senior backend engineer passionate about <strong>distributed systems</strong>,
                                <strong>database internals</strong>, and elegant software architecture.
                            </p>
                            <p style={{ marginBottom: '1em' }}>
                                My philosophy is simple: <em>"Slow is Fast"</em>. I believe that taking the time to understand
                                fundamentals and design proper architectures leads to faster, more maintainable solutions
                                in the long run.
                            </p>
                            <p>
                                I write about my journey in exploring the depths of computer science, from building
                                custom databases to understanding the nuances of language runtimes.
                            </p>
                        </div>
                    </Card>
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-accent-cyan)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Code size={20} />
                        </div>
                        <h2 style={{ margin: 0 }}>Tech Stack</h2>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 'var(--spacing-lg)' }}>
                        <Card glass>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                <Globe className="text-tertiary" size={20} />
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Languages</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                                {['Go', 'Rust', 'TypeScript', 'Python'].map(tech => (
                                    <span key={tech} style={{
                                        padding: '4px 12px',
                                        background: 'rgba(214, 90, 49, 0.1)',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-primary)',
                                        fontWeight: 500
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Card>

                        <Card glass>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                <Database className="text-tertiary" size={20} />
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Infrastructure</h3>
                            </div>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-xs)' }}>
                                {['PostgreSQL', 'Redis', 'Docker', 'Kubernetes'].map(tech => (
                                    <span key={tech} style={{
                                        padding: '4px 12px',
                                        background: 'rgba(38, 166, 154, 0.1)',
                                        borderRadius: '12px',
                                        fontSize: '0.9rem',
                                        color: 'var(--color-accent-cyan)',
                                        fontWeight: 500
                                    }}>
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </Card>

                        <Card glass>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-md)' }}>
                                <Cpu className="text-tertiary" size={20} />
                                <h3 style={{ fontSize: '1.2rem', margin: 0 }}>Interests</h3>
                            </div>
                            <p style={{ color: 'var(--color-text-secondary)', lineHeight: 1.6 }}>
                                LSM-Trees, Raft Consensus, HTTP/2, WebAssembly, Compiler Design
                            </p>
                        </Card>
                    </div>
                </section>

                <section>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-md)', marginBottom: 'var(--spacing-lg)' }}>
                        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--color-text-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                            <Mail size={20} />
                        </div>
                        <h2 style={{ margin: 0 }}>Get in Touch</h2>
                    </div>

                    <div style={{ display: 'flex', gap: 'var(--spacing-md)', flexWrap: 'wrap' }}>
                        {[
                            { icon: Github, label: 'GitHub', url: 'https://github.com' },
                            { icon: Twitter, label: 'Twitter', url: 'https://twitter.com' },
                            { icon: Linkedin, label: 'LinkedIn', url: 'https://linkedin.com' },
                            { icon: Mail, label: 'Email', url: 'mailto:contact@example.com' },
                        ].map((social) => (
                            <a
                                key={social.label}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 'var(--spacing-sm)',
                                    padding: 'var(--spacing-md) var(--spacing-lg)',
                                    background: 'var(--color-surface)',
                                    borderRadius: 'var(--radius-md)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-text-primary)',
                                    fontWeight: 500,
                                    transition: 'all 0.2s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-primary)';
                                    e.currentTarget.style.color = 'var(--color-primary)';
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.borderColor = 'var(--color-border)';
                                    e.currentTarget.style.color = 'var(--color-text-primary)';
                                    e.currentTarget.style.transform = 'translateY(0)';
                                }}
                            >
                                <social.icon size={20} />
                                {social.label}
                            </a>
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

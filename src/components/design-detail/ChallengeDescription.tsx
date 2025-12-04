import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Template } from '@/types/types';

interface ChallengeDescriptionProps {
  template: Template;
}

const DEFAULT_GOAL = 'Implement this within 45-60 minutes. Focus on clean code, edge case handling, and performance optimization.';

export const ChallengeDescription: React.FC<ChallengeDescriptionProps> = ({ template }) => {
  return (
    <div className="bg-dark-card rounded-xl p-8 border border-dark-border">
      <h2 className="text-2xl font-bold text-white mb-6">Challenge Description</h2>
      <div className="markdown-content">
        <ReactMarkdown
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || '');
              const isInline = !match;
              
              return !isInline ? (
                <SyntaxHighlighter
                  style={oneDark}
                  language={match[1]}
                  PreTag="div"
                  customStyle={{
                    margin: '1rem 0',
                    borderRadius: '0.5rem',
                    fontSize: '0.875rem',
                  }}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
              ) : (
                <code className="bg-dark-border px-1.5 py-0.5 rounded text-primary-300 text-sm" {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {template.fullDescription}
        </ReactMarkdown>
      </div>
      <div className="mt-8 p-4 bg-primary-900/10 border border-primary-600/20 rounded-lg">
        <p className="text-primary-300 m-0 text-sm">
          <strong>Goal:</strong> {template.goal || DEFAULT_GOAL}
        </p>
      </div>
    </div>
  );
};


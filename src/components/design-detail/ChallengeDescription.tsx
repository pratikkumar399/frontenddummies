import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Template } from '@/types/types';

interface ChallengeDescriptionProps {
  template: Template;
}

export const ChallengeDescription: React.FC<ChallengeDescriptionProps> = ({ template }) => {
  return (
    <div className="bg-dark-card rounded-xl p-8 border border-dark-border">
      <h2 className="text-2xl font-bold text-white mb-6">Challenge Description</h2>
      <div className="markdown-content">
        <ReactMarkdown>{template.fullDescription}</ReactMarkdown>
      </div>
      <div className="mt-8 p-4 bg-primary-900/10 border border-primary-600/20 rounded-lg">
        <p className="text-primary-300 m-0 text-sm">
          <strong>Goal:</strong> Implement this within 45-60 minutes. Focus on clean code, edge case handling, and performance optimization.
        </p>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { FiCopy, FiCheck } from 'react-icons/fi'; 
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { IconButton } from '@mui/material';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism';

function MarkdownRenderer({ children: markdown }) {
  const [copiedId, setCopiedId] = useState(null); 

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(function() {
      setCopiedId(id); 
      setTimeout(() => setCopiedId(null), 1500); 
    })
  };

  return (
    <Markdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || '');
          const id = node.key || node.position.start.offset.toString(); 

          return !inline && match ? (
            <div style={{ position: 'relative' }}>
              <SyntaxHighlighter style={dracula} PreTag="div" language={match[1]} {...props}>
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
              <IconButton 
                className="copy-button" 
                style={{ 
                  position: 'absolute', 
                  top: '5px', 
                  right: '5px', 
                  cursor: 'pointer', 
                  background: 'none', 
                  border: 'none', 
                  outline: 'none',
                  color: copiedId === id ? 'green' : 'white', 
                  transition: 'transform 0.2s ease-in-out'
                }}
                onClick={() => copyToClipboard(children, id)} 
              >
                {copiedId === id ? <FiCheck /> : <FiCopy />} 
              </IconButton>
            </div>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
      }}
    >
      {markdown}
    </Markdown>
  );
}

export default MarkdownRenderer;

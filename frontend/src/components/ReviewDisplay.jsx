import React from 'react';

function ReviewDisplay({ review, isLoading }) {
  if (isLoading) {
    return (
      <div className="review-display loading">
        <div className="loading-container">
          <div className="spinner-large"></div>
          <h3>🤖 Analyzing your code with Gemini AI...</h3>
          <p>This may take 10–30 seconds for detailed analysis</p>
        </div>
      </div>
    );
  }

  if (!review) return null;

  const formatReviewText = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inList = false;
    let inCodeBlock = false;
    let codeBuffer = [];

    lines.forEach((line, index) => {
      const trimmed = line.trim();

      // Toggle code block start/end
      if (trimmed.startsWith('```')) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBuffer = [];
        } else {
          // End of code block
          inCodeBlock = false;
          elements.push(
            <pre key={`code-${index}`} className="review-code-block">
              <code>{codeBuffer.join('\n')}</code>
            </pre>
          );
        }
        return;
      }

      if (inCodeBlock) {
        codeBuffer.push(line);
        return;
      }

      if (!trimmed) {
        if (inList) inList = false;
        elements.push(<br key={`br-${index}`} />);
        return;
      }

      // Markdown-like parsing
      if (trimmed.startsWith('###')) {
        elements.push(
          <h3 key={index} className="review-subheading">
            {trimmed.replace(/^###\s*/, '')}
          </h3>
        );
      } else if (trimmed.match(/^\*\*.*\*\*$/)) {
        elements.push(
          <h3 key={index} className="review-heading">
            {trimmed.replace(/\*\*/g, '')}
          </h3>
        );
      } else if (trimmed.startsWith('*') || trimmed.startsWith('-')) {
        elements.push(
          <li key={index} className="review-list-item">
            {trimmed.substring(1).trim()}
          </li>
        );
      } else {
        const formatted = trimmed.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        elements.push(
          <p
            key={index}
            className="review-paragraph"
            dangerouslySetInnerHTML={{ __html: formatted }}
          />
        );
      }
    });

    return elements;
  };

  return (
    <div className="review-display">
      <div className="review-header">
        <h2>📋 Code Review Results</h2>
        <div className="review-meta">
          <span className="file-name">📄 {review.fileName}</span>
          <span className="timestamp">
            🕒 {new Date(review.timestamp).toLocaleString()}
          </span>
        </div>
      </div>

      <div className="review-content">{formatReviewText(review.review)}</div>

      <div className="review-footer">
        <span className="ai-badge">✨ Powered by Google Gemini AI</span>
      </div>
    </div>
  );
}

export default ReviewDisplay;

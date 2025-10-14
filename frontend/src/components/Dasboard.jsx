import React from 'react';

function Dashboard({ reviews, onSelectReview }) {
  if (reviews.length === 0) {
    return (
      <div className="dashboard">
        <h2>📊 Review History</h2>
        <div className="empty-state">
          <p>No reviews yet. Upload a code file to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <h2>📊 Review History ({reviews.length})</h2>
      <div className="history-grid">
        {reviews.map((review) => (
          <div 
            key={review.id} 
            className="history-card"
            onClick={() => onSelectReview(review)}
          >
            <div className="card-header">
              <span className="file-icon">📄</span>
              <span className="file-name">{review.fileName}</span>
            </div>
            <div className="card-time">
              {new Date(review.timestamp).toLocaleString()}
            </div>
            <div className="card-preview">
              {review.review.substring(0, 120)}...
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;

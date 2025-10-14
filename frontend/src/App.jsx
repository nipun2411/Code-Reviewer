import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import UploadSection from './components/UploadSection';
import ReviewDisplay from './components/ReviewDisplay';
import Dashboard from './components/Dasboard';
import { getAllReviews, saveReview } from './utils/storage';

function App() {
  const [currentReview, setCurrentReview] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadReviews();
  }, []);

  const loadReviews = () => {
    const storedReviews = getAllReviews();
    setReviews(storedReviews);
  };

  const handleReviewComplete = (reviewData) => {
    setCurrentReview(reviewData);
    saveReview(reviewData);
    loadReviews();
    setIsAnalyzing(false);
  };

  const handleSelectReview = (review) => {
    setCurrentReview(review);
  };

  const handleAnalysisStart = () => {
    setIsAnalyzing(true);
    setCurrentReview(null);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>🔍 Code Review Assistant</h1>
        <p>Upload your code for AI-powered analysis with Gemini</p>
      </header>

      <main className="app-main">
        <Routes>
          <Route path="/" element={
            <>
              <UploadSection 
                onReviewComplete={handleReviewComplete}
                onAnalysisStart={handleAnalysisStart}
                isAnalyzing={isAnalyzing}
                setIsAnalyzing={setIsAnalyzing}
              />
              
              <ReviewDisplay 
                review={currentReview} 
                isLoading={isAnalyzing}
              />
              
              <Dashboard 
                reviews={reviews}
                onSelectReview={handleSelectReview}
              />
            </>
          } />
        </Routes>
      </main>

      <footer className="app-footer">
        <p>Powered by Google Gemini AI</p>
      </footer>
    </div>
  );
}

export default App;

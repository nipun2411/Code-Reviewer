import React, { useState } from 'react';
import { analyzeCodeFile } from '../services/api';

function UploadSection({ onReviewComplete, onAnalysisStart, isAnalyzing, setIsAnalyzing }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];  // ✅ FIX: Get first file from FileList
    if (file) {
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    setIsAnalyzing(true);
    setError(null);
    onAnalysisStart();

    try {
      console.log('🚀 Starting code analysis...');
      console.log('📄 File:', selectedFile.name);
      console.log('📏 Size:', selectedFile.size, 'bytes');
      
      const response = await analyzeCodeFile(selectedFile);
      
      if (response.success) {
        console.log('✅ Analysis complete!');
        onReviewComplete(response);
      } else {
        setError(response.error || 'Failed to analyze code');
        setIsAnalyzing(false);
      }
    } catch (err) {
      console.error('❌ Upload error:', err);
      setError(err.message || 'Failed to analyze code. Please try again.');
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="upload-section">
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="file-input-container">
          <input
            type="file"
            id="codeFile"
            onChange={handleFileChange}
            accept=".js,.jsx,.ts,.tsx,.py,.java,.cpp,.c,.html,.css,.go,.rb,.php"
            disabled={isAnalyzing}
          />
          <label htmlFor="codeFile" className="file-label">
            {selectedFile ? `📄 ${selectedFile.name}` : '📁 Choose Code File'}
          </label>
        </div>

        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}

        <button 
          type="submit" 
          className="analyze-button"
          disabled={isAnalyzing || !selectedFile}
        >
          {isAnalyzing ? (
            <>
              <span className="spinner"></span>
              Analyzing with Gemini AI...
            </>
          ) : (
            '🚀 Analyze Code'
          )}
        </button>

        {isAnalyzing && (
          <div className="analysis-info">
            <p>⏳ Gemini is analyzing your code in detail...</p>
            <p className="time-estimate">Expected time: 10-30 seconds</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default UploadSection;

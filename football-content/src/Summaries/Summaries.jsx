import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Summaries.css';

const Summaries = () => {
  const [summaries, setSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSummaries();
  }, []);

  const fetchSummaries = async () => {
    try {
      setLoading(true);
      console.log('Fetching summaries from:', 'http://localhost:5000/api/summarize');
      
      const response = await axios.get('http://localhost:5000/api/summarize');
      console.log('Summaries API Response:', response.data);
      
      // Extract summaries from the response
      const summariesData = response.data.summaries || [];
      setSummaries(summariesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching summaries:', err);
      
      if (err.code === 'ERR_NETWORK') {
        setError('Network error: Cannot connect to backend. Make sure your Flask app is running on port 5000.');
      } else if (err.response) {
        setError(`Server error: ${err.response.status} - ${err.response.statusText}`);
      } else {
        setError(`Request failed: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const removeSummaryQuotes = (summary) => {
    // Remove quotes from the beginning and end of summaries
    return summary.replace(/^["']|["']$/g, '');
  };

  if (loading) {
    return (
      <div className="summaries-container">
        <div className="loading">
          <div className="spinner"></div>
          <h2>🤖 Generating AI Match Reports...</h2>
          <p>Our AI is analyzing matches and creating exciting summaries</p>
          <div className="loading-details">
            <small>This may take a few moments as we generate unique content for each match</small>
          </div>
        </div>
      </div>
    );
  };

  if (error) {
    return (
      <div className="summaries-container">
        <div className="error">
          <h2>⚠️ Error Loading AI Summaries</h2>
          <p>{error}</p>
          <button onClick={fetchSummaries} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="summaries-container">
      <div className="summaries-header">
        <h1>🤖 AI-Generated Match Reports</h1>
        <p>Exciting match summaries powered by advanced AI technology</p>
        <div className="header-stats">
          <span className="stat">
            <strong>{summaries.length}</strong> AI Reports Generated
          </span>
          <span className="stat">
            <strong>Powered by Groq</strong> Lightning-Fast AI
          </span>
        </div>
        <button onClick={fetchSummaries} className="refresh-btn">
          🔄 Generate Fresh Reports
        </button>
      </div>

      <div className="summaries-grid">
        {summaries.map((summary, index) => (
          <div key={index} className="summary-card">
            <div className="summary-header">
              <div className="match-info">
                <h3 className="match-title">
                  {summary.home_team} vs {summary.away_team}
                </h3>
                <div className="match-details">
                  <span className="match-date">{formatDate(summary.date)}</span>
                  <span className="match-score">{summary.score}</span>
                </div>
              </div>
              <div className="ai-badge">
                <span>🤖 AI Generated</span>
              </div>
            </div>
            
            <div className="summary-content">
              {summary.error ? (
                <div className="summary-error">
                  <p>❌ {summary.error}</p>
                </div>
              ) : (
                <div className="summary-text">
                  <p>{removeSummaryQuotes(summary.summary)}</p>
                </div>
              )}
            </div>
            
            <div className="summary-footer">
              <div className="summary-tags">
                <span className="tag">Premier League</span>
                <span className="tag">Match Report</span>
              </div>
              <div className="summary-actions">
                <button className="action-btn" onClick={() => navigator.clipboard.writeText(summary.summary)}>
                  📋 Copy
                </button>
                <button className="action-btn" onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(summary.summary)}`, '_blank')}>
                  🐦 Share
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {summaries.length === 0 && !loading && (
        <div className="no-summaries">
          <h2>📝 No AI Summaries Available</h2>
          <p>There are currently no completed matches to generate summaries for.</p>
          <p>Check back later or refresh to see if new matches have been completed!</p>
        </div>
      )}
      
      <div className="ai-info">
        <div className="ai-info-card">
          <h3>🧠 How Our AI Works</h3>
          <p>
            Our advanced AI analyzes match data and creates engaging, human-like reports that capture 
            the excitement and key moments of each Premier League game. Each summary is unique and 
            generated in real-time using cutting-edge language models.
          </p>
          <div className="tech-stack">
            <span className="tech">Groq API</span>
            <span className="tech">Llama 3 70B</span>
            <span className="tech">Real-time Generation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summaries;

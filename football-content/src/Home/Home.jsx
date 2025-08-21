import React from 'react';
import './Home.css';

const Home = ({ setActiveTab }) => {
  return (
    <div className="home">
      <div className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">⚽ Welcome to Football Content Hub</h1>
          <p className="hero-subtitle">
            Your ultimate destination for Premier League matches and AI-powered match analysis
          </p>
          <div className="hero-description">
            <p>
              Discover the latest Premier League match results and dive deep into 
              exciting AI-generated match reports that bring every game to life!
            </p>
          </div>
        </div>
      </div>

      <div className="features-section">
        <h2>🚀 What We Offer</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Live Match Data</h3>
            <p>Get real-time Premier League match results, scores, and fixtures directly from official sources.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">🤖</div>
            <h3>AI Match Reports</h3>
            <p>Experience thrilling AI-generated match summaries that capture the excitement of every game.</p>
          </div>
          
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Lightning Fast</h3>
            <p>Powered by cutting-edge AI technology for instant match analysis and reporting.</p>
          </div>
        </div>
      </div>

      <div className="cta-section">
        <h2>Ready to Explore?</h2>
        <p>Choose your adventure below:</p>
        <div className="cta-buttons">
          <button className="cta-btn primary" onClick={() => setActiveTab && setActiveTab('Matches')}>
            📋 View Matches
          </button>
          <button className="cta-btn secondary" onClick={() => setActiveTab && setActiveTab('Summaries')}>
            🤖 Read AI Summaries
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Matches.css';

const Matches = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchMatches();
  }, []);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      console.log('Fetching matches from:', 'http://localhost:5000/api/matches');
      
      const response = await axios.get('http://localhost:5000/api/matches');
      console.log('Full API Response:', response);
      console.log('Response data:', response.data);
      
      // Extract matches from the response
      const matchesData = response.data.matches || response.data || [];
      console.log('Matches data:', matchesData);
      
      setMatches(matchesData);
      setError(null);
    } catch (err) {
      console.error('Error fetching matches:', err);
      console.error('Error response:', err.response);
      console.error('Error message:', err.message);
      
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
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getMatchStatus = (match) => {
    if (match.status === 'FINISHED') {
      return 'Finished';
    } else if (match.status === 'SCHEDULED') {
      return 'Scheduled';
    } else if (match.status === 'IN_PLAY') {
      return 'Live';
    }
    return match.status;
  };

  if (loading) {
    return (
      <div className="matches-container">
        <div className="loading">
          <div className="spinner"></div>
          <h2>Loading Premier League matches...</h2>
          <p>Fetching latest match data</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="matches-container">
        <div className="error">
          <h2>⚠️ Error Loading Matches</h2>
          <p>{error}</p>
          <button onClick={fetchMatches} className="retry-btn">
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="matches-container">
      <div className="matches-header">
        <h1>📋 Premier League Matches</h1>
        <p>Latest match results and fixtures</p>
        <button onClick={fetchMatches} className="refresh-btn">
          🔄 Refresh Data
        </button>
      </div>

      <div className="matches-stats">
        <div className="stat-card">
          <h3>{matches.length}</h3>
          <p>Total Matches</p>
        </div>
        <div className="stat-card">
          <h3>{matches.filter(m => m.status === 'FINISHED').length}</h3>
          <p>Completed</p>
        </div>
        <div className="stat-card">
          <h3>{matches.filter(m => m.status === 'SCHEDULED').length}</h3>
          <p>Upcoming</p>
        </div>
      </div>

      <div className="matches-grid">
        {matches.map((match) => (
          <div key={match.id} className={`match-card ${match.status.toLowerCase()}`}>
            <div className="match-date">
              {formatDate(match.utcDate)}
            </div>
            
            <div className="match-teams">
              <div className="team home-team">
                <h3>{match.homeTeam.name}</h3>
                <div className="team-crest">
                  {match.homeTeam.crest ? (
                    <img 
                      src={match.homeTeam.crest} 
                      alt={`${match.homeTeam.name} logo`}
                      className="team-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="fallback-emoji" style={{display: match.homeTeam.crest ? 'none' : 'block'}}>🏠</span>
                </div>
              </div>
              
              <div className="match-score">
                {match.status === 'FINISHED' ? (
                  <div className="score">
                    <span className="home-score">{match.score.fullTime.home}</span>
                    <span className="separator">-</span>
                    <span className="away-score">{match.score.fullTime.away}</span>
                  </div>
                ) : (
                  <div className="vs">VS</div>
                )}
              </div>
              
              <div className="team away-team">
                <h3>{match.awayTeam.name}</h3>
                <div className="team-crest">
                  {match.awayTeam.crest ? (
                    <img 
                      src={match.awayTeam.crest} 
                      alt={`${match.awayTeam.name} logo`}
                      className="team-logo"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'block';
                      }}
                    />
                  ) : null}
                  <span className="fallback-emoji" style={{display: match.awayTeam.crest ? 'none' : 'block'}}>✈️</span>
                </div>
              </div>
            </div>
            
            <div className="match-info">
              <span className={`status ${match.status.toLowerCase()}`}>
                {getMatchStatus(match)}
              </span>
              {match.competition && (
                <span className="competition">{match.competition.name}</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {matches.length === 0 && !loading && (
        <div className="no-matches">
          <h2>📭 No matches found</h2>
          <p>There are currently no matches to display.</p>
        </div>
      )}
    </div>
  );
};

export default Matches;

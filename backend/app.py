from flask import Flask, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv
import os
import requests
from datetime import datetime, timedelta
from summarizer import summarize_match

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/')
def home():
    return jsonify({
        'message': 'Football Content API',
        'endpoints': [
            '/api/matches - Get football matches',
            '/api/summarize - Get AI summaries of matches'
        ]
    })

@app.route('/api/matches', methods=['GET'])
def get_matches():
    """Get football matches from the API"""
    api_key = os.getenv("API_KEY")
    
    if not api_key:
        return jsonify({'error': 'API key not found'}), 500
    
    headers = {"X-Auth-Token": api_key}
    url = "https://api.football-data.org/v4/competitions/PL/matches?season=2023&dateFrom=2024-03-01&dateTo=2024-05-30"
    
    try:
        response = requests.get(url, headers=headers)
        
        if response.status_code == 200:
            return jsonify(response.json())
        else:
            return jsonify({
                'error': 'Failed to fetch matches', 
                'status_code': response.status_code
            }), response.status_code
            
    except Exception as e:
        return jsonify({'error': f'Request failed: {str(e)}'}), 500

@app.route('/api/summarize', methods=['GET'])
def get_summaries():
    """Get AI summaries for completed matches"""
    api_key = os.getenv("API_KEY")
    
    if not api_key:
        return jsonify({'error': 'API key not found'}), 500
    
    headers = {"X-Auth-Token": api_key}
    url = "https://api.football-data.org/v4/competitions/PL/matches?season=2023&dateFrom=2024-03-01&dateTo=2024-05-30"
    
    try:
        # Get matches from API
        response = requests.get(url, headers=headers)
        
        if response.status_code != 200:
            return jsonify({
                'error': 'Failed to fetch matches', 
                'status_code': response.status_code
            }), response.status_code
        
        matches_data = response.json()
        matches = matches_data.get('matches', [])
        
        # Generate summaries for completed matches only
        summaries = []
        for match in matches:
            # Check if match is completed (has final scores)
            if (match.get('score', {}).get('fullTime', {}).get('home') is not None and 
                match.get('score', {}).get('fullTime', {}).get('away') is not None):
                
                try:
                    summary = summarize_match(match)
                    summaries.append({
                        'home_team': match['homeTeam']['name'],
                        'away_team': match['awayTeam']['name'],
                        'date': match['utcDate'][:10],
                        'score': f"{match['score']['fullTime']['home']}-{match['score']['fullTime']['away']}",
                        'summary': summary
                    })
                except Exception as e:
                    summaries.append({
                        'home_team': match['homeTeam']['name'],
                        'away_team': match['awayTeam']['name'],
                        'error': f'Summary failed: {str(e)}'
                    })
        
        return jsonify({
            'summaries': summaries,
            'total_summaries': len(summaries),
            'total_matches': len(matches)
        })
        
    except Exception as e:
        return jsonify({'error': f'Request failed: {str(e)}'}), 500

if __name__ == '__main__':
    print("Starting Football Content API...")
    print("Endpoints available:")
    print("- http://localhost:5000/api/matches")
    print("- http://localhost:5000/api/summarize")
    app.run(debug=True, host='0.0.0.0', port=5000)

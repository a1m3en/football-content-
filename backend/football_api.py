# backend/app.py
from flask import Flask, jsonify
from dotenv import load_dotenv
import os
import requests
from datetime import datetime, timedelta

load_dotenv()

app = Flask(__name__)

@app.route('/api/matches', methods=['GET'])
def get_matches():
    api_key = os.getenv("API_KEY")
    headers = {"X-Auth-Token": api_key}

    today = datetime.today()
    past = today - timedelta(days=30)
    today_str = today.strftime("%Y-%m-%d")
    past_str = past.strftime("%Y-%m-%d")

    url = f"https://api.football-data.org/v4/competitions/PL/matches?dateFrom={past_str}&dateTo={today_str}"
    response = requests.get(url, headers=headers)

    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch matches', 'status_code': response.status_code}), response.status_code

    return jsonify(response.json())

if __name__ == '__main__':
    app.run(debug=True)

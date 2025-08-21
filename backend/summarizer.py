# backend/summarizer.py

import requests
import json
import os

def summarize_match(match):
    home = match["homeTeam"]["name"]
    away = match["awayTeam"]["name"]
    score_home = match["score"]["fullTime"]["home"]
    score_away = match["score"]["fullTime"]["away"]
    date = match["utcDate"][:10]

    prompt = f"""Write a short, exciting match report (3-5 sentences) for this Premier League game:

Date: {date}
Match: {home} vs {away}
Final Score: {home} {score_home} - {score_away} {away}

Make it engaging and highlight key moments of the match."""

    try:
        # Use Groq API (Extremely Fast)
        groq_key = os.getenv("GROQ_API_KEY")
        
        if not groq_key:
            return "Error: GROQ_API_KEY not found in environment variables"
        
        headers = {
            "Authorization": f"Bearer {groq_key}",
            "Content-Type": "application/json"
        }
        
        payload = {
            "model": "llama3-70b-8192",  # Current available Groq model
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 150,
            "temperature": 0.7
        }
        
        response = requests.post("https://api.groq.com/openai/v1/chat/completions", 
                               headers=headers, json=payload, timeout=30)
        
        if response.status_code == 200:
            result = response.json()
            return result["choices"][0]["message"]["content"].strip()
        else:
            return f"Groq API Error: Status {response.status_code} - {response.text}"
            
    except Exception as e:
        return f"AI Error: {str(e)}"

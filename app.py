from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # This allows cross-origin requests, which is needed for local testing

@app.route('/')
def home():
    return "Welcome to the AI Travel Assistant!"

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data.get('message')
    
    # Simple AI response logic (this can be replaced with something more complex)
    if user_message:
        response_message = generate_response(user_message)
        return jsonify({'response': response_message})
    else:
        return jsonify({'response': 'Sorry, something went wrong. Please try again later.'})

def generate_response(user_message):
    # You can add more sophisticated AI or logic for different inputs here
    if "budget" in user_message.lower():
        return "Based on your budget, I can recommend some budget-friendly destinations!"
    elif "destination" in user_message.lower():
        return "I can recommend destinations based on your interests and preferences."
    elif "activities" in user_message.lower():
        return "What kind of activities do you enjoy? Beaches, mountains, or something else?"
    else:
        return "I'm here to help! Tell me more about your trip."

if __name__ == '__main__':
    app.run(debug=True)

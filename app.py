from flask import Flask, render_template, request, jsonify
import json
import sys
import os

sys.path.append("../chatbot")
from chatbot import chatbot

with open(os.path.join("data", "intents.json"), "r") as file:
    intents = json.load(file)

app = Flask(__name__, static_url_path="/static")

# Returns index.html when the root URL is accessed
@app.route("/")
def index():
    return render_template("index.html")

# Sends a response back to the user's message
@app.route("/process", methods=["POST"])
def process():
    input_data = request.form.get("input_variable")
    if input_data is None:
        return jsonify({"error": "No input data provided"})

    message = input_data
    ints = chatbot.predict_class(message)
    response = chatbot.get_response(ints, intents)

    return jsonify({"response": response})

if __name__ == "__main__":
    from waitress import serve
    print("This Flask app is running at http://localhost:5000")
    serve(app, host="0.0.0.0", port=5000)

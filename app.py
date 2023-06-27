from flask import Flask, render_template, request, jsonify
import json

import chatbot
intents = json.loads(open('intents.json').read())

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")


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
    app.run()

from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    messages = "chatbot.py"

    return render_template('index.html', messages=messages)

if __name__ == '__main__':
    app.run()

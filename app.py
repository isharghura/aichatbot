from flask import Flask, render_template, request, jsonify

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("index.html")

@app.route('/process', methods=['POST'])
def process():
    input_data = request.form.get('input_variable')
    if input_data is None:
        return jsonify({'error': 'No input data provided'})

    response = 'Response message based on input: ' + input_data
    return jsonify({'response': response})

if __name__ == "__main__":
    app.run()

from flask import Flask, request
from flask import jsonify
# import test
from main.spacy import getLabels
from flask_cors import CORS, cross_origin

app = Flask(__name__)
app.config.update(
    DEBUG=True,
    TESTING=True,
    TEMPLATES_AUTO_RELOAD=True
)
cors = CORS(app, resources={r"/api/*": {"origins": "*"}})



@app.route('/')
def hello_world():
    return 'Hello World hhhh!'

@app.route('/api/endpoint',  methods=['POST', 'OPTION'])
@cross_origin()
def get_tasks():
    data = request.get_json()
    # Process the request data here
    output = getLabels(data)
    # Return a response
    response = {
        'message': 'Received data successfully',
        'data': output
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8000)

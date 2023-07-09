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
rows = [
    {
        "Default_Commentary": "47.5: Bilal Khan to Teja Nidamanuru, 2 runs.",
        "Commentary": "Goes full this time and at the stumps. Teja Nidamanuru\u00a0lofts this back over the bowler's head and they run quickly to pick up a brace.",
    },
    {
        "Default_Commentary": "47.4: Bilal Khan to Logan van Beek, Leg bye.",
        "Commentary": "FOUR! Logan van Beek connects this time! This is bowled full and outside the off stump. Logan van Beek hits this hard towards long off for four runs.",
    },
    {
        "Default_Commentary": "43.5: Bilal Khan to Wesley Barresi, 1 run.",
        "Commentary": "In line with the stumps once again and on a fullish length. Wesley Barresi\u00a0inside edges this through square leg for a single.",
    },
    {
         "Default_Commentary": "42.4: Fayyaz Butt to Saqib Zulfiqar, Four!",
        "Commentary": "FOUR! Poor delivery from Fayyaz Butt\u00a0\u200b\u200b\u200b\u200band\u00a0Saqib Zulfiqar\u00a0helps himself to his first boundary! This is bowled back of a length and going down leg. Saqib Zulfiqar\u00a0glances this towards fine leg for four runs.",
    },
    {
         "Default_Commentary": "29.4: Fayyaz Butt to Vikramjit Singh, Four!",
        "Commentary": "FOUR! Vikramjit Singh\u00a0is now one hit away from a well-deserved century! Fayyaz Butt\u00a0comes 'round the wicket and bowls this short, outside off. Vikramjit Singh\u00a0pulls this towards deep mid-wicket and collects four runs. The effort from the fielder is in vain.",
    }
]


@app.route('/')
def hello_world():
    return 'Hello World hhhh!'

@app.route('/api/endpoint',  methods=['POST', 'OPTION'])
@cross_origin()
def get_tasks():
    data = request.get_json()
    # Process the request data here
    output = getLabels(rows[1])
    # Return a response
    response = {
        'message': 'Received data successfully',
        'data': {
            'text': rows[1],
            'output': output
        }
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(port=8000)

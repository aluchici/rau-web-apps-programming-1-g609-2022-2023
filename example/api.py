from flask import Flask, request 
from flask_cors import CORS
import json 

filepath = 'sent_data.txt'

app = Flask('example-api')
resources = {
        r"/api/*": {
            "origins": "*"
        }
    }

CORS(app, resources=resources)

@app.route('/api/v1/gigel', methods=['POST'])
def gigel_response():
    try:
        body = request.json

        with open(filepath, 'a') as data_file:
            text = json.dumps(body)
            data_file.write(text + "\n")

        response = {"message": "Data saved successfully."}
        return json.dumps(response), 200, {"Content-Type": "application/json"}
    except Exception as e:
        response = {"message": f"Something went wrong. Cause {e}"}
        return json.dumps(response), 500, {"Content-Type": "application/json"}

app.run(debug=True, port=5609)
import json

from flask import Flask, request

from gigelbank.api.account import signup
from gigelbank.api.repository import CONNECTION_STRING

app = Flask("gigelbank-api")


@app.route("/", methods=["GET"])
def welcome():
    return "<h1>Welcome to Gigel Bank!</h1>"


@app.route("/api/v1/version", methods=["GET"])
def version():
    response = {
        "name": "Gigel Bank Api",
        "version": "v.0.0.1"
    }
    response = json.dumps(response)
    return response, 200, {"Content-Type": "application/json"}


@app.route("/api/v1/register", methods=["POST"])
def register():
    body = request.json
    signup(body, CONNECTION_STRING)
    return "", 204, {"Content-Type": "application/json"}


app.run(debug=True, port=5609)

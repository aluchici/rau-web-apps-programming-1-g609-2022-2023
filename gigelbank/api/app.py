import json

from flask import Flask, request
from flask_cors import CORS

from gigelbank.api.bank_account import get_user_accounts
from gigelbank.api.user_account import signup, signin
from gigelbank.api.repository import CONNECTION_STRING

app = Flask("gigelbank-api")
CORS(app, resources={r"/api/*": {"origins": "*"}})


RESPONSE_DATA_TYPE = {"Content-Type": "application/json"}


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
    return response, 200, RESPONSE_DATA_TYPE


@app.route("/api/v1/register", methods=["POST"])
def register():
    try:
        body = request.json
        signup(body, CONNECTION_STRING)
        response = {
            "message": "User created successfully."
        }
        response = json.dumps(response)
        return response, 200, RESPONSE_DATA_TYPE
    except Exception as e:
        error_message = {
            "message": f"Failed to register user. Cause: {e}"
        }
        response = json.dumps(error_message)
        return response, 500, RESPONSE_DATA_TYPE


@app.route("/api/v1/authenticate", methods=["POST"])
def authenticate():
    try:
        body = request.json
        user = signin(body, CONNECTION_STRING)
        response = user.to_json()
        return response, 200, RESPONSE_DATA_TYPE
    except Exception as e:
        error_message = {
            "message": f"Failed to sign in. Cause: {e}"
        }
        response = json.dumps(error_message)
        return response, 500, RESPONSE_DATA_TYPE


@app.route("/api/v1/bank-accounts/<user_id>", methods=["GET"])
def bank_accounts_by_user_id(user_id):
    try:
        accounts = get_user_accounts(user_id, CONNECTION_STRING)
        response = []
        for account in accounts:
            response.append(account.to_dict())
        response = json.dumps(response)
        return response, 200, RESPONSE_DATA_TYPE
    except Exception as e:
        error_message = {
            "message": f"Failed to get accounts for {user_id}. Cause: {e}"
        }
        response = json.dumps(error_message)
        return response, 500, RESPONSE_DATA_TYPE


app.run(debug=True, port=5609)

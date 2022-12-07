import json

from flask import Flask, request

from gigelbank.api.repository import insert_user, CONNECTION_STRING
from gigelbank.api.users import User

app = Flask("gigelbank-api")


@app.route("/api/v1/register", methods=["POST"])
def register():
    try:
        body = request.json
        user = User.from_dict(body)
        user.email = user.validate_email()
        user.password = user.validate_password()
        insert_user(user, CONNECTION_STRING)
        return "", 204
    except Exception as e:
        error_message = {"error": f"Failed to create user. Cause: {e}"}
        return json.dumps(error_message), 500


app.run(debug=True, port=5609)
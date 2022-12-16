from gigelbank.api.repository import insert_user
from gigelbank.api.users import User


def signup(request_body, connection_string):
    user = User.from_dict(request_body)
    user.email = user.validate_email()
    user.password = user.validate_password()
    if user.password != user.second_password:
        raise ValueError("Password mismatch")
    insert_user(user, connection_string)


def signin():
    pass


def get_user_profile():
    pass


def edit_user_profile():
    pass


def delete_user_profile():
    pass



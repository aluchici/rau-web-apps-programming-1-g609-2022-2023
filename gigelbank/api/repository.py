import sqlite3

from gigelbank.api.users import User

# steps for interacting with a DB
# connect to database
# create a query (instruction)
# create cursor
# execute query using the cursor
# (optional) save data if insert, update, delete
# (optional) close cursor
# (optional) close connection
# (optional) process data
# TODO: update path to match the location of gigelbank.db on your machine
CONNECTION_STRING = "rau-web-apps-programming-1-g609-2022-2023/gigelbank/datastore/gigelbank.db"


def insert_user(user_to_insert, connection_string):
    conn = sqlite3.connect(connection_string)

    query = f"""INSERT INTO users(
    first_name,
    last_name,
    email,
    password,
    second_password,
    created_at,
    updated_at
    ) VALUES(
    '{user_to_insert.first_name}',
    '{user_to_insert.last_name}',
    '{user_to_insert.email}',
    '{user_to_insert.password}',
    '{user_to_insert.second_password}',
    '{user_to_insert.created_at}',
    '{user_to_insert.updated_at}'
    );"""

    cursor = conn.cursor()

    cursor.execute(query)

    conn.commit()

    cursor.close()

    conn.close()


def get_all_users(connection_string):
    query = "SELECT * FROM users;"
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    results = list(cursor.execute(query))
    cursor.close()
    conn.close()

    users = []
    for entry in results:
        user = User.from_list(entry)
        users.append(user)
    return users


def get_user_by_email(user, connection_string):
    query = f"SELECT id, email, password FROM users WHERE email = '{user.email}';"
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    results = list(cursor.execute(query))
    cursor.close()
    conn.close()

    users = []
    for entry in results:
        user = User.from_list(entry)
        users.append(user)
    return users[0]

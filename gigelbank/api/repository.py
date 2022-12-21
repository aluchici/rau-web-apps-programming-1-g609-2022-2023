import sqlite3

from gigelbank.api.accounts import Account
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
CONNECTION_STRING = "/Users/luchicla/Work/RAU/rau-web-apps-programming-1-g609-2022-2023/gigelbank/datastore/gigelbank.db"


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
    try:
        cursor.execute(query)
        conn.commit()
        cursor.close()
        conn.close()
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def get_all_users(connection_string):
    query = "SELECT * FROM users;"
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    try:
        results = list(cursor.execute(query))
        cursor.close()
        conn.close()

        users = []
        for entry in results:
            user = User.from_list(entry)
            users.append(user)
        return users
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def get_user_by_email(user_email, connection_string):
    query = f"SELECT id, first_name, last_name, email, password, second_password FROM users WHERE email = " \
            f"'{user_email}';"
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()
    try:
        results = cursor.execute(query).fetchone()
        cursor.close()
        conn.close()
        existing_user = User.from_list(results)
        return existing_user
    except Exception as e:
        cursor.close()
        conn.close()
        raise e


def get_user_accounts_by_id(user_id, connection_string):
    query = f"SELECT id, user_id, number, balance, created_at, updated_at FROM accounts WHERE user_id = {user_id};"
    conn = sqlite3.connect(connection_string)
    cursor = conn.cursor()

    try:
        results = cursor.execute(query).fetchall()
        accounts = []
        for entry in results:
            account = Account.from_list(entry)
            accounts.append(account)
        cursor.close()
        conn.close()
        return accounts
    except Exception as e:
        cursor.close()
        conn.close()
        raise e

from gigelbank.api.repository import get_user_accounts_by_id


def get_user_accounts(user_id, connection_string):
    accounts = get_user_accounts_by_id(user_id, connection_string)
    return accounts
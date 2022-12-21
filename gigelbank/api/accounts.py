import json


class Account:
    def __init__(self, id=None, user_id=None, account_number=None, balance=None):
        self.id = id
        self.user_id = user_id
        self.account_number = account_number
        self.balance = balance
        self.created_at = None
        self.updated_at = None

    def to_dict(self):
        account_dict = {
            "id": self.id,
            "user_id": self.user_id,
            "account_number": self.account_number,
            "balance": self.balance,
            "created_at": self.created_at,
            "updated_at": self.updated_at
        }
        return account_dict

    def to_json(self):
        account_dict = self.to_dict()
        return json.dumps(account_dict)

    @classmethod
    def from_list(cls, account_details):
        id = account_details[0]
        user_id = account_details[1]
        account_number = account_details[2]
        balance = account_details[3]
        created_at = account_details[4]
        updated_at = account_details[5]

        obj = cls(id=id, user_id=user_id, account_number=account_number, balance=balance)
        obj.created_at = created_at
        obj.updated_at = updated_at

        return obj


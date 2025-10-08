// Post and Put APIs body for checking missing keys
// Array of all API body
module.exports = [
    {
        "method":'post',
        "name":'/api/profile',
        "body":{
            "user_id": 0
        }
    },
    {
        "method":'put',
        "name":'/api/profile/:user_id',
        "body":{
            "name": "string",
            "email": "string",
            "phone": 0,
            "address_1": "string",
            "address_2": "string",
            "city": "string",
            "state": "string",
            "pin_code": 0
        }
    },
    {
        "method":'post',
        "name":'courses',
        "body":{
            "user_id": 0,
            "source": "string"
        }
    },
    {
        "method":'post',
        "name":'create_chat_reply',
        "body":{
            "query": "string",
            "source": "string"
        }
    },
];

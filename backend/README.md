# Endpoints

## `/contacts`
### GET
Get all contact as list

GET /contacts

Response will be a JSON list. Response will be like:

```json
[ 
    { 
        "id": 1,
        "first_name": "Bilal",
        "last_name": "DENIZ", 
        "email": "bildeniz56@gmail.com"
    } 
]
```

| 200  | You get all contacts without error. |
| ---- | ----------------------------------- |

## `/create-contact`

### POST

Create a new contact

POST /create-contact, request body:

``````json
{
    "first_name": "<Your First Name>",
    "last_name": "<Your Last Name>",
    "email": "<Your Email Adress>"
}
``````

All values are should be not null. Response will be your data and id as JSON. Response will be like:

``````json
{ 
    "id": 1, 
    "first_name": "Bilal", 
    "last_name": "DENIZ",
    "email": "bildeniz56@gmail.com" 
}
``````

| 201  | Your contact has been successfully created          |
| ---- | --------------------------------------------------- |
| 400  | Values are null or your email address is not unique |

## `/update-contact/<id>`

### PATCH

Update contact the given id.

PATCH /update-contact/1, request body:

``````json
{
    "email": "bildeniz@gmail.com"
}
``````

Response will be your new data as JSON. Response will be like:

``````json
{ 
    "id": 1,  
    "first_name": "Bilal", 
    "last_name": "DENIZ",
    "email": "bildeniz@gmail.com"
}
``````

| 200  | Your data has been successfully updated |
| ---- | --------------------------------------- |
| 404  | Id is not founded                       |
| 400  | Email is not unique probably            |

## `/delete-contact/<id>`

### DELETE

Delete contact the given id.

DELETE /delete-contact/1

Response will be like:

``````json
{ "message": "Deleted" }
``````

| 200  | Contact has been successfully deleted |
| ---- | ------------------------------------- |
| 404  | Id is not founded                     |


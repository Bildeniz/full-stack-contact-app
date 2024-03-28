from flask import Blueprint, jsonify, request

from .models import Contact
from peewee import DoesNotExist

api = Blueprint('API', __name__)

@api.route('/contacts')
def get_contacts():
    """
    Get all contacts
    """
    contacts = Contact.select()

    # Converting all contacts peewee model to python dictionary
    contacts = [contact.to_dict() for contact in contacts]
    
    # Return as json
    return jsonify(contacts)
    
@api.route('/create-contact', methods=['POST'])
def create_contact():
    """
    Create a new contact
    """

    # Parse all information
    first_name = request.json.get('first_name')
    last_name = request.json.get('last_name')
    email = request.json.get('email').lower()
    
    # Validate all information
    if (not first_name) or (not last_name) or (not email):
        return (jsonify({"message": "You must include a first name, last name and email"}), 400)
    
    # Register contact
    new_contact = Contact(
        first_name=first_name,
        last_name= last_name,
        email=email
    )
    
    try:
        # Save contact
        new_contact.save()
        
    except Exception as e:
        # Return if there is any error 
        return (jsonify({"error": str(e)}), 400)
    
    # Return created contact
    return (jsonify(new_contact.to_dict()), 201)

@api.route('/update-contact/<int:id>', methods=['PATCH'])
def update_contact(id):
    """
    Update contact
    """
    
    # Get contact if id is true
    try:
        contact = Contact.select().where(Contact.id == id).get()
    except DoesNotExist:
        return (jsonify({"message": "Contact is not founded"}), 404)
    
    # Change the values
    data = request.json
    
    contact.first_name = data.get('first_name', contact.first_name)
    contact.last_name = data.get('last_name', contact.last_name)
    contact.email = data.get('email', contact.email)
    
    # Save
    try:
        contact.save()
    except Exception as e:
        return (jsonify({"message": str(e)}), 400)
    
    # Return updated value
    return contact.to_dict()

@api.route('/delete-contact/<int:id>', methods=['DELETE'])
def delete_contact(id):
    """
    Delete contact
    """
    
    # Get contact if id is true
    try:
        contact = Contact.select().where(Contact.id == id).get()
    except DoesNotExist:
        return (jsonify({"message": "Contact is not founded"}), 404)
        
    # Delete Contact        
    contact.delete_instance()
    
    return jsonify({"message": "Deleted"})
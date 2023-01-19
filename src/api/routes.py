"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


# This is creating a route to autheticate the users and return JWTs. The
# create_access_token() function is used to actually generate the JWT.

# @api.route('/login', methods=['POST'])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
    
#     if email != "hello@world.com" or password != "helloworld":
#         return jsonify({"msg": "Wrong username or password"}), 401

#     access_token = create_access_token(identity=email)
#     print(access_token)
#     return jsonify(access_token=access_token)


@api.route('/login', methods=['POST'])
def login():

    email = request.json.get('email', None)
    password = request.json.get('password', None)
    
    if not email:
        return jsonify({"msg": "Missing email data"}), 400
    if not password:
        return jsonify({"msg": "Missing password data"}), 400

    user = User.query.filter_by(email=email).first()
    if not user or user.password != password:
        return jsonify({"msg": "Wrong username or password"}), 401
    if not user.is_active:
        return jsonify({"msg": "Account is not active"}), 401

    access_token = create_access_token(identity=email)
    print(access_token)
    return jsonify(access_token=access_token), 200


# Protect a route with jwt_required, which will kick out requests
# without a valid JWT present.
@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    # Access the identity of the current user with GET JWT identity
    current_user = get_jwt_identity()
    response_body = {
        "email": current_user,
        "msg": "Alles gut :)"}
    return jsonify(response_body), 200
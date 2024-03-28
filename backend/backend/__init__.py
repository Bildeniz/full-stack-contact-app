from flask import Flask
from flask_cors import CORS

from .api import api

def create_app():
    from . import models
    
    app = Flask(__name__)
    CORS(app)

    app.register_blueprint(api)
    
    return app
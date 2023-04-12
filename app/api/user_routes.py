from flask import Blueprint, jsonify , request
from flask_login import login_required
from app.models import User
from ..forms.user_form import UserForm
from app.models.user import User, db

from app.awsS3 import (
    upload_file_to_s3, get_unique_filename, allow_file)

user_routes = Blueprint('users', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f' {error}')
    return errorMessages

@user_routes.route('/')
@login_required
def users():
    """
    Query for all users and returns them in a list of user dictionaries
    """
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    """
    Query for a user by id and returns that user in a dictionary
    """
    user = User.query.get(id)
    return user.to_dict()

@user_routes.route('/<int:id>', methods=["PATCH","PUT"])
@login_required
def edit_user(id):
    form = UserForm()
    form['csrf_token'].data = request.cookies['csrf_token']
 
    if "imageUrl" in request.files:
        imageFile = request.files['imageUrl']
    else:
        imageFile = ""

    if(imageFile):
        if not allow_file(imageFile.filename):
            return {"errors": "file type not permitted"}, 400

        imageFile.filename = get_unique_filename(imageFile.filename)
        

        upload = upload_file_to_s3(imageFile)
      
        if "url" not in upload:
            return {"errors": "failed to upload into s3"}, 400

        url = upload['url']

    if form.validate_on_submit():
        print("*******************")
        data = form.data
        user = User.query.get(id)

        for key, value in data.items():
            setattr(user, key, value)
        

        if url:
            user.imageUrl = url
        db.session.commit()

        return user.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

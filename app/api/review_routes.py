from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user
from app.models.review import Review, db
from app.forms.review_form import ReviewForm

review_routes = Blueprint('reviews', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f' {error}')
    return errorMessages



@review_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_review(id):
    review = Review.query.get(id)
    db.session.delete(review)
    db.session.commit()
    return "Successfully Deleted Review"                            
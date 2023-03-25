from flask import Blueprint, jsonify, render_template, redirect, request
from flask_login import login_required, current_user

from ..models.product import Product, db
from ..forms.product_form import ProductForm
from ..forms.review_form import ReviewForm
from app.models.review import Review, db
from app.awsS3 import (
    upload_file_to_s3, get_unique_filename, allow_file)

product_routes = Blueprint('products', __name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f' {error}')
    return errorMessages

@product_routes.route('/', methods=['GET'])
@login_required
def get_all_products():
    products = Product.query.all()

    return jsonify([product.to_dict() for product in products])

@product_routes.route('/<int:id>')
@login_required
def get_product(id):

    product = Product.query.get(id)
    return product.to_dict()


@product_routes.route('/', methods=['POST'])
@login_required
def create_product():

    form = ProductForm()
  
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
        data = form.data

        new_product = Product(brandId=current_user.get_id(),
                      title = data['title'],
                        detail=data['detail'],
                        url=data['url'],
                        imageUrl = url,
                        price = data['price'])
       
        db.session.add(new_product)
        db.session.commit()
        return new_product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400



@product_routes.route('/<int:id>', methods=["PATCH", "PUT"])
@login_required
def edit_product(id):

    form = ProductForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        data = form.data
        product = Product.query.get(id)

        for key, value in data.items():
            setattr(product, key, value)
        db.session.commit()
        return product.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def delete_product(id):
    product = Product.query.get(id)
    db.session.delete(product)
    db.session.commit()
    return "Successfully Deleted Product"

# get reviews of product
@product_routes.route('/<int:productId>/reviews/', methods = ['GET'])
@login_required
def get_all_reviews(productId):
    reviews = Review.query.filter(Review.productId== productId).all()
    return {"Reviews":[review.to_dict() for review in reviews]}


#post a review of a product 
@product_routes.route('/<int:productId>/reviews/', methods = ['POST'])
@login_required
def create_review(productId):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    data = form.data
    imageUrl = data.get('imageUrl')

    if form.validate_on_submit():
        new_review = Review(
                    customerId= current_user.id,
                    productId = productId,
                    review = data['review'], 
                    stars = data['stars'],
                    imageUrl = data['imageUrl']
                       )
        form.populate_obj(new_review)

        db.session.add(new_review)
        db.session.commit()
        return new_review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

@product_routes.route('/<int:id>/reviews/', methods=["PATCH", "PUT"])
@login_required
def edit_review(id):
    form = ReviewForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        data = form.data
        review = Review.query.get(id)
        for key, value in data.items():
            setattr(review, key, value)
        db.session.commit()
        return review.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 400

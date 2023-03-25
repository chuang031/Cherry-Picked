from flask_wtf import FlaskForm
from wtforms import StringField, BooleanField
from wtforms.validators import DataRequired, Email, ValidationError, Length
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if user:
        raise ValidationError('Email address is already in use.')


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('Username is already in use.')

def validate_firstname(form, field):
    firstName = field.data
    isBrand = form.is_brand

    if (isBrand.data == False) and (not firstName ):
        raise ValidationError("Customers must have a first name.")  
    
def validate_lastname(form, field):
    lastName = field.data
    isBrand = form.is_brand

    if (isBrand.data == False) and (not lastName ):
        raise ValidationError("Customers must have a last name.")    

def validate_brandname(form, field):
    brandName = field.data
    isBrand = form.is_brand

    if (isBrand.data == True) and (not brandName ):
        raise ValidationError("Brands must have a brand name.")     
class SignUpForm(FlaskForm):
    firstName = StringField('firstName', validators=[validate_firstname])
    lastName = StringField('lastName', validators=[validate_lastname])
    username = StringField(
        'username', validators=[DataRequired(), username_exists])
    email = StringField('email', validators=[DataRequired(),Email(), user_exists])
    password = StringField('password', validators=[DataRequired(), Length(min=6, max=20, message="Password must be between 6 to 20 characters long." )])
    brandName = StringField('brandName', validators=[validate_brandname])
    is_brand = BooleanField('is_brand')
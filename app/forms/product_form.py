from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, URL 
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.awsS3 import ALLOWED_EXTENSIONS

class ProductForm(FlaskForm):

    title =  StringField('Title',validators=[DataRequired()])
    detail = StringField('Details',validators=[DataRequired()])
    price = DecimalField("Price")
    url = StringField('Url', validators=[DataRequired(), URL( message='This is not a valid link, make sure you enter the entire URL')])
    imageUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create Post")


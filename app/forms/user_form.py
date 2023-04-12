from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, DecimalField
from wtforms.validators import DataRequired, URL 
from flask_wtf.file import FileField, FileAllowed, FileRequired
from wtforms import SubmitField
from app.awsS3 import ALLOWED_EXTENSIONS

class UserForm(FlaskForm):

    about =  StringField('About',validators=[DataRequired()])
    imageUrl = FileField("Image File", validators=[FileRequired(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    submit = SubmitField("Create User")


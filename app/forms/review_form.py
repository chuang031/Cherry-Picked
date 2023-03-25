from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField, SelectField
from wtforms.validators import DataRequired, NumberRange, URL, Optional

class ReviewForm(FlaskForm):
    review = StringField("Review", validators=[DataRequired()])
    stars = SelectField("Stars", choices=['1','2','3','4','5'])
    imageUrl = StringField('Image Url',validators=[ Optional(), URL( message='This is not a valid image link, make sure you enter the entire image URL')])
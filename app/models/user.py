from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime
class Chat(db.Model):
    __tablename__ = 'chats'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key= True)
    sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    message = db.Column(db.String(1500), nullable = False)
    roomId = db.Column(db.Integer)
    timestamp = db.Column(db.DateTime, default=datetime.utcnow())


    def to_dict(self):
        return{
            'id':self.id,
            'sender_id':self.sender_id,
            'recipient_id':self.recipient_id,
            'message':self.message,
            'timestamp':self.timestamp,
            
        }   
    def __repr__(self):
        return '<Message {}>'.format(self.message)

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    firstName = db.Column(db.String(20), nullable=True)
    lastName = db.Column(db.String(20), nullable=True)
    about= db.Column(db.String(500),nullable = True, default='')
    imageUrl = db.Column(db.String(1500), nullable = True)
    brandName = db.Column(db.String(20), nullable=True)
    is_brand = db.Column(db.Boolean, nullable=False, unique=False, default= False)
    
    reviews = db.relationship("Review", back_populates="user",
         cascade="all, delete-orphan")
    
    messages_sent = db.relationship('Chat',foreign_keys ='Chat.sender_id', backref='author',lazy='dynamic')
    messages_received = db.relationship('Chat', foreign_keys = 'Chat.recipient_id', backref= 'recipient', lazy='dynamic')
 
       
    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        if self.is_brand == True:
            return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'brandName': self.brandName,
            'imageUrl': self.imageUrl,
            'isBrand': self.is_brand
            } 
        return {
            'id': self.id,
            'firstName': self.firstName,
            'lastName': self.lastName,
            'about': self.about,
            'imageUrl':self.imageUrl,
            'username': self.username,
            'email': self.email,
            'isBrand': self.is_brand
        }

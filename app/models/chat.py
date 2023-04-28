# from .db import db, environment, SCHEMA, add_prefix_for_prod
# from datetime import datetime

# class Chat(db.Model):
#     __tablename__ = 'chats'

#     if environment == 'production':
#         __table_args__ = {'schema': SCHEMA}

#     id = db.Column(db.Integer, primary_key= True)
#     sender_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     recipient_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
#     message = db.Column(db.String(1500), nullable = False)
#     timestamp = db.Column(db.DateTime, default=datetime.utcnow())

#     sender = db.relationship('User', back_populates ='messages_sent')
#     receiver = db.relationship('User',back_populates ='messages_received' )

#     def to_dict(self):
#         return{
#             'id':self.id,
#             'sender_id':self.sender_id,
#             'recipient_id':self.recipient_id,
#             'message':self.message,
#             'timestamp':self.timestamp,
            
#         }   
#     def __repr__(self):
#         return '<Message {}>'.format(self.message)
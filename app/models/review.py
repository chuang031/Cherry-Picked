from .db import db, environment, SCHEMA, add_prefix_for_prod

class Review(db.Model):
    __tablename__ = 'reviews'
    
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    productId = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('products.id')), nullable=False)
    customerId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
    review= db.Column(db.String(1500), nullable = False)
    stars = db.Column(db.Integer, nullable = False)
    imageUrl= db.Column(db.String(1500), nullable = True)

    user = db.relationship("User", back_populates="reviews")
    product = db.relationship("Product", back_populates="reviews")

    def __repr__(self):
        return f'<Review Id: {self.id}, productId: {self.productId}, customerId: {self.customerId}, review: {self.review}, stars: {self.stars}, imageUrl:{self.imageUrl}'
    
    def to_dict(self):
            return {
                'id': self.id,
                'productId': self.productId,
                'customerId': self.customerId,
                'review': self.review,
                'stars': self.stars,
                'imageUrl': self.imageUrl
            }
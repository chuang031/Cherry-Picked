from .db import db, environment, SCHEMA, add_prefix_for_prod

class Product(db.Model):
    __tablename__ = 'products'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(50), nullable = False)
    detail= db.Column(db.String(255), nullable = False)
    price= db.Column(db.Numeric, nullable = False)
    url= db.Column(db.String(1500), nullable = False)
    imageUrl= db.Column(db.String(1500), nullable = False)
    brandId= db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)
 
    reviews = db.relationship("Review", back_populates="product",
    cascade="all, delete-orphan", lazy = 'joined')

    def __repr__(self):
        return f'<Product Id: {self.id}, brandId: {self.brandId}, title: {self.title}, detail: {self.detail}, price: {self.price}, url: {self.url}, imageUrl: {self.imageUrl}>'
  
    def to_dict(self):
            return {
                'id': self.id,
                'title': self.title,
                'brandId': self.brandId,
                'detail': self.detail,
                'price': self.price,
                'url': self.url,
                'imageUrl': self.imageUrl,
            }
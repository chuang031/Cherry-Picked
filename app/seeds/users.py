from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', firstName = 'Demo', lastName = 'User', email='demo@aa.io', password='password', imageUrl = 'https://cdn-icons-png.flaticon.com/512/9590/9590989.png', is_brand = False, brandName = None, about = "I'm the Demo user"  )
    hourglass = User(
        username='hourglassbrand', email='hourglass@aa.io', password='password', imageUrl = 'https://cdn.shopify.com/s/files/1/0081/1660/0950/files/unlock-change_NEW_about-nav.jpg?v=1673570081', is_brand = True, brandName = "HOURGLASS", about = "I'm the Brand user")
   

    db.session.add(demo)
    db.session.add(hourglass)
   
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")
        
    db.session.commit()
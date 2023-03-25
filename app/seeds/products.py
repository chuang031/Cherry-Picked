from ..models.product import db, Product, environment, SCHEMA

products =[
    {
    "title": "Glossy Balm",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/2022_Phantom_GlossyBalm_Ecomm1_Trace_1024x1309_3b40585a-9271-4614-a024-038964a258b1_1080x.jpg?v=1658862268",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/2022_Phantom_GlossyBalm_Ecomm1_Trace_1024x1309_3b40585a-9271-4614-a024-038964a258b1_1080x.jpg?v=1658862268",
    "brandId": "2"

    },
       {
    "title": "Lipstick",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/0005__0015__0005_Unlocked_Lipstick_Ecom_007_Sahara_1080x.jpg?v=1672781894",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/0005__0015__0005_Unlocked_Lipstick_Ecom_007_Sahara_1080x.jpg?v=1672781894",
    "brandId": "2"

    },
       {
    "title": "Foundation",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/Ambient_Soft_Glow_Ecom_linen_1_1080x.jpg?v=1653340508",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/Ambient_Soft_Glow_Ecom_linen_1_1080x.jpg?v=1653340508",
    "brandId": "2"

    },
       {
    "title": "Concealer",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/VAC_RefineryGlamour_1024x1309_v2_1080x.jpg?v=1667240621",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/VAC_RefineryGlamour_1024x1309_v2_1080x.jpg?v=1667240621",
    "brandId": "2"

    },
       {
    "title": "Palette",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/ambient-lighting-palette_8aa2ab5e-bda7-4ab3-be83-5cf6c5636c1a_1080x.jpg?v=1658174605",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/ambient-lighting-palette_8aa2ab5e-bda7-4ab3-be83-5cf6c5636c1a_1080x.jpg?v=1658174605",
    "brandId": "2"

    },
       {
    "title": "Lip Gloss",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/UNREAL-Lipgloss-Cap_Off-Ignite_1_0752d897-1caf-40b1-b796-476a921f6d37_1080x.jpg?v=1573101704",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/UNREAL-Lipgloss-Cap_Off-Ignite_1_0752d897-1caf-40b1-b796-476a921f6d37_1080x.jpg?v=1573101704",
    "brandId": "2"

    },
       {
    "title": "Eyebrow Pencil",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/cbw406_archbrowsculptpencil_softbrunette_main_1_2_1_1080x.jpg?v=1633067102",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/cbw406_archbrowsculptpencil_softbrunette_main_1_2_1_1080x.jpg?v=1633067102",
    "brandId": "2"

    },
       {
    "title": "Mascara",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/copy_of_caution-ecomm-open_1080x.jpg?v=1573101678",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/copy_of_caution-ecomm-open_1080x.jpg?v=1573101678",
    "brandId": "2"

    },
       {
    "title": "Setting Spray",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/527B36ED-D3BB-4A4C-9734-765D9450C08A_1080x.jpg?v=1633374305",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/527B36ED-D3BB-4A4C-9734-765D9450C08A_1080x.jpg?v=1633374305",
    "brandId": "2"

    },
       {
    "title": "Blush",
    "detail": "Cool Details",
    "price": "10.50",
    "url": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/H142040001_AmbientLightingBlush-Travel_LumFlush_Main_923c0f15-3f3c-4618-9416-219412d50846_1080x.jpg?v=1573101684",
    "imageUrl": "https://cdn.shopify.com/s/files/1/0081/1660/0950/products/H142040001_AmbientLightingBlush-Travel_LumFlush_Main_923c0f15-3f3c-4618-9416-219412d50846_1080x.jpg?v=1573101684",
    "brandId": "2"

    }
]

# Adds a demo user, you can add other users here if you want
def seed_products():

    db.session.add_all([Product(**product) for product in products])
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_products():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.products RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM products")

    db.session.commit()
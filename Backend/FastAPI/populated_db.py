import mysql.connector

# Connect to MySQL
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="16052005",
    database="nft_marketplace"
)

cursor = db.cursor()

# Insert sample NFT items
cursor.execute("""
INSERT INTO nft_items (item_name, item_description, author, author_wallet, owner_wallet, current_bid)
VALUES 
('Dolores Haze Westworld Eye', 
 'A futuristic digital masterpiece blending neon hues with a dystopian cityscape.', 
 'Pixie Artist', 
 '0x22d780862A3140E5691e2074D04dA91353c855Ed', 
 '0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199', 
 6.06);
""")

db.commit()
cursor.close()
db.close()
print("Database populated successfully!")

from fastapi import FastAPI, HTTPException, Depends, Form, UploadFile, File
from sqlalchemy import create_engine, Column, Integer, String, Float, TIMESTAMP, ForeignKey,  DateTime
from sqlalchemy.orm import sessionmaker, declarative_base, Session, joinedload
import pymysql
import os
from dotenv import load_dotenv
from web3 import Web3
from datetime import datetime, timedelta
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from decimal import Decimal
import requests
from typing import Dict, List, Optional
import random
from sqlalchemy import desc
from sqlalchemy import func
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse

# Load environment variables
load_dotenv()
RPC_URL = os.getenv("RPC_URL")
CONTRACT_ADDRESS = os.getenv("CONTRACT_ADDRESS")
PINATA_API_KEY = os.getenv("PINATA_API_KEY")
PINATA_API_SECRET = os.getenv("PINATA_API_SECRET")
PINATA_JWT = os.getenv("PINATA_JWT")  # Optional

PINATA_UPLOAD_URL = "https://api.pinata.cloud/pinning/pinFileToIPFS"

# Ethereum Connection
web3 = Web3(Web3.HTTPProvider(RPC_URL))
CHECKSUM_CONTRACT_ADDRESS = Web3.to_checksum_address(CONTRACT_ADDRESS)
contract_abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "bidder",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "bidAmount",
				"type": "uint256"
			}
		],
		"name": "BidPlaced",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			}
		],
		"name": "createNFT",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "finalizeAuction",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"name": "NFTCreated",
		"type": "event"
	},
	{
		"anonymous": False,
		"inputs": [
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"indexed": False,
				"internalType": "address",
				"name": "newOwner",
				"type": "address"
			},
			{
				"indexed": False,
				"internalType": "uint256",
				"name": "finalAmount",
				"type": "uint256"
			}
		],
		"name": "NFTTransferred",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_id",
				"type": "uint256"
			}
		],
		"name": "placeBid",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"stateMutability": "payable",
		"type": "receive"
	},
	{
		"inputs": [],
		"name": "contractOwner",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "nftCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "nfts",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "currentBid",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "highestBidder",
				"type": "address"
			},
			{
				"internalType": "bool",
				"name": "active",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]  # Replace with actual ABI
contract = web3.eth.contract(address=CHECKSUM_CONTRACT_ADDRESS, abi=contract_abi)

# Database Connection
DATABASE_URL = "mysql+pymysql://root:16052005@localhost/nft_marketplace"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(bind=engine, autocommit=False, autoflush=False)
Base = declarative_base()

# NFT Model
class NFTItem(Base):
    __tablename__ = "nft_items"
    id = Column(Integer, primary_key=True, index=True)
    item_name = Column(String(255))
    item_description = Column(String(500))
    author = Column(String(255))
    author_wallet = Column(String(255))
    owner_wallet = Column(String(255))
    current_bid = Column(Float)
    currency = Column(String(10))
    img_url = Column(String(500))  # ✅ Add this line to store the image URL
    category = Column(String(50))  # ✅ Add category column
    bidding_end_time = Column(DateTime)  # ✅ Add bidding end time column
    author_image = Column(String(500))  # ✅ New column for author image
	

# Transaction Model
class Transaction(Base):
    __tablename__ = "transactions"
    
    id = Column(Integer, primary_key=True, index=True)
    item_id = Column(Integer, ForeignKey("nft_items.id"))
    item_name = Column(String(255))
    bid_amount = Column(Float)
    bid_time = Column(TIMESTAMP, default=datetime.utcnow)
    owner_wallet = Column(String(255))
    author_wallet = Column(String(255))  # ✅ Added column
    transaction_hash = Column(String(255))  # ✅ Added column
    




# Create tables
Base.metadata.create_all(bind=engine)

# FastAPI app
app = FastAPI()

# CORS Setup
origins = ["http://localhost:3000", "http://127.0.0.1:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# ✅ Pydantic Model for Bids
class BidRequest(BaseModel):
    item_id: int
    item_name: str
    bid_amount: float
    bid_time: str  # ✅ Auto-validates ISO format
    owner_wallet: str
    author_wallet: str
    transaction_hash: str

# Fetch all NFT items
@app.get("/nfts/")
def get_nfts(db: Session = Depends(get_db)):
    return db.query(NFTItem).all()
# ✅ Fetch single NFT
@app.get("/nfts/{item_id}")
def get_nft(item_id: int, db: Session = Depends(get_db)):
    nft = db.query(NFTItem).filter(NFTItem.id == item_id).first()
    if not nft:
        raise HTTPException(status_code=404, detail="NFT not found")
    return nft

# Store transaction after MetaMask execution
@app.post("/bid/{item_id}")
async def store_bid(
    item_id: int,
    bid: BidRequest,  # Receives JSON payload
    db: Session = Depends(get_db),
):
    nft = db.query(NFTItem).filter(NFTItem.id == item_id).first()
    if not nft:
        raise HTTPException(status_code=404, detail="NFT not found")

    if bid.bid_amount <= nft.current_bid:
        raise HTTPException(status_code=400, detail="Bid must be higher than current bid")

    if not Web3.is_address(bid.owner_wallet):
        raise HTTPException(status_code=400, detail="Invalid Ethereum address")

    bid.owner_wallet = Web3.to_checksum_address(bid.owner_wallet)

    # ✅ Verify transaction on blockchain
    try:
        print(f"Checking blockchain transaction: {bid.transaction_hash}")
        receipt = web3.eth.get_transaction_receipt(bid.transaction_hash)

        if not receipt or receipt.status != 1:
            raise HTTPException(status_code=400, detail="Transaction failed or not found")

        # ✅ Ensure correct amount was sent
        tx_details = web3.eth.get_transaction(bid.transaction_hash)
        sent_value = Web3.from_wei(tx_details["value"], "ether")

        if float(sent_value) < bid.bid_amount:
            raise HTTPException(status_code=400, detail="Bid amount mismatch with transaction")

        # ✅ Update NFT bid in DB
        nft.current_bid = bid.bid_amount
        nft.owner_wallet = bid.owner_wallet

        db.commit()

        # ✅ Ensure bid_time is a string before parsing
        bid_time_str = str(bid.bid_time)
        bid_time_parsed = datetime.fromisoformat(bid_time_str)  # No more errors!

        # ✅ Store transaction in DB
        new_transaction = Transaction(
            item_id=item_id,
            item_name=nft.item_name,
            bid_amount=bid.bid_amount,
            bid_time=bid_time_parsed,
            owner_wallet=bid.owner_wallet,
            author_wallet=bid.author_wallet,  # ✅ Added field
            transaction_hash=bid.transaction_hash,  # ✅ Added field
        )

        db.add(new_transaction)
        db.commit()

        return {"message": "Bid recorded successfully", "transaction_hash": bid.transaction_hash}

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Error verifying transaction: {str(e)}")


# ✅ Update API to Handle Author Image Upload
@app.post("/upload_author_image/")
async def upload_author_image(file: UploadFile = File(...)):
    try:
        files = {"file": (file.filename, file.file)}
        headers = {
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_API_SECRET
        }
        response = requests.post(PINATA_UPLOAD_URL, files=files, headers=headers)

        if response.status_code == 200:
            ipfs_hash = response.json()["IpfsHash"]
            ipfs_url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
            return {"ipfs_url": ipfs_url}
        else:
            raise HTTPException(status_code=500, detail="Failed to upload image to IPFS")

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
# Upload image to IPFS
@app.post("/upload/")
async def upload_image(file: UploadFile = File(None)):  # ✅ Default to None to prevent crashes
    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")  # ✅ Handle missing file
    
    try:
        files = {"file": (file.filename, file.file)}
        headers = {
            "pinata_api_key": PINATA_API_KEY,
            "pinata_secret_api_key": PINATA_API_SECRET
        }

        response = requests.post(PINATA_UPLOAD_URL, files=files, headers=headers)

        if response.status_code == 200:
            ipfs_hash = response.json()["IpfsHash"]
            ipfs_url = f"https://gateway.pinata.cloud/ipfs/{ipfs_hash}"
            return {"ipfs_url": ipfs_url}
        else:
            raise HTTPException(status_code=500, detail="Failed to upload image to IPFS")

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {str(e)}")


# Add NFT with image
@app.post("/add_nft/")
async def add_nft(
    title: str = Form(...),
    description: str = Form(...),
    username: str = Form(...),
    price: float = Form(...),
    author_wallet: str = Form(...),
    image_url: str = Form(...),
    author_image: str = Form(None),  # ✅ Accept author image URL
    category: str = Form(...),  # ✅ Accept category from frontend
    days: int = Form(...),
    hours: int = Form(...),
    minutes: int = Form(...),
    db: Session = Depends(get_db)
):
    if not Web3.is_address(author_wallet):
        raise HTTPException(status_code=400, detail="Invalid Ethereum address")

    author_wallet = Web3.to_checksum_address(author_wallet)  # Convert to checksum address

    try:
        # Call Smart Contract to Create NFT
        tx_hash = contract.functions.createNFT(title).transact({"from": author_wallet})
        receipt = web3.eth.wait_for_transaction_receipt(tx_hash)

        # Fetch Latest NFT ID
        nft_id = contract.functions.nftCount().call()

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Blockchain error: {str(e)}")

 	# ✅ Calculate bidding end time
    bidding_end_time = datetime.utcnow() + timedelta(days=days, hours=hours, minutes=minutes)

    # Store NFT in Database with Image URL
    nft_item = NFTItem(
        id=nft_id,
        item_name=title,
        item_description=description,
        author=username,
        author_wallet=author_wallet,
        owner_wallet=author_wallet,   # Initially, owner is author
        current_bid=price,
        currency="ETH",
        img_url=image_url,  # ✅ Use image_url instead of file upload
        category=category,  # ✅ Store category
        bidding_end_time=bidding_end_time,  # ✅ Store bidding end time
        author_image=author_image  # ✅ Store author image
    )
    db.add(nft_item)
    db.commit()
    db.refresh(nft_item)
    
    return {"message": "NFT added successfully", "nft_id": nft_id, "img_url": image_url}

# Fetch NFTs by owner wallet
@app.get("/nfts/owner/{owner_wallet}")
def get_nfts_by_owner(owner_wallet: str, db: Session = Depends(get_db)):
    nfts = db.query(NFTItem).filter(NFTItem.owner_wallet == owner_wallet).all()
    if not nfts:
        raise HTTPException(status_code=404, detail="No NFTs found for this wallet")
    return nfts

# Fetch transactions by owner wallet
@app.get("/transactions/owner/{owner_wallet}")
def get_transactions_by_owner(owner_wallet: str, db: Session = Depends(get_db)):
    transactions = db.query(Transaction).filter(Transaction.owner_wallet == owner_wallet).all()
    if not transactions:
        raise HTTPException(status_code=404, detail="No transactions found for this wallet")
    return transactions

@app.get("/transactions/")
def get_transactions(db: Session = Depends(get_db)):
    transactions = db.query(Transaction).order_by(Transaction.bid_time.desc()).all()
    return transactions


# Pydantic model for author info
class AuthorInfo(BaseModel):
    author: str
    author_wallet: str
    author_image: Optional[str]
    likes: int
    interactions: int
    donations: int
    followers: int
    nft_count: int

# Endpoint to get author information
@app.get("/author/{author_wallet}")
def get_author_info(author_wallet: str, db: Session = Depends(get_db)):
    # Check if author exists
    author = db.query(NFTItem).filter(NFTItem.author_wallet == author_wallet).first()
    
    if not author:
        raise HTTPException(status_code=404, detail="Author not found")
    
    # Count NFTs created by this author
    nft_count = db.query(NFTItem).filter(NFTItem.author_wallet == author_wallet).count()
    
    # Generate random stats between 1 and 9999
    likes = random.randint(1, 9999)
    interactions = random.randint(1, 9999)
    donations = random.randint(1, 9999)
    followers = random.randint(1, 9999)
    
    author_info = {
        "author": author.author,
        "author_wallet": author_wallet,
        "author_image": author.author_image,
        "likes": likes,
        "interactions": interactions,
        "donations": donations,
        "followers": followers,
        "nft_count": nft_count
    }
    
    return author_info

# Endpoint to get all authors with their NFTs
@app.get("/authors_with_nfts/")
def get_authors_with_nfts(db: Session = Depends(get_db)):
    # Get unique authors
    authors = db.query(NFTItem.author, NFTItem.author_wallet, NFTItem.author_image)\
        .distinct(NFTItem.author_wallet)\
        .all()
    
    result = []
    for author in authors:
        # Get NFTs for this author
        nfts = db.query(NFTItem).filter(NFTItem.author_wallet == author.author_wallet).all()
        nft_count = len(nfts)
        
        # Generate random stats
        author_info = {
            "author": author.author,
            "author_wallet": author.author_wallet,
            "author_image": author.author_image,
            "likes": random.randint(1, 9999),
            "interactions": random.randint(1, 9999), 
            "donations": random.randint(1, 9999),
            "followers": random.randint(1, 9999),
            "nft_count": nft_count,
            "nfts": nfts
        }
        result.append(author_info)
    
    return result


@app.get("/top-nfts/")
def get_top_nfts(db: Session = Depends(get_db)):
    try:
        top_nfts = db.query(NFTItem).order_by(desc(NFTItem.current_bid)).limit(4).all()
        return [
            {
                "id": nft.id,
                "item_name": nft.item_name,
                "item_description": nft.item_description,
                "author": nft.author,
                "author_wallet": nft.author_wallet,
                "owner_wallet": nft.owner_wallet,
                "current_bid": nft.current_bid,
                "currency": nft.currency,
                "img_url": nft.img_url,
                "category": nft.category,
                "bidding_end_time": nft.bidding_end_time,
                "author_image": nft.author_image,
            }
            for nft in top_nfts
        ]
    except Exception as e:
        print("Database Error:", str(e))  # ✅ Print error in console
        return {"error": "Internal Server Error"}
    

@app.get("/top-sellers/")
def get_top_sellers(db: Session = Depends(get_db)):
    top_authors = (
        db.query(
            NFTItem.author,
            NFTItem.author_image,
            func.count(NFTItem.id).label("nft_count")
        )
        .group_by(NFTItem.author, NFTItem.author_image)
        .order_by(func.count(NFTItem.id).desc())  # Sort by NFT count descending
        .limit(12)  # Get only the top 12 authors
        .all()
    )

    # Convert to list of dictionaries
    ranked_authors = [
        {
            "rank": index + 1,
            "name": author,
            "nft_count": count,
            "author_image": img_url
        }
        for index, (author, img_url, count) in enumerate(top_authors)
    ]

    return JSONResponse(content=jsonable_encoder(ranked_authors))

# NFT Collection Response Model
class NFTCollectionResponse(BaseModel):
    title: str
    image: str
    items: str
    category: str
    exploreLink: str
    buttonText: str

@app.get("/nft-collections", response_model=List[NFTCollectionResponse])
def get_nft_collections(db: Session = Depends(get_db)):
    # Query to get all NFT items with count per category
    nft_items = db.query(
        NFTItem.item_name,
        NFTItem.img_url.label("image"),
        NFTItem.category,
        func.count(NFTItem.id).over(partition_by=NFTItem.category).label("total_count"),
        func.row_number().over(partition_by=NFTItem.item_name, order_by=NFTItem.id).label("item_number")
    ).all()

    collections = [
        {
            "title": item.item_name,
            "image": item.image or "default_image.jpg",  # Default image if None
            "items": f"{item.item_number}/{item.total_count}",
            "category": item.category,
            "exploreLink": "/explore",
            "buttonText": f"Explore {item.item_name}"
        }
        for item in nft_items
    ]

    return collections
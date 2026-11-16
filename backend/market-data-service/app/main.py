"""
MarketLens - Market Data & Stock Analysis Microservice
Owner: Member 1 (Market Exploration & Stock Analysis)
"""
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="MarketLens Market Data Service",
    description="Real-time quotes, historical OHLCV data, and technical indicator computations",
    version="1.0.0"
)

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

class QuoteResponse(BaseModel):
    symbol: str
    price: float
    change: float
    change_percent: float
    high_24h: float
    low_24h: float
    volume: int
    timestamp: str

class Candle(BaseModel):
    timestamp: str
    open: float
    high: float
    low: float
    close: float
    volume: int

class IndicatorResponse(BaseModel):
    symbol: str
    sma_50: float
    sma_200: float
    rsi_14: float
    macd: float
    signal: float

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "healthy",
        "service": "market-data-service",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/market/quote/{symbol}", response_model=QuoteResponse)
def get_quote(symbol: str):
    sym = symbol.upper()
    # Stub response matching MarketLens canonical format
    return {
        "symbol": sym,
        "price": 224.23 if sym == "AAPL" else 150.00,
        "change": 1.85,
        "change_percent": 0.83,
        "high_24h": 225.50,
        "low_24h": 222.10,
        "volume": 48291000,
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/market/indicators/{symbol}", response_model=IndicatorResponse)
def get_indicators(symbol: str):
    sym = symbol.upper()
    return {
        "symbol": sym,
        "sma_50": 218.40,
        "sma_200": 195.12,
        "rsi_14": 58.4,
        "macd": 2.15,
        "signal": 1.80
    }

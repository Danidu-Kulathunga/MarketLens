"""
MarketLens - Financial News & Market Intelligence Microservice
Owner: Member 3 (Financial News & Market Intelligence)
"""
from fastapi import FastAPI, Query
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

app = FastAPI(
    title="MarketLens News & Intelligence Service",
    description="Financial news aggregation, NLP-based sentiment analysis, and entity correlation",
    version="1.0.0"
)

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

class NewsArticle(BaseModel):
    id: str
    title: str
    source: str
    published_at: str
    sentiment: str  # Bullish, Bearish, Neutral
    sentiment_score: float  # -1.0 to +1.0
    tickers: List[str]
    summary: str

class SentimentOverview(BaseModel):
    symbol: str
    overall_sentiment: str
    average_score: float
    article_count: int
    bullish_pct: float
    bearish_pct: float
    neutral_pct: float

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "healthy",
        "service": "news-service",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/news/articles", response_model=List[NewsArticle])
def get_articles(ticker: Optional[str] = None, limit: int = 10):
    return [
        {
            "id": "art-001",
            "title": "Tech Sector Rallies as Semiconductor Demand Accelerates Ahead of Earnings",
            "source": "Financial Times",
            "published_at": datetime.utcnow().isoformat(),
            "sentiment": "Bullish",
            "sentiment_score": 0.82,
            "tickers": ["AAPL", "NVDA", "MSFT"],
            "summary": "Analyst sentiment turns positive ahead of major tech product cycles and enterprise AI infrastructure spending."
        },
        {
            "id": "art-002",
            "title": "Federal Reserve Signals Data-Dependent Stance on Rate Cuts",
            "source": "Bloomberg",
            "published_at": datetime.utcnow().isoformat(),
            "sentiment": "Neutral",
            "sentiment_score": 0.05,
            "tickers": ["SPY", "QQQ"],
            "summary": "Central bank policymakers emphasize inflation trajectory and labor market metrics before adjusting policy."
        }
    ]

@app.get("/api/v1/news/sentiment/{symbol}", response_model=SentimentOverview)
def get_sentiment(symbol: str):
    sym = symbol.upper()
    return {
        "symbol": sym,
        "overall_sentiment": "Bullish",
        "average_score": 0.65,
        "article_count": 28,
        "bullish_pct": 70.0,
        "bearish_pct": 10.0,
        "neutral_pct": 20.0
    }

"""
MarketLens - Data Ingestion & Data Pipeline Service
Owner: Member 4 (Data Management & Data Pipeline)
"""
from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="MarketLens Data Pipeline Service",
    description="Dual ingestion (External APIs + User Uploads), validation, normalization, and canonical data storage",
    version="1.0.0"
)

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

class SourceHealth(BaseModel):
    source_id: str
    name: str
    status: str
    latency_ms: int
    last_sync: str
    records_synced_today: int

class IngestionBatch(BaseModel):
    batch_id: str
    filename: str
    records_count: int
    status: str  # PENDING, PROCESSING, COMPLETED, FAILED
    errors_count: int
    uploaded_at: str

class CanonicalMarketRecord(BaseModel):
    symbol: str
    timestamp: str
    open: float
    high: float
    low: float
    close: float
    volume: int
    source_type: str  # API or UPLOAD

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "healthy",
        "service": "data-pipeline-service",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/pipeline/sources", response_model=List[SourceHealth])
def list_sources():
    return [
        {
            "source_id": "src-twelve-data",
            "name": "Twelve Data API",
            "status": "OPERATIONAL",
            "latency_ms": 142,
            "last_sync": datetime.utcnow().isoformat(),
            "records_synced_today": 128400
        },
        {
            "source_id": "src-cse",
            "name": "Colombo Stock Exchange (CSE)",
            "status": "OPERATIONAL",
            "latency_ms": 280,
            "last_sync": datetime.utcnow().isoformat(),
            "records_synced_today": 45100
        }
    ]

@app.get("/api/v1/pipeline/batches", response_model=List[IngestionBatch])
def list_batches():
    return [
        {
            "batch_id": "BATCH-2026-11-001",
            "filename": "aapl_historical_2025_2026.csv",
            "records_count": 252,
            "status": "COMPLETED",
            "errors_count": 0,
            "uploaded_at": datetime.utcnow().isoformat()
        }
    ]

@app.get("/api/v1/pipeline/canonical/market-data/{symbol}", response_model=List[CanonicalMarketRecord])
def get_canonical_market_data(symbol: str, limit: int = 100):
    """
    Downstream contract consumed by Member 5 (AI Prediction Service) and Member 1 (Stock Analysis).
    Guarantees unified schema regardless of whether data originated from External APIs or CSV uploads.
    """
    sym = symbol.upper()
    return [
        {
            "symbol": sym,
            "timestamp": "2026-11-15T16:00:00Z",
            "open": 222.50,
            "high": 225.10,
            "low": 221.80,
            "close": 224.23,
            "volume": 48291000,
            "source_type": "API"
        },
        {
            "symbol": sym,
            "timestamp": "2026-11-14T16:00:00Z",
            "open": 220.10,
            "high": 223.40,
            "low": 219.50,
            "close": 222.38,
            "volume": 51204000,
            "source_type": "API"
        }
    ]

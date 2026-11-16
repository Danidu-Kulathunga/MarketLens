"""
MarketLens - AI Prediction & Advanced Analytics Service
Owner: Member 5 (AI Prediction & Advanced Analytics)
Consumes: Canonical historical market data from Member 4 (Data Pipeline Service)
"""
from fastapi import FastAPI, HTTPException, Query
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from datetime import datetime

app = FastAPI(
    title="MarketLens AI & Prediction Service",
    description="Predictive ML models, financial analyst thesis grounding, and explanation telemetry",
    version="1.0.0"
)

class HealthResponse(BaseModel):
    status: str
    service: str
    timestamp: str

class FactorInfluence(BaseModel):
    name: str
    impact: str  # POSITIVE, NEGATIVE, NEUTRAL
    weight_pct: float
    description: str

class PredictionResult(BaseModel):
    symbol: str
    target_horizon_days: int
    predicted_direction: str  # BULLISH, BEARISH, RANGE_BOUND
    confidence_score: float  # 0.0 to 1.0
    predicted_target_price: float
    current_reference_price: float
    model_version: str
    generated_at: str
    key_drivers: List[FactorInfluence]

class ModelStatus(BaseModel):
    model_id: str
    name: str
    type: str
    accuracy_metric: str
    metric_value: float
    status: str
    last_trained: str

@app.get("/health", response_model=HealthResponse)
def health_check():
    return {
        "status": "healthy",
        "service": "ai-prediction-service",
        "timestamp": datetime.utcnow().isoformat()
    }

@app.get("/api/v1/ai/models/status", response_model=List[ModelStatus])
def get_models_status():
    return [
        {
            "model_id": "lstm-trend-v2.1",
            "name": "Sequential Trend Predictor (LSTM)",
            "type": "Directional Classifier",
            "accuracy_metric": "Directional Accuracy",
            "metric_value": 0.742,
            "status": "ACTIVE",
            "last_trained": "2026-11-10T04:00:00Z"
        },
        {
            "model_id": "xgb-volatility-v1.4",
            "name": "Extreme Gradient Boosted Volatility",
            "type": "Regression",
            "accuracy_metric": "RMSE",
            "metric_value": 0.018,
            "status": "ACTIVE",
            "last_trained": "2026-11-12T04:00:00Z"
        }
    ]

@app.get("/api/v1/ai/predict/{symbol}", response_model=PredictionResult)
def predict_stock(symbol: str, horizon_days: int = 14):
    sym = symbol.upper()
    return {
        "symbol": sym,
        "target_horizon_days": horizon_days,
        "predicted_direction": "BULLISH",
        "confidence_score": 0.78,
        "predicted_target_price": 236.50 if sym == "AAPL" else 165.00,
        "current_reference_price": 224.23 if sym == "AAPL" else 150.00,
        "model_version": "lstm-trend-v2.1",
        "generated_at": datetime.utcnow().isoformat(),
        "key_drivers": [
            {
                "name": "Technical Momentum (SMA 50/200 & RSI)",
                "impact": "POSITIVE",
                "weight_pct": 38.5,
                "description": "Bullish moving average convergence with RSI consolidating above 55."
            },
            {
                "name": "News Sentiment & Earnings Tone",
                "impact": "POSITIVE",
                "weight_pct": 32.0,
                "description": "High frequency of positive sector sentiment across Bloomberg & FT reports."
            },
            {
                "name": "Macro Interest Rate Environment",
                "impact": "NEUTRAL",
                "weight_pct": 29.5,
                "description": "Fed rate stability expectations priced in across equity benchmarks."
            }
        ]
    }

import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "ai-prediction-service"

def test_get_models_status():
    response = client.get("/api/v1/ai/models/status")
    assert response.status_code == 200
    models = response.json()
    assert isinstance(models, list)
    assert len(models) >= 2
    assert models[0]["status"] == "ACTIVE"

def test_predict_stock():
    response = client.get("/api/v1/ai/predict/AAPL?horizon_days=14")
    assert response.status_code == 200
    prediction = response.json()
    assert prediction["symbol"] == "AAPL"
    assert prediction["predicted_direction"] in ["BULLISH", "BEARISH", "RANGE_BOUND"]
    assert 0.0 <= prediction["confidence_score"] <= 1.0
    assert len(prediction["key_drivers"]) > 0

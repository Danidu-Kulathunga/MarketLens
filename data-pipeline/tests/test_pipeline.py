import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "data-pipeline-service"

def test_list_sources():
    response = client.get("/api/v1/pipeline/sources")
    assert response.status_code == 200
    sources = response.json()
    assert isinstance(sources, list)
    assert len(sources) >= 2
    assert any(s["name"] == "Twelve Data API" for s in sources)

def test_canonical_market_data():
    response = client.get("/api/v1/pipeline/canonical/market-data/AAPL")
    assert response.status_code == 200
    records = response.json()
    assert isinstance(records, list)
    assert len(records) > 0
    record = records[0]
    assert "open" in record
    assert "close" in record
    assert "volume" in record
    assert "source_type" in record

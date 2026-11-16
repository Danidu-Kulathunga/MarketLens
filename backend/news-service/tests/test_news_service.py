import pytest
from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "healthy"
    assert data["service"] == "news-service"

def test_get_articles():
    response = client.get("/api/v1/news/articles")
    assert response.status_code == 200
    articles = response.json()
    assert isinstance(articles, list)
    assert len(articles) > 0
    assert "sentiment" in articles[0]

def test_get_sentiment():
    response = client.get("/api/v1/news/sentiment/AAPL")
    assert response.status_code == 200
    sentiment = response.json()
    assert sentiment["symbol"] == "AAPL"
    assert "average_score" in sentiment

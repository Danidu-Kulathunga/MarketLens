# API Contract Specification: Member 4 (Data Pipeline) ➔ Member 5 (AI Prediction)

This document formalizes the inter-service integration contract between **Member 4 (Data Management & Pipeline)** and **Member 5 (AI Prediction & Analytics)**.

---

## 1. Overview & Objective

Member 5 requires historical OHLCV data to compute technical feature vectors (moving averages, momentum indicators, volatility metrics) for machine learning prediction models (LSTM trend classifier and XGBoost volatility regressor).

Member 4 provides a unified **Canonical Market Data API** that abstracts away whether the data originated from:
- External Market APIs (Twelve Data, Colombo Stock Exchange).
- User-Uploaded CSV / JSON market datasets.

---

## 2. Endpoint Specification

### `GET /api/v1/pipeline/canonical/market-data/{symbol}`

- **Provider**: Data Pipeline Service (`pipeline-service:8003`)
- **Consumer**: AI Prediction Service (`ai-service:8004`)
- **Protocol**: HTTP/1.1 REST
- **Timeout**: 5000ms

### Request Parameters
| Parameter | Type | Required | Default | Description |
| :--- | :--- | :--- | :--- | :--- |
| `symbol` | `string` (path) | Yes | - | Equity ticker symbol (e.g. `AAPL`, `MSFT`) |
| `interval`| `string` (query)| No | `1d` | Bar interval (`1m`, `5m`, `1h`, `1d`) |
| `limit` | `integer` (query)| No | `100` | Number of historical bars to retrieve |
| `start_date`| `string` (query)| No | - | ISO8601 UTC timestamp start |
| `end_date` | `string` (query)| No | - | ISO8601 UTC timestamp end |

---

## 3. Sample Response Payload

```json
[
  {
    "symbol": "AAPL",
    "timestamp": "2026-11-15T16:00:00Z",
    "open": 222.50,
    "high": 225.10,
    "low": 221.80,
    "close": 224.23,
    "volume": 48291000,
    "source_type": "API"
  },
  {
    "symbol": "AAPL",
    "timestamp": "2026-11-14T16:00:00Z",
    "open": 220.10,
    "high": 223.40,
    "low": 219.50,
    "close": 222.38,
    "volume": 51204000,
    "source_type": "UPLOAD"
  }
]
```

---

## 4. Consumer Implementation in Member 5 Service (Python)

```python
import httpx
import os

PIPELINE_SERVICE_URL = os.getenv("PIPELINE_SERVICE_URL", "http://pipeline-service:8003")

async def fetch_training_features(symbol: str, limit: int = 100):
    url = f"{PIPELINE_SERVICE_URL}/api/v1/pipeline/canonical/market-data/{symbol}"
    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get(url, params={"limit": limit})
        if response.status_code != 200:
            raise RuntimeError(f"Pipeline service error: {response.text}")
        
        bars = response.json()
        # Compute feature vectors: price returns, rolling volatility, close prices
        close_prices = [b["close"] for b in bars]
        return close_prices
```

---

## 5. Backward Compatibility Guarantee
- Member 4 will never remove or rename existing fields (`symbol`, `timestamp`, `open`, `high`, `low`, `close`, `volume`).
- Any newly added fields (e.g. `vwap`, `adjusted_close`) will be optional additions.

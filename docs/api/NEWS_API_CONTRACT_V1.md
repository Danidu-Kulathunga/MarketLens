
# MarketLens — News Domain Model & API Contract v1

**Task:** M3-01  
**Version:** 1.0 (Draft)  
**Status:** Pending review and M1-01 contract alignment

## 1. Canonical Article Model

A canonical article is the standardized representation of a news article, regardless of which external news provider supplies it.

| Field | Type | Required | Description |
|---|---|---|---|
| id | UUID | Yes | Unique MarketLens article identifier |
| title | String | Yes | Article headline |
| source | String | Yes | News publisher or provider |
| publishedAt | ISO 8601 DateTime | Yes | Publication timestamp in UTC |
| url | String | Yes | Original article URL |
| summary | String | No | Short article summary |
| companySymbols | String[] | Yes | Related CSE stock symbols; empty array if none |
| category | String | No | News category, such as Economy or Banking |



## 2. Example Article

```json
{
  "id": "c47db4cf-674a-4d34-a8b5-740e5ab10d52",
  "title": "Commercial Bank announces quarterly financial results",
  "source": "EconomyNext",
  "publishedAt": "2026-11-17T09:30:00Z",
  "url": "https://example.com/news/commercial-bank-results",
  "summary": "Commercial Bank has published its latest quarterly financial results.",
  "companySymbols": ["COMB.N0000"],
  "category": "Banking"
}
```




## 3. News API Endpoints

**Base path:** `/api/v1`

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/news/latest` | Retrieve the latest published articles |
| GET | `/news/{id}` | Retrieve one article by its unique ID |
| GET | `/companies/{symbol}/news` | Retrieve news related to a CSE company |
| GET | `/news/search` | Search articles using filters |

### Example Requests

**1. Latest news**
GET /api/v1/news/latest

**2. Article details**
GET /api/v1/news/c47db4cf-674a-4d34-a8b5-740e5ab10d52

**3. Company news**
GET /api/v1/companies/COMB.N0000/news

**4. Search news**
GET /api/v1/news/search?keyword=banking

All endpoints are proposed for v1 and subject to team contract review.



## 4. Filtering, Sorting and Pagination

The `/news/latest`, `/news/search`, and `/companies/{symbol}/news` endpoints support applicable query parameters.

| Parameter | Type | Description |
|---|---|---|
| keyword | String | Search article titles and summaries |
| symbol | String | Filter by CSE stock symbol, e.g. COMB.N0000 |
| source | String | Filter by news source |
| category | String | Filter by news category |
| from | ISO 8601 DateTime | Earliest publication date (inclusive) |
| to | ISO 8601 DateTime | Latest publication date (inclusive) |
| sortBy | String | `publishedAt` (default), `title` |
| sortOrder | String | `desc` (default), `asc` |
| page | Integer | Page number, starting at 1 (default: 1) |
| pageSize | Integer | Number of articles per page (default: 20, maximum: 100) |

### Example Requests

**Search with multiple filters:**

GET /api/v1/news/search?keyword=banking&source=EconomyNext&from=2026-11-01T00:00:00Z

**Company news, newest first:**

GET /api/v1/companies/COMB.N0000/news?sortBy=publishedAt&sortOrder=desc

**Retrieve the second page:**

GET /api/v1/news/latest?page=2&pageSize=20

### Rules

- Date/time values use ISO 8601 with UTC timezone.
- `from` must be earlier than or equal to `to`.
- Invalid filters or pagination values return a validation error.
- Sorting by `publishedAt` uses article ID as a secondary key for stable ordering.
- Unsupported query parameters should be rejected with a validation error.



## 5. API Response Format and Error Handling

News APIs follow the shared M1-01 response envelope.

### Successful Response Example

```json
{
  "success": true,
  "data": {
    "id": "c47db4cf-674a-4d34-a8b5-740e5ab10d52",
    "title": "Commercial Bank announces quarterly financial results",
    "source": "EconomyNext",
    "publishedAt": "2026-11-17T09:30:00Z",
    "url": "https://example.com/news/commercial-bank-results",
    "summary": "Commercial Bank has published its latest quarterly financial results.",
    "companySymbols": ["COMB.N0000"],
    "category": "Banking"
  },
  "error": null
}
```

### Error Response Example

```json
{
  "success": false,
  "data": null,
  "error": {
    "code": "NOT_FOUND",
    "message": "The requested article was not found."
  }
}
```

### Standard Error Codes

| Error Code | Description |
|---|---|
| VALIDATION_ERROR | Invalid search filters, dates or pagination |
| NOT_FOUND | Requested article does not exist |
| INVALID_SYMBOL | Invalid or unsupported company symbol |
| PROVIDER_ERROR | External news provider encountered an error |

### Contract Alignment

The response structure and error codes are based on the M1-01 Trello requirements.

Final envelope details, including pagination metadata and HTTP status mappings, must be confirmed against Member 1's approved contract before merging.


## 6. Paginated News Response

Example response for:

`GET /api/v1/news/latest?page=1&pageSize=20`

```json
{
  "success": true,
  "data": {
    "items": [
      {
        "id": "c47db4cf-674a-4d34-a8b5-740e5ab10d52",
        "title": "Commercial Bank announces quarterly financial results",
        "source": "EconomyNext",
        "publishedAt": "2026-11-17T09:30:00Z",
        "url": "https://example.com/news/commercial-bank-results",
        "summary": "Commercial Bank has published its latest quarterly financial results.",
        "companySymbols": ["COMB.N0000"],
        "category": "Banking"
      }
    ],
    "pagination": {
      "page": 1,
      "pageSize": 20,
      "totalItems": 54,
      "totalPages": 3
    }
  },
  "error": null
}
```

### Pagination Rules

- `items` contains the articles returned for the requested page.
- `totalItems` represents the number of matching articles.
- `totalPages` is calculated from `totalItems` and `pageSize`.
- Empty results return an empty `items` array.
- The pagination structure is provisional until confirmed with M1-01.

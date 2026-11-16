/**
 * MarketLens Unified API Client
 * Connects frontend features to the Nginx API Gateway (/api/v1/...)
 * Automatically falls back to mock contexts if backend microservices are offline.
 */

export interface ApiResponse<T> {
  status: 'success' | 'error';
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: string;
    version?: string;
  };
}

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || '/api/v1';
  }

  private getHeaders(): HeadersInit {
    const token = localStorage.getItem('marketlens_jwt_token');
    return {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async get<T>(endpoint: string, fallbackData?: T): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'GET',
        headers: this.getHeaders(),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      return json.data !== undefined ? json.data : json;
    } catch (error) {
      if (fallbackData !== undefined) {
        return fallbackData;
      }
      throw error;
    }
  }

  async post<T>(endpoint: string, body: any, fallbackData?: T): Promise<T> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const json = await response.json();
      return json.data !== undefined ? json.data : json;
    } catch (error) {
      if (fallbackData !== undefined) {
        return fallbackData;
      }
      throw error;
    }
  }
}

export const apiClient = new ApiClient();

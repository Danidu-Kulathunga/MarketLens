import { apiClient } from './apiClient';
import { ALL_STOCKS, AAPL_STOCK_DETAILS, PEER_BENCHMARKS } from '@/data/mock/marketData';
import { StockSummary } from '@/types';

export const marketService = {
  async getAllStocks(): Promise<StockSummary[]> {
    return apiClient.get<StockSummary[]>('/market/stocks', ALL_STOCKS);
  },

  async getStockDetails(symbol: string): Promise<StockSummary> {
    const fallback =
      ALL_STOCKS.find((s) => s.symbol.toUpperCase() === symbol.toUpperCase()) ||
      AAPL_STOCK_DETAILS;
    return apiClient.get<StockSummary>(`/market/quote/${symbol}`, fallback);
  },

  async getPeerBenchmarks(symbol: string) {
    return PEER_BENCHMARKS;
  },
};

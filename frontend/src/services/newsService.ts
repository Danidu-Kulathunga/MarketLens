import { apiClient } from './apiClient';
import { MOCK_NEWS_ARTICLES, TRENDING_TICKERS, SECTOR_SENTIMENTS } from '@/data/mock/newsData';
import { NewsArticle } from '@/types';

export const newsService = {
  async getArticles(category?: string, ticker?: string): Promise<NewsArticle[]> {
    return apiClient.get<NewsArticle[]>('/news/articles', MOCK_NEWS_ARTICLES);
  },

  async getTrendingTickers() {
    return apiClient.get('/news/trending', TRENDING_TICKERS);
  },

  async getSectorSentiment() {
    return apiClient.get('/news/sector-sentiment', SECTOR_SENTIMENTS);
  },
};

import { apiClient } from './apiClient';
import { MOCK_AI_REPORTS, AIAnalysisReport } from '@/data/mock/aiData';

export const aiService = {
  async getAnalysis(symbol: string): Promise<AIAnalysisReport> {
    const sym = symbol.toUpperCase();
    const fallback = MOCK_AI_REPORTS[sym] || MOCK_AI_REPORTS.AAPL;
    return apiClient.get<AIAnalysisReport>(`/ai/predict/${sym}`, fallback);
  },
};

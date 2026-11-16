import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ExternalLink, Sparkles } from 'lucide-react';
import { NewsArticle } from '@/types';

interface NewsArticleCardProps {
  article: NewsArticle;
}

export const NewsArticleCard: React.FC<NewsArticleCardProps> = ({ article }) => {
  const navigate = useNavigate();

  const getSentimentPill = (sentiment: string, score: number) => {
    if (sentiment === 'Bullish') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
          Bullish ({score}%)
        </span>
      );
    }
    if (sentiment === 'Bearish') {
      return (
        <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
          Bearish ({score}%)
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold bg-gray-100 text-gray-700">
        Neutral
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:border-gray-300 transition-all space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-gray-900">{article.source}</span>
          <span className="text-gray-300">•</span>
          <span className="text-gray-400">{article.timeAgo || 'Recently'}</span>
          {article.impact && (
            <span className="px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold text-[10px]">
              {article.impact}
            </span>
          )}
        </div>
        {getSentimentPill(article.sentiment, article.sentimentPercent || 80)}
      </div>

      <div>
        <h3 className="text-base font-extrabold text-gray-900 leading-snug hover:text-indigo-600 transition-colors cursor-pointer">
          {article.headline}
        </h3>
        <p className="text-xs text-gray-600 mt-1.5 leading-relaxed">{article.summary}</p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <span className="text-[11px] text-gray-400 font-semibold">Correlated Assets:</span>
          {article.tickers.map((t) => (
            <button
              key={t.symbol}
              onClick={() => navigate(`/markets/${t.symbol.replace('$', '')}`)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-gray-100 hover:bg-gray-200 text-xs font-mono font-bold text-gray-800 transition-colors"
            >
              <span>{t.symbol}</span>
              <span
                className={`text-[10px] ${
                  t.change >= 0 ? 'text-emerald-600' : 'text-rose-600'
                }`}
              >
                {t.change >= 0 ? '+' : ''}
                {t.change}%
              </span>
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold hover:text-indigo-800 cursor-pointer">
          <span>Read Full Article</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </div>
  );
};

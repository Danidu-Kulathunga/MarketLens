/**
 * MarketLens Financial & General Data Formatters
 */

/**
 * Formats a number as a currency string (e.g. $1,234.56)
 */
export function formatCurrency(
  value: number,
  currency: string = 'USD',
  minimumFractionDigits: number = 2,
  maximumFractionDigits: number = 2
): string {
  if (isNaN(value) || value === null || value === undefined) return '$0.00';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

/**
 * Formats a decimal/percentage value (e.g. +2.34% or -1.20%)
 */
export function formatPercent(
  value: number,
  includeSign: boolean = true,
  decimals: number = 2
): string {
  if (isNaN(value) || value === null || value === undefined) return '0.00%';
  const prefix = includeSign && value > 0 ? '+' : '';
  return `${prefix}${value.toFixed(decimals)}%`;
}

/**
 * Formats large volume or market cap numbers into compact format (e.g. 1.2M, 345.6B)
 */
export function formatCompactNumber(value: number): string {
  if (isNaN(value) || value === null || value === undefined) return '0';
  if (Math.abs(value) >= 1e12) return `${(value / 1e12).toFixed(2)}T`;
  if (Math.abs(value) >= 1e9) return `${(value / 1e9).toFixed(2)}B`;
  if (Math.abs(value) >= 1e6) return `${(value / 1e6).toFixed(2)}M`;
  if (Math.abs(value) >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
  return value.toLocaleString();
}

/**
 * Formats an ISO date string to a localized readable date
 */
export function formatDate(dateStr: string, options?: Intl.DateTimeFormatOptions): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  return new Intl.DateTimeFormat(
    'en-US',
    options || { month: 'short', day: 'numeric', year: 'numeric' }
  ).format(date);
}

/**
 * Formats a relative timestamp (e.g. "5m ago", "2h ago")
 */
export function formatRelativeTime(dateStr: string): string {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) return dateStr;
  const now = new Date();
  const diffSec = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffSec < 60) return `${Math.max(1, diffSec)}s ago`;
  const diffMin = Math.floor(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m ago`;
  const diffHours = Math.floor(diffMin / 60);
  if (diffHours < 24) return `${diffHours}h ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays}d ago`;
}

// Crypto API Classes for Browser Environment
// Converted from Node.js script to work with React/Next.js

export interface CryptoData {
  timestamp: number;
  date: string;
  price: string;
  volume?: number;
  market_cap?: number;
  open?: string;
  high?: string;
  low?: string;
  close?: string;
  percent_change_24h?: number;
}

export interface APIResponse {
  token: string;
  days: number;
  timestamp: string;
  data: {
    [key: string]: CryptoData[] | { error: string };
  };
}

// Utility function to make HTTP requests
async function makeRequest(url: string, headers: Record<string, string> = {}): Promise<any> {
  try {
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(`Request failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

// CoinGecko API - Free tier available
export class CoinGeckoAPI {
  private baseURL = 'https://api.coingecko.com/api/v3';

  async getHistoricalData(tokenId: string, vsCurrency = 'usd', days = 30): Promise<CryptoData[]> {
    try {
      const url = `${this.baseURL}/coins/${tokenId}/market_chart?vs_currency=${vsCurrency}&days=${days}`;
      console.log(`🦎 Fetching from CoinGecko: ${tokenId} (${days} days)`);
      
      const data = await makeRequest(url);
      
      const formattedData = data.prices.map((price: [number, number], index: number) => ({
        timestamp: price[0],
        date: new Date(price[0]).toISOString().split('T')[0],
        price: price[1].toFixed(6),
        market_cap: data.market_caps[index] ? data.market_caps[index][1] : null,
        volume: data.total_volumes[index] ? data.total_volumes[index][1] : null
      }));
      
      return formattedData;
    } catch (error) {
      console.error('❌ CoinGecko API Error:', error);
      throw error;
    }
  }

  async getHistoricalDataRange(tokenId: string, fromDate: string, toDate: string, vsCurrency = 'usd'): Promise<CryptoData[]> {
    try {
      const from = Math.floor(new Date(fromDate).getTime() / 1000);
      const to = Math.floor(new Date(toDate).getTime() / 1000);
      
      const url = `${this.baseURL}/coins/${tokenId}/market_chart/range?vs_currency=${vsCurrency}&from=${from}&to=${to}`;
      console.log(`🦎 Fetching CoinGecko range: ${fromDate} to ${toDate}`);
      
      const data = await makeRequest(url);
      
      return data.prices.map((price: [number, number], index: number) => ({
        timestamp: price[0],
        date: new Date(price[0]).toISOString().split('T')[0],
        price: price[1].toFixed(6),
        market_cap: data.market_caps[index] ? data.market_caps[index][1] : null,
        volume: data.total_volumes[index] ? data.total_volumes[index][1] : null
      }));
    } catch (error) {
      console.error('❌ CoinGecko Range API Error:', error);
      throw error;
    }
  }
}

// CoinMarketCap API - Requires API key
export class CoinMarketCapAPI {
  private apiKey: string;
  private baseURL = 'https://pro-api.coinmarketcap.com/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async getHistoricalQuotes(symbol: string, timeStart: string, timeEnd: string, interval = 'daily'): Promise<CryptoData[]> {
    try {
      const params = new URLSearchParams({
        symbol: symbol.toUpperCase(),
        time_start: timeStart,
        time_end: timeEnd,
        interval: interval,
        convert: 'USD'
      });

      const url = `${this.baseURL}/cryptocurrency/quotes/historical?${params}`;
      console.log(`📈 Fetching from CoinMarketCap: ${symbol}`);

      const headers = {
        'X-CMC_PRO_API_KEY': this.apiKey,
        'Accept': 'application/json'
      };

      const data = await makeRequest(url, headers);
      
      const quotes = data.data.quotes;
      return quotes.map((quote: any) => ({
        timestamp: new Date(quote.timestamp).getTime(),
        date: quote.timestamp.split('T')[0],
        price: quote.quote.USD.price.toFixed(6),
        volume: quote.quote.USD.volume_24h,
        market_cap: quote.quote.USD.market_cap,
        percent_change_24h: quote.quote.USD.percent_change_24h
      }));
    } catch (error) {
      console.error('❌ CoinMarketCap API Error:', error);
      throw error;
    }
  }

  async getCurrentQuote(symbol: string): Promise<any> {
    try {
      const params = new URLSearchParams({
        symbol: symbol.toUpperCase(),
        convert: 'USD'
      });

      const url = `${this.baseURL}/cryptocurrency/quotes/latest?${params}`;
      console.log(`📈 Fetching current quote: ${symbol}`);

      const headers = {
        'X-CMC_PRO_API_KEY': this.apiKey,
        'Accept': 'application/json'
      };

      const data = await makeRequest(url, headers);
      return data.data[symbol.toUpperCase()];
    } catch (error) {
      console.error('❌ CoinMarketCap Current Quote Error:', error);
      throw error;
    }
  }
}

// CryptoCompare API - Free tier available
export class CryptoCompareAPI {
  private baseURL = 'https://min-api.cryptocompare.com/data';

  async getHistoricalDaily(symbol: string, limit = 30, toSymbol = 'USD'): Promise<CryptoData[]> {
    try {
      const params = new URLSearchParams({
        fsym: symbol.toUpperCase(),
        tsym: toSymbol,
        limit: limit.toString(),
        toTs: Math.floor(Date.now() / 1000).toString()
      });

      const url = `${this.baseURL}/v2/histoday?${params}`;
      console.log(`🔄 Fetching from CryptoCompare: ${symbol} (${limit} days)`);

      const data = await makeRequest(url);
      
      if (data.Response === 'Error') {
        throw new Error(data.Message);
      }

      return data.Data.Data.map((item: any) => ({
        timestamp: item.time * 1000,
        date: new Date(item.time * 1000).toISOString().split('T')[0],
        open: item.open.toFixed(6),
        high: item.high.toFixed(6),
        low: item.low.toFixed(6),
        close: item.close.toFixed(6),
        volume: item.volumeto
      }));
    } catch (error) {
      console.error('❌ CryptoCompare API Error:', error);
      throw error;
    }
  }

  async getHistoricalHourly(symbol: string, limit = 24, toSymbol = 'USD'): Promise<CryptoData[]> {
    try {
      const params = new URLSearchParams({
        fsym: symbol.toUpperCase(),
        tsym: toSymbol,
        limit: limit.toString()
      });

      const url = `${this.baseURL}/v2/histohour?${params}`;
      console.log(`🔄 Fetching hourly from CryptoCompare: ${symbol}`);

      const data = await makeRequest(url);
      
      if (data.Response === 'Error') {
        throw new Error(data.Message);
      }

      return data.Data.Data.map((item: any) => ({
        timestamp: item.time * 1000,
        date: new Date(item.time * 1000).toISOString(),
        open: item.open.toFixed(6),
        high: item.h.toFixed(6),
        low: item.l.toFixed(6),
        close: item.c.toFixed(6),
        volume: item.volumeto
      }));
    } catch (error) {
      console.error('❌ CryptoCompare Hourly API Error:', error);
      throw error;
    }
  }
}

// Token ID mapping for CoinGecko
export const TOKEN_ID_MAP: Record<string, string> = {
  'USDC': 'usd-coin',
  'USDT': 'tether',
  'BTC': 'bitcoin',
  'ETH': 'ethereum',
  'BNB': 'binancecoin',
  'ADA': 'cardano',
  'SOL': 'solana',
  'DOT': 'polkadot',
  'DOGE': 'dogecoin',
  'AVAX': 'avalanche-2',
  'MATIC': 'matic-network',
  'LINK': 'chainlink',
  'UNI': 'uniswap',
  'LTC': 'litecoin',
  'XRP': 'ripple',
  'BCH': 'bitcoin-cash',
  'ATOM': 'cosmos',
  'NEAR': 'near',
  'FTM': 'fantom',
  'ALGO': 'algorand'
};

// Main function to fetch data from multiple APIs
export async function fetchCryptoData(
  tokenSymbol: string,
  days: number,
  apiKeys: {
    coinMarketCap?: string;
    finnhub?: string;
    alphaVantage?: string;
    taapiIO?: string;
    twelveData?: string;
  } = {}
): Promise<APIResponse> {
  console.log('🚀 Starting Crypto Historical Data Fetcher');
  console.log(`Token: ${tokenSymbol}`);
  console.log(`Days: ${days}`);

  const results: APIResponse = {
    token: tokenSymbol,
    days: days,
    timestamp: new Date().toISOString(),
    data: {}
  };

  // Initialize APIs
  const coinGecko = new CoinGeckoAPI();
  const cryptoCompare = new CryptoCompareAPI();
  let coinMarketCap: CoinMarketCapAPI | null = null;

  if (apiKeys.coinMarketCap) {
    coinMarketCap = new CoinMarketCapAPI(apiKeys.coinMarketCap);
    console.log('✅ CoinMarketCap API key found');
  }

  // Fetch from CoinGecko
  try {
    const tokenId = TOKEN_ID_MAP[tokenSymbol.toUpperCase()] || tokenSymbol.toLowerCase();
    const geckoData = await coinGecko.getHistoricalData(tokenId, 'usd', days);
    results.data.coinGecko = geckoData;
    console.log(`✅ CoinGecko: Fetched ${geckoData.length} data points`);
    
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('❌ CoinGecko failed:', error);
    results.data.coinGecko = { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  // Fetch from CryptoCompare
  try {
    const compareData = await cryptoCompare.getHistoricalDaily(tokenSymbol, days);
    results.data.cryptoCompare = compareData;
    console.log(`✅ CryptoCompare: Fetched ${compareData.length} data points`);
    
    await new Promise(resolve => setTimeout(resolve, 1000));
  } catch (error) {
    console.error('❌ CryptoCompare failed:', error);
    results.data.cryptoCompare = { error: error instanceof Error ? error.message : 'Unknown error' };
  }

  // Fetch from CoinMarketCap if API key is available
  if (coinMarketCap) {
    try {
      const endDate = new Date();
      const startDate = new Date();
      startDate.setDate(endDate.getDate() - days);
      
      const cmcData = await coinMarketCap.getHistoricalQuotes(
        tokenSymbol,
        startDate.toISOString(),
        endDate.toISOString()
      );
      results.data.coinMarketCap = cmcData;
      console.log(`✅ CoinMarketCap: Fetched ${cmcData.length} data points`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('❌ CoinMarketCap failed:', error);
      results.data.coinMarketCap = { error: error instanceof Error ? error.message : 'Unknown error' };
    }
  }

  console.log('🎉 Process completed!');
  return results;
}

// Generate mock data for testing
export function generateMockData(days: number, basePrice: number, volatility: number): CryptoData[] {
  const data: CryptoData[] = [];
  const now = new Date();
  
  for (let i = days - 1; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    
    const randomChange = (Math.random() - 0.5) * volatility;
    const price = basePrice * (1 + randomChange);
    const high = price * (1 + Math.random() * 0.02);
    const low = price * (1 - Math.random() * 0.02);
    const open = price * (1 + (Math.random() - 0.5) * 0.01);
    
    data.push({
      timestamp: date.getTime(),
      date: date.toISOString().split('T')[0],
      price: price.toFixed(6),
      volume: Math.random() * 1000000 + 500000,
      market_cap: Math.random() * 1000000000 + 500000000,
      open: open.toFixed(6),
      high: high.toFixed(6),
      low: low.toFixed(6),
      close: price.toFixed(6)
    });
  }
  
  return data;
} 
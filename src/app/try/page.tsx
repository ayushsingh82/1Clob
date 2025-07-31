'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle, Zap, Shield, Globe, RefreshCw, DollarSign, BarChart3, Activity, Settings, Key } from "lucide-react";
import { fetchCryptoData, generateMockData, type CryptoData, type APIResponse, TOKEN_ID_MAP, testCryptoCompareAPI } from "@/lib/crypto-apis";

export default function TryPage() {
  const [tokenSymbol, setTokenSymbol] = useState('BTC');
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [useRealAPIs, setUseRealAPIs] = useState(true);
  const [apiKeys, setApiKeys] = useState({
    coinMarketCap: '',
    finnhub: '',
    alphaVantage: '',
    taapiIO: '',
    twelveData: ''
  });
  const [showApiSettings, setShowApiSettings] = useState(false);

  // Real API function
  const fetchRealCryptoData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`🔍 Fetching data for ${tokenSymbol} for ${days} days`);
      
      // Filter out empty API keys
      const validApiKeys = Object.fromEntries(
        Object.entries(apiKeys).filter(([_, value]) => value.trim() !== '')
      );
      
      const data = await fetchCryptoData(tokenSymbol, days, validApiKeys);
      setCryptoData(data);
    } catch (err) {
      console.error('API Error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch crypto data');
    } finally {
      setIsLoading(false);
    }
  };

  // Mock API function (fallback)
  const fetchMockCryptoData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock data for different APIs
      const basePrice = getBasePriceForToken(tokenSymbol);
      const mockData: APIResponse = {
        token: tokenSymbol,
        days: days,
        timestamp: new Date().toISOString(),
        data: {
          coinGecko: generateMockData(days, basePrice, 0.05),
          cryptoCompare: generateMockData(days, basePrice, 0.03),
          coinMarketCap: generateMockData(days, basePrice, 0.04),
          finnhub: generateMockData(days, basePrice, 0.06),
          alphaVantage: generateMockData(days, basePrice, 0.02),
          taapiIO: generateMockData(days, basePrice, 0.07),
          twelveData: generateMockData(days, basePrice, 0.05)
        }
      };
      
      setCryptoData(mockData);
    } catch (err) {
      setError('Failed to generate mock data');
    } finally {
      setIsLoading(false);
    }
  };

  const getBasePriceForToken = (token: string): number => {
    const priceMap: Record<string, number> = {
      'BTC': 45000,
      'ETH': 2800,
      'USDC': 1.00,
      'USDT': 1.00,
      'BNB': 320,
      'ADA': 0.45,
      'SOL': 95,
      'DOT': 7.5,
      'DOGE': 0.08,
      'AVAX': 35,
      'MATIC': 0.85,
      'LINK': 15,
      'UNI': 7.2,
      'LTC': 75,
      'XRP': 0.55,
      'BCH': 240,
      'ATOM': 8.5,
      'NEAR': 3.2,
      'FTM': 0.35,
      'ALGO': 0.18
    };
    return priceMap[token.toUpperCase()] || 100;
  };

  const handleFetchData = () => {
    if (useRealAPIs) {
      fetchRealCryptoData();
    } else {
      fetchMockCryptoData();
    }
  };

  const handleTestCryptoCompare = async () => {
    try {
      console.log('🧪 Testing CryptoCompare API...');
      const isWorking = await testCryptoCompareAPI();
      if (isWorking) {
        alert('✅ CryptoCompare API is working! Check console for details.');
      } else {
        alert('❌ CryptoCompare API test failed. Check console for details.');
      }
    } catch (error) {
      console.error('Test failed:', error);
      alert('❌ CryptoCompare API test failed. Check console for details.');
    }
  };

  const handleTokenInput = (value: string) => {
    const cleanValue = value.toUpperCase().replace(/[^A-Z0-9]/g, '');
    setTokenSymbol(cleanValue);
  };

  const getLatestPrice = (data: CryptoData[]) => {
    if (!data || data.length === 0) return null;
    return data[data.length - 1];
  };

  const getPriceChange = (data: CryptoData[]) => {
    if (!data || data.length < 2) return { change: 0, percentChange: 0 };
    
    const latest = data[data.length - 1];
    const previous = data[data.length - 2];
    
    const change = parseFloat(latest.price) - parseFloat(previous.price);
    const percentChange = (change / parseFloat(previous.price)) * 100;
    
    return { change, percentChange };
  };

  const formatPrice = (price: string) => {
    const num = parseFloat(price);
    if (num >= 1000) {
      return `$${num.toLocaleString()}`;
    }
    return `$${num.toFixed(2)}`;
  };

  const getApiStatus = (apiName: string, data: CryptoData[] | { error: string }) => {
    if ('error' in data) {
      return { status: 'error', message: data.error };
    }
    if (Array.isArray(data) && data.length > 0) {
      return { status: 'success', message: `${data.length} data points` };
    }
    return { status: 'warning', message: 'No data available' };
  };

  useEffect(() => {
    // Auto-fetch on component mount
    if (useRealAPIs) {
      fetchRealCryptoData();
    } else {
      fetchMockCryptoData();
    }
  }, []);

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D2818' }}>Crypto Data Analytics</h1>
          <p className="text-lg" style={{ color: '#0D2818' }}>Multi-API cryptocurrency data aggregation and analysis</p>
          <Badge variant="secondary" className="mt-2 text-xl" style={{ backgroundColor: '#6603BF', color: '#C6FC7B' }}>
            Powered by Multiple APIs
          </Badge>
        </div>

        {/* Controls */}
        <Card style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }} className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between" style={{ color: '#C6FC7B' }}>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5" style={{ color: '#C6FC7B' }} />
                Data Configuration
              </div>
              <Button
                size="sm"
                onClick={() => setShowApiSettings(!showApiSettings)}
                style={{ borderColor: '#C6FC7B', color: '#C6FC7B', border: '1px solid' }}
              >
                <Settings className="h-4 w-4 mr-2" />
                API Settings
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {showApiSettings && (
              <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Key className="h-4 w-4" style={{ color: '#122B1B' }} />
                  <h4 className="font-medium" style={{ color: '#122B1B' }}>API Configuration</h4>
                </div>
                <div className="grid md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <Label style={{ color: '#122B1B' }}>CoinMarketCap API Key</Label>
                    <Input
                      type="password"
                      value={apiKeys.coinMarketCap}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, coinMarketCap: e.target.value }))}
                      placeholder="Optional"
                      className="border-gray-700 placeholder-gray-400"
                      style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                    />
                  </div>
                  <div>
                    <Label style={{ color: '#122B1B' }}>Finnhub API Key</Label>
                    <Input
                      type="password"
                      value={apiKeys.finnhub}
                      onChange={(e) => setApiKeys(prev => ({ ...prev, finnhub: e.target.value }))}
                      placeholder="Optional"
                      className="border-gray-700 placeholder-gray-400"
                      style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Button
                    size="sm"
                    onClick={() => setUseRealAPIs(true)}
                    className={useRealAPIs ? 'bg-blue-100' : ''}
                    style={{ borderColor: '#122B1B', color: '#122B1B', border: '1px solid' }}
                  >
                    Use Real APIs
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => setUseRealAPIs(false)}
                    className={!useRealAPIs ? 'bg-blue-100' : ''}
                    style={{ borderColor: '#122B1B', color: '#122B1B', border: '1px solid' }}
                  >
                    Use Mock Data
                  </Button>
                  <Button
                    size="sm"
                    onClick={handleTestCryptoCompare}
                    style={{ backgroundColor: '#6603BF', color: '#C6FC7B' }}
                  >
                    Test CryptoCompare
                  </Button>
                </div>
              </div>
            )}

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label style={{ color: '#C6FC7B' }}>Token Symbol</Label>
                <Input
                  value={tokenSymbol}
                  onChange={(e) => handleTokenInput(e.target.value)}
                  placeholder="BTC"
                  className="border-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
                <p className="text-xs mt-1" style={{ color: '#C6FC7B' }}>
                  Supported: BTC, ETH, USDC, SOL, ADA, DOT, DOGE, AVAX, MATIC, LINK, UNI, LTC, XRP, BCH, ATOM, NEAR, FTM, ALGO
                </p>
              </div>
              <div>
                <Label style={{ color: '#C6FC7B' }}>Days</Label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 7)}
                  placeholder="7"
                  min="1"
                  max="365"
                  className="border-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={handleFetchData}
                  disabled={isLoading}
                  className="w-full"
                  style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
                >
                  {isLoading ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      Fetching...
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Fetch Data
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {error && (
          <Alert style={{ backgroundColor: '#ECEFEC', borderColor: '#122B1B' }} className="mb-6">
            <AlertTriangle className="h-4 w-4" style={{ color: '#122B1B' }} />
            <span style={{ color: '#122B1B' }}>{error}</span>
          </Alert>
        )}

        {cryptoData && (
          <>
            {/* Overview Cards */}
            <div className="grid md:grid-cols-4 gap-6 mb-6">
              {Object.entries(cryptoData.data).map(([apiName, data]) => {
                const status = getApiStatus(apiName, data);
                
                if (Array.isArray(data) && data.length > 0) {
                  const latest = getLatestPrice(data);
                  const { change, percentChange } = getPriceChange(data);
                  
                  return (
                    <Card key={apiName} style={{ backgroundColor: '#6603BF', borderColor: '#C6FC7B' }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold" style={{ color: '#C6FC7B' }}>
                            {apiName.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <Badge 
                            variant="outline" 
                            style={{ 
                              color: status.status === 'success' ? '#C6FC7B' : '#ff6b6b',
                              borderColor: status.status === 'success' ? '#C6FC7B' : '#ff6b6b'
                            }}
                          >
                            {status.message}
                          </Badge>
                        </div>
                        <div className="text-2xl font-bold mb-1" style={{ color: '#C6FC7B' }}>
                          {formatPrice(latest!.price)}
                        </div>
                        <div className={`text-sm ${percentChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}%
                        </div>
                        <div className="text-xs mt-1" style={{ color: '#C6FC7B' }}>
                          {latest!.date}
                        </div>
                      </CardContent>
                    </Card>
                  );
                } else if ('error' in data) {
                  return (
                    <Card key={apiName} style={{ backgroundColor: '#6603BF', borderColor: '#ff6b6b' }}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold" style={{ color: '#C6FC7B' }}>
                            {apiName.replace(/([A-Z])/g, ' $1').trim()}
                          </h3>
                          <Badge variant="outline" style={{ color: '#ff6b6b', borderColor: '#ff6b6b' }}>
                            Error
                          </Badge>
                        </div>
                        <div className="text-sm" style={{ color: '#ff6b6b' }}>
                          {data.error}
                        </div>
                      </CardContent>
                    </Card>
                  );
                }
                return null;
              })}
            </div>

            {/* Detailed Data Tabs */}
            <Card style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2" style={{ color: '#C6FC7B' }}>
                  <BarChart3 className="h-5 w-5" style={{ color: '#C6FC7B' }} />
                  Detailed Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-3" style={{ backgroundColor: '#ECEFEC' }}>
                    <TabsTrigger value="overview" className="text-gray-700 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Overview
                    </TabsTrigger>
                    <TabsTrigger value="price" className="text-gray-700 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Price Data
                    </TabsTrigger>
                    <TabsTrigger value="volume" className="text-gray-700 data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                      Volume Analysis
                    </TabsTrigger>
                  </TabsList>
                </Tabs>

                <div className="mt-6">
                  {activeTab === 'overview' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#C6FC7B' }}>API Comparison</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(cryptoData.data).map(([apiName, data]) => {
                          if (Array.isArray(data) && data.length > 0) {
                            const latest = getLatestPrice(data);
                            const { change, percentChange } = getPriceChange(data);
                            
                            return (
                              <div key={apiName} className="p-4 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-medium" style={{ color: '#122B1B' }}>
                                    {apiName.replace(/([A-Z])/g, ' $1').trim()}
                                  </h4>
                                  <Badge style={{ backgroundColor: '#122B1B', color: '#ECEFEC' }}>
                                    {data.length} records
                                  </Badge>
                                </div>
                                <div className="text-xl font-bold mb-1" style={{ color: '#122B1B' }}>
                                  {formatPrice(latest!.price)}
                                </div>
                                <div className={`text-sm ${percentChange >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  {percentChange >= 0 ? '+' : ''}{percentChange.toFixed(2)}% ({change >= 0 ? '+' : ''}${change.toFixed(2)})
                                </div>
                                <div className="text-xs mt-1" style={{ color: '#122B1B' }}>
                                  Volume: {latest!.volume?.toLocaleString() || 'N/A'}
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}

                  {activeTab === 'price' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#C6FC7B' }}>Price History</h3>
                      <div className="overflow-x-auto">
                        <table className="w-full" style={{ backgroundColor: '#ECEFEC' }}>
                          <thead>
                            <tr style={{ backgroundColor: '#122B1B' }}>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>API</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>Date</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>Open</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>High</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>Low</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>Close</th>
                              <th className="p-2 text-left" style={{ color: '#C6FC7B' }}>Volume</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Object.entries(cryptoData.data).map(([apiName, data]) => {
                              if (Array.isArray(data) && data.length > 0) {
                                return data.slice(-3).map((item, index) => (
                                  <tr key={`${apiName}-${index}`} className="border-b border-gray-300">
                                    <td className="p-2 font-medium" style={{ color: '#122B1B' }}>{apiName}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>{item.date}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>${item.open || item.price}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>${item.high || item.price}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>${item.low || item.price}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>${item.close || item.price}</td>
                                    <td className="p-2" style={{ color: '#122B1B' }}>{item.volume?.toLocaleString() || 'N/A'}</td>
                                  </tr>
                                ));
                              }
                              return null;
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {activeTab === 'volume' && (
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold" style={{ color: '#C6FC7B' }}>Volume Analysis</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {Object.entries(cryptoData.data).map(([apiName, data]) => {
                          if (Array.isArray(data) && data.length > 0) {
                            const totalVolume = data.reduce((sum, item) => sum + (item.volume || 0), 0);
                            const avgVolume = totalVolume / data.length;
                            const maxVolume = Math.max(...data.map(item => item.volume || 0));
                            
                            return (
                              <div key={apiName} className="p-4 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                                <h4 className="font-medium mb-3" style={{ color: '#122B1B' }}>
                                  {apiName.replace(/([A-Z])/g, ' $1').trim()} Volume Stats
                                </h4>
                                <div className="space-y-2">
                                  <div className="flex justify-between">
                                    <span style={{ color: '#122B1B' }}>Total Volume:</span>
                                    <span style={{ color: '#122B1B' }}>{totalVolume.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: '#122B1B' }}>Average Volume:</span>
                                    <span style={{ color: '#122B1B' }}>{avgVolume.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span style={{ color: '#122B1B' }}>Max Volume:</span>
                                    <span style={{ color: '#122B1B' }}>{maxVolume.toLocaleString()}</span>
                                  </div>
                                </div>
                              </div>
                            );
                          }
                          return null;
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </>
        )}

        {/* API Information */}
        <div className="mt-8">
          <div className="p-8 rounded-xl" style={{ backgroundColor: '#171717', borderColor: '#C6FC7B', borderWidth: '1px' }}>
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#C6FC7B' }}>Supported APIs</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#C6FC7B' }}>Free APIs</h3>
                  <ul className="space-y-2" style={{ color: '#ECEFEC' }}>
                    <li>• CoinGecko API</li>
                    <li>• CryptoCompare API</li>
                    <li>• TradingView Widgets</li>
                  </ul>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#C6FC7B' }}>Professional APIs</h3>
                  <ul className="space-y-2" style={{ color: '#ECEFEC' }}>
                    <li>• CoinMarketCap API</li>
                    <li>• Finnhub API</li>
                    <li>• Alpha Vantage API</li>
                    <li>• TaapiIO API</li>
                    <li>• Twelve Data API</li>
                  </ul>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4" style={{ color: '#C6FC7B' }}>Features</h3>
                  <ul className="space-y-2" style={{ color: '#ECEFEC' }}>
                    <li>• Historical price data</li>
                    <li>• Technical indicators</li>
                    <li>• Volume analysis</li>
                    <li>• Market cap data</li>
                    <li>• Real-time quotes</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

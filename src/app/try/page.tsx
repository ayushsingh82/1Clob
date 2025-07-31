'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Alert } from "@/components/ui/alert";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle, Zap, Shield, Globe, RefreshCw, DollarSign, BarChart3, Activity } from "lucide-react";

interface CryptoData {
  timestamp: number;
  date: string;
  price: string;
  volume?: number;
  market_cap?: number;
  open?: string;
  high?: string;
  low?: string;
  close?: string;
}

interface APIResponse {
  token: string;
  days: number;
  timestamp: string;
  data: {
    [key: string]: CryptoData[] | { error: string };
  };
}

export default function TryPage() {
  const [tokenSymbol, setTokenSymbol] = useState('BTC');
  const [days, setDays] = useState(7);
  const [isLoading, setIsLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState<APIResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('overview');

  // Mock API functions (in real app, these would call your backend)
  const fetchCryptoData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock data structure
      const mockData: APIResponse = {
        token: tokenSymbol,
        days: days,
        timestamp: new Date().toISOString(),
        data: {
          coinGecko: generateMockData(days, 2456.78, 0.05),
          cryptoCompare: generateMockData(days, 2456.78, 0.03),
          // Add more mock APIs as needed
        }
      };
      
      setCryptoData(mockData);
    } catch (err) {
      setError('Failed to fetch crypto data');
    } finally {
      setIsLoading(false);
    }
  };

  const generateMockData = (days: number, basePrice: number, volatility: number): CryptoData[] => {
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
  };

  useEffect(() => {
    fetchCryptoData();
  }, []);

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
            <CardTitle className="flex items-center gap-2" style={{ color: '#C6FC7B' }}>
              <Target className="h-5 w-5" style={{ color: '#C6FC7B' }} />
              Data Configuration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <Label style={{ color: '#C6FC7B' }}>Token Symbol</Label>
                <Input
                  value={tokenSymbol}
                  onChange={(e) => setTokenSymbol(e.target.value.toUpperCase())}
                  placeholder="BTC"
                  className="border-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <Label style={{ color: '#C6FC7B' }}>Days</Label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 7)}
                  placeholder="7"
                  className="border-gray-700 placeholder-gray-400"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div className="flex items-end">
                <Button
                  onClick={fetchCryptoData}
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
                          <Badge variant="outline" style={{ color: '#C6FC7B', borderColor: '#C6FC7B' }}>
                            {data.length} points
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
                                return data.slice(-5).map((item, index) => (
                                  <tr key={`${apiName}-${index}`} className="border-b border-gray-300">
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

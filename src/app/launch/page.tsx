"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Brain, Target, CheckCircle, Shield, Search } from "lucide-react"
import { fetchCryptoData, TOKEN_ID_MAP } from "@/lib/crypto-apis"

interface AIAnalysis {
  suggestion: "buy" | "sell" | "hold"
  confidence: number
  suggestedPrice: number
  reasoning: string[]
  technicalIndicators: {
    support: number
    resistance: number
    ema50: number
    ema200: number
    rsi: number
  }
  riskLevel: "low" | "medium" | "high"
}

interface MarketData {
  symbol: string
  currentPrice: number
  change24h: number
  volume24h: number
  high24h: number
  low24h: number
}

interface Token {
  symbol: string
  name: string
}

export default function LaunchPage() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)
  const [selectedToken, setSelectedToken] = useState("ETH")
  const [customToken, setCustomToken] = useState("")
  const [isLoadingToken, setIsLoadingToken] = useState(false)
  const [marketData, setMarketData] = useState<MarketData>({
    symbol: "ETH/USDC",
    currentPrice: 2456.78,
    change24h: 3.24,
    volume24h: 1250000,
    high24h: 2489.12,
    low24h: 2398.45,
  })

  // Available tokens (symbols only)
  const tokens: Token[] = [
    { symbol: "ETH", name: "Ethereum" },
    { symbol: "BTC", name: "Bitcoin" },
    { symbol: "SOL", name: "Solana" },
    { symbol: "HYPE", name: "Hype Protocol" },
    { symbol: "OP", name: "Optimism" },
    { symbol: "APT", name: "Aptos" },
  ]

  // Fetch token data using the same function as /price page
  const fetchTokenData = async (tokenSymbol: string) => {
    setIsLoadingToken(true)
    try {
      console.log(`🔍 Fetching data for ${tokenSymbol} using crypto-apis...`)
      
      // First, get current market data with 24h high/low from CoinGecko simple API
      let currentMarketData = null
      try {
        const tokenId = TOKEN_ID_MAP[tokenSymbol.toUpperCase()] || tokenSymbol.toLowerCase()
        const marketResponse = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${tokenId}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true&include_24hr_high=true&include_24hr_low=true`)
        const marketData = await marketResponse.json()
        currentMarketData = marketData[tokenId]
        console.log(`📊 Current market data for ${tokenSymbol}:`, currentMarketData)
      } catch (error) {
        console.log(`⚠️ Could not fetch current market data for ${tokenSymbol}:`, error)
      }
      
      // Use the same fetchCryptoData function that works in /price page
      const cryptoData = await fetchCryptoData(tokenSymbol, 7, {})
      
      // Extract the latest price from CoinGecko data (most reliable)
      if (cryptoData.data.coinGecko && Array.isArray(cryptoData.data.coinGecko) && cryptoData.data.coinGecko.length > 0) {
        const latestData = cryptoData.data.coinGecko[cryptoData.data.coinGecko.length - 1]
        const previousData = cryptoData.data.coinGecko[cryptoData.data.coinGecko.length - 2]
        
        const currentPrice = parseFloat(latestData.price)
        const previousPrice = previousData ? parseFloat(previousData.price) : currentPrice
        const change24h = ((currentPrice - previousPrice) / previousPrice) * 100
        
        // Use current market data for 24h high/low if available, otherwise calculate from historical data
        let high24h, low24h
        if (currentMarketData && currentMarketData.usd_24h_high && currentMarketData.usd_24h_low) {
          high24h = currentMarketData.usd_24h_high
          low24h = currentMarketData.usd_24h_low
          console.log(`✅ Using current market data for 24h high/low: ${low24h} - ${high24h}`)
        } else {
          // Fallback: calculate from historical data
          const allPrices = cryptoData.data.coinGecko.map(d => parseFloat(d.price))
          high24h = Math.max(...allPrices)
          low24h = Math.min(...allPrices)
          console.log(`⚠️ Using historical data for 24h high/low: ${low24h} - ${high24h}`)
        }
        
        setMarketData({
          symbol: `${tokenSymbol}/USDC`,
          currentPrice: currentPrice,
          change24h: change24h,
          volume24h: latestData.volume || currentMarketData?.usd_24h_vol || 1000000,
          high24h: high24h,
          low24h: low24h,
        })
        
        console.log(`✅ Successfully fetched ${tokenSymbol} data:`, {
          price: currentPrice,
          change: change24h,
          volume: latestData.volume || currentMarketData?.usd_24h_vol,
          high: high24h,
          low: low24h
        })
      } else {
        // Fallback to CryptoCompare data if CoinGecko fails
        if (cryptoData.data.cryptoCompare && Array.isArray(cryptoData.data.cryptoCompare) && cryptoData.data.cryptoCompare.length > 0) {
          const latestData = cryptoData.data.cryptoCompare[cryptoData.data.cryptoCompare.length - 1]
          const currentPrice = parseFloat(latestData.price)
          
          // Use current market data for 24h high/low if available
          let high24h, low24h
          if (currentMarketData && currentMarketData.usd_24h_high && currentMarketData.usd_24h_low) {
            high24h = currentMarketData.usd_24h_high
            low24h = currentMarketData.usd_24h_low
          } else {
            // Fallback: calculate from historical data
            const allPrices = cryptoData.data.cryptoCompare.map(d => parseFloat(d.price))
            high24h = Math.max(...allPrices)
            low24h = Math.min(...allPrices)
          }
          
          setMarketData({
            symbol: `${tokenSymbol}/USDC`,
            currentPrice: currentPrice,
            change24h: 0, // CryptoCompare doesn't provide 24h change in this format
            volume24h: latestData.volume || currentMarketData?.usd_24h_vol || 1000000,
            high24h: high24h,
            low24h: low24h,
          })
          
          console.log(`✅ Used CryptoCompare fallback for ${tokenSymbol}:`, {
            price: currentPrice,
            high: high24h,
            low: low24h
          })
        } else {
          // Final fallback to default data
          console.log(`⚠️ No API data available for ${tokenSymbol}, using default`)
          setMarketData({
            symbol: `${tokenSymbol}/USDC`,
            currentPrice: 100,
            change24h: 0,
            volume24h: 1000000,
            high24h: 110,
            low24h: 90,
          })
        }
      }
    } catch (error) {
      console.error("Error fetching token data:", error)
      // Fallback to default data
      setMarketData({
        symbol: `${tokenSymbol}/USDC`,
        currentPrice: 100,
        change24h: 0,
        volume24h: 1000000,
        high24h: 110,
        low24h: 90,
      })
    } finally {
      setIsLoadingToken(false)
    }
  }

  // Handle custom token input
  const handleCustomTokenSubmit = async () => {
    if (customToken.trim()) {
      setSelectedToken(customToken.toUpperCase())
      setAiAnalysis(null) // Clear AI analysis when token changes
      // Try to fetch data for the custom token
      await fetchTokenData(customToken.toUpperCase())
    }
  }

  // Handle predefined token selection
  const handleTokenSelect = async (tokenSymbol: string) => {
    setSelectedToken(tokenSymbol)
    setCustomToken("")
    setAiAnalysis(null) // Clear AI analysis when token changes
    
    // Fetch real data using the same method as /price page
    await fetchTokenData(tokenSymbol)
  }

  // Simulate AI analysis when buy button is clicked (removed old useEffect)
  // AI analysis now triggers only when handlePlaceOrder is called

  const generateSuggestedPrice = (targetPrice: number, currentPrice: number): number => {
    const diff = Math.abs(targetPrice - currentPrice)
    const adjustment = diff * 0.1 // Suggest 10% closer to optimal
    return targetPrice > currentPrice ? targetPrice - adjustment : targetPrice + adjustment
  }

  const generateReasoning = (targetPrice: number, currentPrice: number): string[] => {
    const reasons = []
    const support = currentPrice * 0.985
    const resistance = currentPrice * 1.015
    const ema50 = currentPrice * 0.995

    if (targetPrice < support) {
      reasons.push(`Your order is below strong 4H support at $${support.toFixed(2)} - high probability of fill`)
    } else if (targetPrice > resistance) {
      reasons.push(`Your order is above 1D resistance at $${resistance.toFixed(2)} - consider lower entry`)
    }

    if (targetPrice > ema50) {
      reasons.push(`Price is above EMA-50 ($${ema50.toFixed(2)}) indicating bullish momentum`)
    }

    reasons.push("RSI at 67.5 suggests slight overbought conditions")
    reasons.push("24H volume is 25% above average - increased volatility expected")

    return reasons
  }

  const handlePlaceOrder = () => {
    // Trigger AI analysis when buy button is clicked
    if (amount && Number.parseFloat(amount) > 0) {
      setIsAnalyzing(true)

      // Simulate API call delay
      setTimeout(() => {
        const orderAmount = Number.parseFloat(amount)
        const currentPrice = marketData.currentPrice

        // Generate AI analysis based on order amount and current market
        const analysis: AIAnalysis = {
          suggestion: orderAmount > 0 ? "buy" : "hold",
          confidence: Math.random() * 40 + 60, // 60-100%
          suggestedPrice: generateSuggestedPrice(currentPrice, currentPrice),
          reasoning: generateReasoning(currentPrice, currentPrice),
          technicalIndicators: {
            support: currentPrice * 0.985,
            resistance: currentPrice * 1.015,
            ema50: currentPrice * 0.995,
            ema200: currentPrice * 0.975,
            rsi: 67.5,
          },
          riskLevel: "medium",
        }

        setAiAnalysis(analysis)
        setIsAnalyzing(false)
      }, 1500)
    }

    // In real app, this would integrate with 1inch Limit Order API
    alert("Buy order placed successfully! (Demo mode)")
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D2818' }}>1Clob</h1>
          <p className="text-lg" style={{ color: '#0D2818' }}>Advanced DEX trading experience with AI-powered insights and CLOB technology</p>
          <Badge variant="secondary" className="mt-2 text-xl" style={{ backgroundColor: '#6603BF', color: '#C6FC7B' }}>
            Powered by 1inch clob apis
          </Badge>
        </div>

        <div className="flex gap-6">
          {/* Token Sidebar */}
          <div className="w-64 flex-shrink-0">
            <Card style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
              <CardHeader>
                <CardTitle style={{ color: '#C6FC7B' }}>Select Token</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Custom Token Input */}
                <div>
                  <Label style={{ color: '#C6FC7B' }}>Custom Token</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      placeholder="Enter token name"
                      value={customToken}
                      onChange={(e) => setCustomToken(e.target.value)}
                      className="flex-1"
                      style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                    />
                    <Button
                      onClick={handleCustomTokenSubmit}
                      disabled={!customToken.trim() || isLoadingToken}
                      size="sm"
                      style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
                    >
                      {isLoadingToken ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: '#122B1B' }}></div>
                      ) : (
                        <Search className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Predefined Tokens */}
                <div>
                  <Label style={{ color: '#C6FC7B' }}>Popular Tokens</Label>
                  <div className="space-y-2 mt-1">
                    {tokens.map((token) => (
                      <div
                        key={token.symbol}
                        onClick={() => handleTokenSelect(token.symbol)}
                        className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                          selectedToken === token.symbol && !customToken
                            ? 'border-2' 
                            : 'border border-transparent'
                        }`}
                        style={{ 
                          backgroundColor: selectedToken === token.symbol && !customToken ? '#ECEFEC' : 'transparent',
                          borderColor: selectedToken === token.symbol && !customToken ? '#C6FC7B' : 'transparent'
                        }}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold" style={{ color: selectedToken === token.symbol && !customToken ? '#122B1B' : '#C6FC7B' }}>
                              {token.symbol}
                            </div>
                            <div className="text-sm opacity-75" style={{ color: selectedToken === token.symbol && !customToken ? '#122B1B' : '#C6FC7B' }}>
                              {token.name}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Selection */}
                {selectedToken && (
                  <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                    <div className="text-sm font-medium mb-1" style={{ color: '#122B1B' }}>Current Token</div>
                    <div className="font-semibold" style={{ color: '#122B1B' }}>
                      {selectedToken}/USDC
                    </div>
                    {isLoadingToken && (
                      <div className="text-xs mt-1" style={{ color: '#122B1B' }}>
                        Loading data...
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Main Trading Interface */}
          <div className="flex-1">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Order Form */}
              <Card style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#C6FC7B' }}>
                    <Target className="h-5 w-5" style={{ color: '#C6FC7B' }} />
                    Place Limit Order
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Market Info */}
                  <div className="p-4 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-lg" style={{ color: '#122B1B' }}>{marketData.symbol}</span>
                      <div className="text-right">
                        <div className="text-2xl font-bold" style={{ color: '#122B1B' }}>${marketData.currentPrice.toLocaleString()}</div>
                        <div className={`text-sm ${marketData.change24h >= 0 ? "text-green-600" : "text-red-600"}`}>
                          {marketData.change24h >= 0 ? "+" : ""}
                          {marketData.change24h.toFixed(2)}%
                        </div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm" style={{ color: '#122B1B' }}>
                      <div>24H High: ${marketData.high24h.toLocaleString()}</div>
                      <div>24H Low: ${marketData.low24h.toLocaleString()}</div>
                    </div>
                  </div>

                  {/* Order Type */}
                  <div>
                    <Label style={{ color: '#C6FC7B' }}>Order Type</Label>
                    <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
                      <TabsList className="grid w-full grid-cols-2" style={{ backgroundColor: '#ECEFEC' }}>
                        <TabsTrigger value="buy" className="text-green-600 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                          Buy
                        </TabsTrigger>
                        <TabsTrigger value="sell" className="text-red-600 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                          Sell
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>

                  {/* Amount */}
                  <div>
                    <Label htmlFor="amount" style={{ color: '#C6FC7B' }}>Price ({selectedToken})</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                      className="border-gray-700 placeholder-gray-400"
                      style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                    />
                  </div>

                  {/* Price */}
                  <div>
                    <Label htmlFor="price" style={{ color: '#C6FC7B' }}>Limit Price (USDC)</Label>
                    <Input
                      id="price"
                      type="number"
                      placeholder="0.0"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                      className="border-gray-700 placeholder-gray-400"
                      style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                    />
                  </div>

                  <Button
                    onClick={handlePlaceOrder}
                    className="w-full text-white"
                    style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
                    size="lg"
                    disabled={!amount || !price || isAnalyzing}
                  >
                    Place Buy Order
                  </Button>
                </CardContent>
              </Card>

              {/* AI Analysis */}
              <Card style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2" style={{ color: '#C6FC7B' }}>
                    <Brain className="h-5 w-5" style={{ color: '#C6FC7B' }} />
                    AI Trading Assistant
                    {isAnalyzing && (
                      <div className="ml-auto">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2" style={{ borderColor: '#C6FC7B' }}></div>
                      </div>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {!aiAnalysis && !isAnalyzing ? (
                    <div className="text-center py-8" style={{ color: '#C6FC7B' }}>
                      <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" style={{ color: '#C6FC7B' }} />
                      <p>Click &quot;Place Buy Order&quot; to get AI-powered analysis</p>
                    </div>
                  ) : isAnalyzing ? (
                    <div className="text-center py-8">
                      <div className="animate-pulse">
                        <Brain className="h-12 w-12 mx-auto mb-4" style={{ color: '#C6FC7B' }} />
                        <p style={{ color: '#C6FC7B' }}>Analyzing market conditions...</p>
                      </div>
                    </div>
                  ) : aiAnalysis ? (
                    <div className="space-y-4">
                      {/* AI Suggestion */}
                      <Alert
                        className={`border-l-4 ${
                          aiAnalysis.suggestion === "buy"
                            ? "border-green-500"
                            : aiAnalysis.suggestion === "sell"
                              ? "border-red-500"
                              : "border-yellow-500"
                        }`}
                        style={{ backgroundColor: '#ECEFEC' }}
                      >
                        <div className="flex items-center gap-2">
                          {aiAnalysis.suggestion === "buy" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : aiAnalysis.suggestion === "sell" ? (
                            <TrendingDown className="h-4 w-4 text-red-600" />
                          ) : (
                            <Shield className="h-4 w-4 text-yellow-600" />
                          )}
                          <div>
                            <div className="font-semibold" style={{ color: '#122B1B' }}>
                              {aiAnalysis.suggestion === "buy" ? "BUY" : aiAnalysis.suggestion === "sell" ? "SELL" : "HOLD"}
                            </div>
                            <div className="text-sm" style={{ color: '#122B1B' }}>
                              Confidence: {aiAnalysis.confidence.toFixed(1)}%
                            </div>
                          </div>
                        </div>
                      </Alert>

                      {/* Suggested Price */}
                      <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                        <div className="text-sm font-medium mb-1" style={{ color: '#122B1B' }}>Suggested Entry Price</div>
                        <div className="text-lg font-bold" style={{ color: '#122B1B' }}>
                          ${aiAnalysis.suggestedPrice.toFixed(2)}
                        </div>
                      </div>

                      {/* Risk Level */}
                      <div className="flex items-center gap-2">
                        <div className="text-sm font-medium" style={{ color: '#C6FC7B' }}>Risk Level:</div>
                        <Badge
                          className={`${
                            aiAnalysis.riskLevel === "low"
                              ? "bg-green-100 text-green-800"
                              : aiAnalysis.riskLevel === "medium"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {aiAnalysis.riskLevel.toUpperCase()}
                        </Badge>
                      </div>

                      {/* Technical Indicators */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                          <div className="text-xs opacity-75" style={{ color: '#122B1B' }}>Support</div>
                          <div className="font-semibold" style={{ color: '#122B1B' }}>
                            ${aiAnalysis.technicalIndicators.support.toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                          <div className="text-xs opacity-75" style={{ color: '#122B1B' }}>Resistance</div>
                          <div className="font-semibold" style={{ color: '#122B1B' }}>
                            ${aiAnalysis.technicalIndicators.resistance.toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                          <div className="text-xs opacity-75" style={{ color: '#122B1B' }}>EMA-50</div>
                          <div className="font-semibold" style={{ color: '#122B1B' }}>
                            ${aiAnalysis.technicalIndicators.ema50.toFixed(2)}
                          </div>
                        </div>
                        <div className="p-3 rounded-lg" style={{ backgroundColor: '#ECEFEC' }}>
                          <div className="text-xs opacity-75" style={{ color: '#122B1B' }}>RSI</div>
                          <div className="font-semibold" style={{ color: '#122B1B' }}>
                            {aiAnalysis.technicalIndicators.rsi.toFixed(1)}
                          </div>
                        </div>
                      </div>

                      {/* Reasoning */}
                      <div>
                        <div className="text-sm font-medium mb-2" style={{ color: '#C6FC7B' }}>AI Analysis</div>
                        <div className="space-y-2">
                          {aiAnalysis.reasoning.map((reason, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: '#10B981' }} />
                              <div className="text-sm" style={{ color: '#C6FC7B' }}>{reason}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : null}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 
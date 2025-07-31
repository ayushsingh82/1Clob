"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Alert } from "@/components/ui/alert"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { TrendingUp, TrendingDown, Brain, Target, AlertTriangle, CheckCircle, Zap, Shield, Globe } from "lucide-react"

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

export default function LaunchPage() {
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy")
  const [amount, setAmount] = useState("")
  const [price, setPrice] = useState("")
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysis | null>(null)

  // Mock market data - in real app, this would come from 1inch API
  const [marketData] = useState<MarketData>({
    symbol: "ETH/USDC",
    currentPrice: 2456.78,
    change24h: 3.24,
    volume24h: 1250000,
    high24h: 2489.12,
    low24h: 2398.45,
  })

  // Simulate AI analysis when price changes
  useEffect(() => {
    if (price && Number.parseFloat(price) > 0) {
      setIsAnalyzing(true)

      // Simulate API call delay
      setTimeout(() => {
        const targetPrice = Number.parseFloat(price)
        const currentPrice = marketData.currentPrice

        // Mock AI analysis based on price input
        const analysis: AIAnalysis = {
          suggestion: targetPrice < currentPrice ? "buy" : "sell",
          confidence: Math.random() * 40 + 60, // 60-100%
          suggestedPrice: generateSuggestedPrice(targetPrice, currentPrice),
          reasoning: generateReasoning(targetPrice, currentPrice),
          technicalIndicators: {
            support: 2420.5,
            resistance: 2485.3,
            ema50: 2445.2,
            ema200: 2398.8,
            rsi: 67.5,
          },
          riskLevel: Math.abs(targetPrice - currentPrice) / currentPrice > 0.05 ? "high" : "medium",
        }

        setAiAnalysis(analysis)
        setIsAnalyzing(false)
      }, 1500)
    } else {
      setAiAnalysis(null)
    }
  }, [price, marketData.currentPrice])

  const generateSuggestedPrice = (targetPrice: number, currentPrice: number): number => {
    const diff = Math.abs(targetPrice - currentPrice)
    const adjustment = diff * 0.1 // Suggest 10% closer to optimal
    return targetPrice > currentPrice ? targetPrice - adjustment : targetPrice + adjustment
  }

  const generateReasoning = (targetPrice: number, currentPrice: number): string[] => {
    const reasons = []

    if (targetPrice < 2420.5) {
      reasons.push("Your order is below strong 4H support at $2,420.50 - high probability of fill")
    } else if (targetPrice > 2485.3) {
      reasons.push("Your order is above 1D resistance at $2,485.30 - consider lower entry")
    }

    if (targetPrice > 2445.2) {
      reasons.push("Price is above EMA-50 ($2,445.20) indicating bullish momentum")
    }

    reasons.push("RSI at 67.5 suggests slight overbought conditions")
    reasons.push("24H volume is 25% above average - increased volatility expected")

    return reasons
  }

  const handlePlaceOrder = () => {
    // In real app, this would integrate with 1inch Limit Order API
    alert("Order placed successfully! (Demo mode)")
  }

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2" style={{ color: '#0D2818' }}>1inch Trading Platform</h1>
          <p className="text-lg" style={{ color: '#0D2818' }}>Advanced DEX trading with AI-powered insights and CLOB technology</p>
          <Badge variant="secondary" className="mt-2" style={{ backgroundColor: '#6603BF', color: '#C6FC7B' }}>
            Powered by 1inch DEX Aggregator
          </Badge>
        </div>

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
                      {marketData.change24h}%
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
                <Label htmlFor="amount" style={{ color: '#C6FC7B' }}>Amount (ETH)</Label>
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
                {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
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
              {!price ? (
                <div className="text-center py-8" style={{ color: '#C6FC7B' }}>
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" style={{ color: '#C6FC7B' }} />
                  <p>Enter a limit price to get AI-powered suggestions</p>
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
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-600" />
                      )}
                      <span className="font-semibold" style={{ color: '#122B1B' }}>AI Suggests: {aiAnalysis.suggestion.toUpperCase()}</span>
                      <Badge variant="outline" style={{ color: '#122B1B', borderColor: '#122B1B' }}>{Math.round(aiAnalysis.confidence)}% confidence</Badge>
                    </div>
                  </Alert>

                  {/* Suggested Price */}
                  <div className="p-4 rounded-lg border" style={{ backgroundColor: '#ECEFEC', borderColor: '#122B1B' }}>
                    <div className="flex items-center justify-between">
                      <span className="font-medium" style={{ color: '#122B1B' }}>Suggested Price:</span>
                      <span className="text-xl font-bold" style={{ color: '#6603BF' }}>
                        ${aiAnalysis.suggestedPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm mt-1" style={{ color: '#122B1B' }}>
                      {Math.abs(Number.parseFloat(price) - aiAnalysis.suggestedPrice) > 1
                        ? `Consider adjusting by $${Math.abs(Number.parseFloat(price) - aiAnalysis.suggestedPrice).toFixed(2)}`
                        : "Your price looks good!"}
                    </p>
                  </div>

                  {/* Technical Indicators */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="p-3 rounded" style={{ backgroundColor: '#ECEFEC' }}>
                      <div className="font-medium" style={{ color: '#122B1B' }}>Support</div>
                      <div className="text-green-600">${aiAnalysis.technicalIndicators.support}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#ECEFEC' }}>
                      <div className="font-medium" style={{ color: '#122B1B' }}>Resistance</div>
                      <div className="text-red-600">${aiAnalysis.technicalIndicators.resistance}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#ECEFEC' }}>
                      <div className="font-medium" style={{ color: '#122B1B' }}>EMA-50</div>
                      <div style={{ color: '#122B1B' }}>${aiAnalysis.technicalIndicators.ema50}</div>
                    </div>
                    <div className="p-3 rounded" style={{ backgroundColor: '#ECEFEC' }}>
                      <div className="font-medium" style={{ color: '#122B1B' }}>RSI</div>
                      <div
                        className={
                          aiAnalysis.technicalIndicators.rsi > 70
                            ? "text-red-600"
                            : aiAnalysis.technicalIndicators.rsi < 30
                              ? "text-green-600"
                              : ""
                        }
                        style={aiAnalysis.technicalIndicators.rsi <= 70 && aiAnalysis.technicalIndicators.rsi >= 30 ? { color: '#122B1B' } : {}}
                      >
                        {aiAnalysis.technicalIndicators.rsi}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div
                    className={`p-3 rounded-lg ${
                      aiAnalysis.riskLevel === "low"
                        ? "border-green-800"
                        : aiAnalysis.riskLevel === "medium"
                          ? "border-yellow-800"
                          : "border-red-800"
                    }`}
                    style={{ backgroundColor: '#ECEFEC', borderWidth: '1px' }}
                  >
                    <div className="flex items-center gap-2">
                      {aiAnalysis.riskLevel === "low" ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      )}
                      <span className="font-medium" style={{ color: '#122B1B' }}>Risk Level: {aiAnalysis.riskLevel.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div>
                    <h4 className="font-medium mb-2" style={{ color: '#C6FC7B' }}>AI Analysis:</h4>
                    <ul className="space-y-1 text-sm">
                      {aiAnalysis.reasoning.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="mt-1" style={{ color: '#ECEFEC' }}>•</span>
                          <span style={{ color: '#ECEFEC' }}>{reason}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : null}
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <Card style={{ backgroundColor: '#7CE8A5', borderColor: '#08130C' }}>
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3" style={{ color: '#08130C' }} />
              <h3 className="font-semibold mb-2" style={{ color: '#08130C' }}>DEX Aggregation</h3>
              <p className="text-sm" style={{ color: '#08130C' }}>
                Access liquidity from hundreds of DEXes across multiple chains with optimal routing
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#C6FC7B', borderColor: '#122B1B' }}>
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3" style={{ color: '#122B1B' }} />
              <h3 className="font-semibold mb-2" style={{ color: '#122B1B' }}>CLOB Technology</h3>
              <p className="text-sm" style={{ color: '#122B1B' }}>
                Professional-grade trading with Central Limit Order Book for advanced order management
              </p>
            </CardContent>
          </Card>

          <Card style={{ backgroundColor: '#ECEFEC', borderColor: '#08130C' }}>
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-3" style={{ color: '#08130C' }} />
              <h3 className="font-semibold mb-2" style={{ color: '#08130C' }}>Cross-Chain</h3>
              <p className="text-sm" style={{ color: '#08130C' }}>
                Trade seamlessly across multiple blockchains with unified interface and settlement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
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
    <div className="min-h-screen bg-black p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">1inch Trading Platform</h1>
          <p className="text-lg text-gray-300">Advanced DEX trading with AI-powered insights and CLOB technology</p>
          <Badge variant="secondary" className="mt-2 bg-blue-600 text-white">
            Powered by 1inch DEX Aggregator
          </Badge>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Order Form */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Target className="h-5 w-5 text-blue-400" />
                Place Limit Order
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Market Info */}
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold text-lg text-white">{marketData.symbol}</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-white">${marketData.currentPrice.toLocaleString()}</div>
                    <div className={`text-sm ${marketData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}>
                      {marketData.change24h >= 0 ? "+" : ""}
                      {marketData.change24h}%
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>24H High: ${marketData.high24h.toLocaleString()}</div>
                  <div>24H Low: ${marketData.low24h.toLocaleString()}</div>
                </div>
              </div>

              {/* Order Type */}
              <div>
                <Label className="text-white">Order Type</Label>
                <Tabs value={orderType} onValueChange={(value) => setOrderType(value as "buy" | "sell")}>
                  <TabsList className="grid w-full grid-cols-2 bg-gray-800">
                    <TabsTrigger value="buy" className="text-green-400 data-[state=active]:bg-green-600 data-[state=active]:text-white">
                      Buy
                    </TabsTrigger>
                    <TabsTrigger value="sell" className="text-red-400 data-[state=active]:bg-red-600 data-[state=active]:text-white">
                      Sell
                    </TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>

              {/* Amount */}
              <div>
                <Label htmlFor="amount" className="text-white">Amount (ETH)</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              {/* Price */}
              <div>
                <Label htmlFor="price" className="text-white">Limit Price (USDC)</Label>
                <Input
                  id="price"
                  type="number"
                  placeholder="0.0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
                />
              </div>

              <Button
                onClick={handlePlaceOrder}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                size="lg"
                disabled={!amount || !price || isAnalyzing}
              >
                {orderType === "buy" ? "Place Buy Order" : "Place Sell Order"}
              </Button>
            </CardContent>
          </Card>

          {/* AI Analysis */}
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <Brain className="h-5 w-5 text-purple-400" />
                AI Trading Assistant
                {isAnalyzing && (
                  <div className="ml-auto">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-400"></div>
                  </div>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {!price ? (
                <div className="text-center py-8 text-gray-400">
                  <Brain className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Enter a limit price to get AI-powered suggestions</p>
                </div>
              ) : isAnalyzing ? (
                <div className="text-center py-8">
                  <div className="animate-pulse">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-purple-400" />
                    <p className="text-gray-400">Analyzing market conditions...</p>
                  </div>
                </div>
              ) : aiAnalysis ? (
                <div className="space-y-4">
                  {/* AI Suggestion */}
                  <Alert
                    className={`border-l-4 ${
                      aiAnalysis.suggestion === "buy"
                        ? "border-green-500 bg-green-900/20"
                        : aiAnalysis.suggestion === "sell"
                          ? "border-red-500 bg-red-900/20"
                          : "border-yellow-500 bg-yellow-900/20"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {aiAnalysis.suggestion === "buy" ? (
                        <TrendingUp className="h-4 w-4 text-green-400" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-red-400" />
                      )}
                      <span className="font-semibold text-white">AI Suggests: {aiAnalysis.suggestion.toUpperCase()}</span>
                      <Badge variant="outline" className="text-white border-gray-600">{Math.round(aiAnalysis.confidence)}% confidence</Badge>
                    </div>
                  </Alert>

                  {/* Suggested Price */}
                  <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-800">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-white">Suggested Price:</span>
                      <span className="text-xl font-bold text-blue-400">
                        ${aiAnalysis.suggestedPrice.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mt-1">
                      {Math.abs(Number.parseFloat(price) - aiAnalysis.suggestedPrice) > 1
                        ? `Consider adjusting by $${Math.abs(Number.parseFloat(price) - aiAnalysis.suggestedPrice).toFixed(2)}`
                        : "Your price looks good!"}
                    </p>
                  </div>

                  {/* Technical Indicators */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="font-medium text-white">Support</div>
                      <div className="text-green-400">${aiAnalysis.technicalIndicators.support}</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="font-medium text-white">Resistance</div>
                      <div className="text-red-400">${aiAnalysis.technicalIndicators.resistance}</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="font-medium text-white">EMA-50</div>
                      <div className="text-gray-300">${aiAnalysis.technicalIndicators.ema50}</div>
                    </div>
                    <div className="bg-gray-800 p-3 rounded">
                      <div className="font-medium text-white">RSI</div>
                      <div
                        className={
                          aiAnalysis.technicalIndicators.rsi > 70
                            ? "text-red-400"
                            : aiAnalysis.technicalIndicators.rsi < 30
                              ? "text-green-400"
                              : "text-gray-300"
                        }
                      >
                        {aiAnalysis.technicalIndicators.rsi}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div
                    className={`p-3 rounded-lg ${
                      aiAnalysis.riskLevel === "low"
                        ? "bg-green-900/20 border border-green-800"
                        : aiAnalysis.riskLevel === "medium"
                          ? "bg-yellow-900/20 border border-yellow-800"
                          : "bg-red-900/20 border border-red-800"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      {aiAnalysis.riskLevel === "low" ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <AlertTriangle className="h-4 w-4 text-yellow-400" />
                      )}
                      <span className="font-medium text-white">Risk Level: {aiAnalysis.riskLevel.toUpperCase()}</span>
                    </div>
                  </div>

                  {/* AI Reasoning */}
                  <div>
                    <h4 className="font-medium mb-2 text-white">AI Analysis:</h4>
                    <ul className="space-y-1 text-sm">
                      {aiAnalysis.reasoning.map((reason, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-purple-400 mt-1">•</span>
                          <span className="text-gray-300">{reason}</span>
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
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2 text-white">DEX Aggregation</h3>
              <p className="text-sm text-gray-400">
                Access liquidity from hundreds of DEXes across multiple chains with optimal routing
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-3 text-green-400" />
              <h3 className="font-semibold mb-2 text-white">CLOB Technology</h3>
              <p className="text-sm text-gray-400">
                Professional-grade trading with Central Limit Order Book for advanced order management
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto mb-3 text-purple-400" />
              <h3 className="font-semibold mb-2 text-white">Cross-Chain</h3>
              <p className="text-sm text-gray-400">
                Trade seamlessly across multiple blockchains with unified interface and settlement
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 
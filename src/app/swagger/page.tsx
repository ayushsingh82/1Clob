'use client';

import { useState } from 'react';

interface ApiResponse {
  data: any;
  status: number;
  error?: string;
}

export default function SwaggerPage() {
  const [responses, setResponses] = useState<{ [key: string]: ApiResponse }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [apiKey, setApiKey] = useState('');

  // Form states for different APIs
  const [addressOrders, setAddressOrders] = useState({
    chain: '1',
    address: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    page: '1',
    limit: '100',
    statuses: '1,2,3',
    takerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    makerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678'
  });

  const [allOrders, setAllOrders] = useState({
    chain: '1',
    page: '1',
    limit: '100',
    statuses: '1,2,3',
    takerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    makerAsset: '0x1234567890ABCDEF1234567890ABCDEF12345678'
  });

  const [orderEvents, setOrderEvents] = useState({
    chain: '1',
    orderHash: '0x1234567890ABCDEF1234567890ABCDEF12345678'
  });

  const [permitOrders, setPermitOrders] = useState({
    chain: '1',
    walletAddress: '0x1234567890ABCDEF1234567890ABCDEF12345678',
    token: '0x1234567890ABCDEF1234567890ABCDEF12345678'
  });

  const handleApiCall = async (apiName: string, url: string, params?: any) => {
    setLoading(prev => ({ ...prev, [apiName]: true }));
    try {
      const urlWithParams = new URL(url);
      if (params) {
        Object.keys(params).forEach(key => {
          if (params[key] !== undefined && params[key] !== '') {
            urlWithParams.searchParams.append(key, params[key].toString());
          }
        });
      }

      const headers: HeadersInit = {
        'Content-Type': 'application/json',
      };

      if (apiKey) {
        headers['Authorization'] = `Bearer ${apiKey}`;
      }

      const response = await fetch(urlWithParams.toString(), {
        method: 'GET',
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      setResponses(prev => ({
        ...prev,
        [apiName]: { data, status: response.status }
      }));
    } catch (error: any) {
      setResponses(prev => ({
        ...prev,
        [apiName]: { 
          data: null, 
          status: 500,
          error: error.message || 'Network error occurred'
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [apiName]: false }));
    }
  };

  const getAddressOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${addressOrders.chain}/address/${addressOrders.address}`;
    const params = {
      page: parseInt(addressOrders.page),
      limit: parseInt(addressOrders.limit),
      statuses: addressOrders.statuses,
      takerAsset: addressOrders.takerAsset,
      makerAsset: addressOrders.makerAsset,
    };
    handleApiCall('addressOrders', url, params);
  };

  const getAllOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${allOrders.chain}/all`;
    const params = {
      page: parseInt(allOrders.page),
      limit: parseInt(allOrders.limit),
      statuses: allOrders.statuses,
      takerAsset: allOrders.takerAsset,
      makerAsset: allOrders.makerAsset,
    };
    handleApiCall('allOrders', url, params);
  };

  const getOrderEvents = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${orderEvents.chain}/events/${orderEvents.orderHash}`;
    handleApiCall('orderEvents', url);
  };

  const getPermitOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${permitOrders.chain}/has-active-orders-with-permit/${permitOrders.walletAddress}/${permitOrders.token}`;
    handleApiCall('permitOrders', url);
  };

  return (
    <div className="min-h-screen p-4" style={{ backgroundColor: '#C6FC7B' }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4" style={{ color: '#0D2818' }}>1inch API Explorer</h1>
          <p className="text-lg" style={{ color: '#0D2818' }}>Test and explore 1inch Orderbook API endpoints</p>
        </div>

        {/* API Key Input */}
        <div className="mb-8 p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#C6FC7B' }}>API Configuration</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium mb-2" style={{ color: '#C6FC7B' }}>
                API Key (Optional)
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your 1inch API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Get Address Orders */}
          <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6FC7B' }}>Get Address Orders</h3>
            <p className="text-sm mb-4" style={{ color: '#C6FC7B' }}>Get limit orders belonging to the specified address</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Chain ID</label>
                <input
                  type="text"
                  value={addressOrders.chain}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Address</label>
                <input
                  type="text"
                  value={addressOrders.address}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Page</label>
                  <input
                    type="number"
                    value={addressOrders.page}
                    onChange={(e) => setAddressOrders(prev => ({ ...prev, page: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Limit</label>
                  <input
                    type="number"
                    value={addressOrders.limit}
                    onChange={(e) => setAddressOrders(prev => ({ ...prev, limit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Statuses</label>
                <input
                  type="text"
                  value={addressOrders.statuses}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, statuses: e.target.value }))}
                  placeholder="1,2,3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Taker Asset</label>
                <input
                  type="text"
                  value={addressOrders.takerAsset}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, takerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Maker Asset</label>
                <input
                  type="text"
                  value={addressOrders.makerAsset}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, makerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
            </div>
            
            <button
              onClick={getAddressOrders}
              disabled={loading.addressOrders}
              className="w-full py-2 px-4 rounded-md font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
            >
              {loading.addressOrders ? 'Loading...' : 'Get Address Orders'}
            </button>

            {responses.addressOrders && (
              <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: '#ECEFEC' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#122B1B' }}>
                  Status: {responses.addressOrders.status}
                  {responses.addressOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.addressOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40" style={{ color: '#122B1B' }}>
                  {JSON.stringify(responses.addressOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get All Orders */}
          <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6FC7B' }}>Get All Orders</h3>
            <p className="text-sm mb-4" style={{ color: '#C6FC7B' }}>Get all limit orders</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Chain ID</label>
                <input
                  type="text"
                  value={allOrders.chain}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Page</label>
                  <input
                    type="number"
                    value={allOrders.page}
                    onChange={(e) => setAllOrders(prev => ({ ...prev, page: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Limit</label>
                  <input
                    type="number"
                    value={allOrders.limit}
                    onChange={(e) => setAllOrders(prev => ({ ...prev, limit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Statuses</label>
                <input
                  type="text"
                  value={allOrders.statuses}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, statuses: e.target.value }))}
                  placeholder="1,2,3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Taker Asset</label>
                <input
                  type="text"
                  value={allOrders.takerAsset}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, takerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Maker Asset</label>
                <input
                  type="text"
                  value={allOrders.makerAsset}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, makerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
            </div>
            
            <button
              onClick={getAllOrders}
              disabled={loading.allOrders}
              className="w-full py-2 px-4 rounded-md font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
            >
              {loading.allOrders ? 'Loading...' : 'Get All Orders'}
            </button>

            {responses.allOrders && (
              <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: '#ECEFEC' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#122B1B' }}>
                  Status: {responses.allOrders.status}
                  {responses.allOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.allOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40" style={{ color: '#122B1B' }}>
                  {JSON.stringify(responses.allOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get Order Events */}
          <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6FC7B' }}>Get Order Events</h3>
            <p className="text-sm mb-4" style={{ color: '#C6FC7B' }}>Get fill/cancel events related to the specified order</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Chain ID</label>
                <input
                  type="text"
                  value={orderEvents.chain}
                  onChange={(e) => setOrderEvents(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Order Hash</label>
                <input
                  type="text"
                  value={orderEvents.orderHash}
                  onChange={(e) => setOrderEvents(prev => ({ ...prev, orderHash: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
            </div>
            
            <button
              onClick={getOrderEvents}
              disabled={loading.orderEvents}
              className="w-full py-2 px-4 rounded-md font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
            >
              {loading.orderEvents ? 'Loading...' : 'Get Order Events'}
            </button>

            {responses.orderEvents && (
              <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: '#ECEFEC' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#122B1B' }}>
                  Status: {responses.orderEvents.status}
                  {responses.orderEvents.error && (
                    <span className="text-red-600 ml-2">Error: {responses.orderEvents.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40" style={{ color: '#122B1B' }}>
                  {JSON.stringify(responses.orderEvents.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get Permit Orders */}
          <div className="p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#C6FC7B' }}>Get Permit Orders</h3>
            <p className="text-sm mb-4" style={{ color: '#C6FC7B' }}>Get all active orders which have permit for the specified wallet address and token</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Chain ID</label>
                <input
                  type="text"
                  value={permitOrders.chain}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Wallet Address</label>
                <input
                  type="text"
                  value={permitOrders.walletAddress}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, walletAddress: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1" style={{ color: '#C6FC7B' }}>Token Address</label>
                <input
                  type="text"
                  value={permitOrders.token}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, token: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}
                />
              </div>
            </div>
            
            <button
              onClick={getPermitOrders}
              disabled={loading.permitOrders}
              className="w-full py-2 px-4 rounded-md font-semibold hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#C6FC7B', color: '#122B1B' }}
            >
              {loading.permitOrders ? 'Loading...' : 'Get Permit Orders'}
            </button>

            {responses.permitOrders && (
              <div className="mt-4 p-3 rounded-md" style={{ backgroundColor: '#ECEFEC' }}>
                <div className="text-sm font-medium mb-2" style={{ color: '#122B1B' }}>
                  Status: {responses.permitOrders.status}
                  {responses.permitOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.permitOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40" style={{ color: '#122B1B' }}>
                  {JSON.stringify(responses.permitOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-12 p-6 rounded-2xl border-2" style={{ backgroundColor: '#122B1B', borderColor: '#C6FC7B' }}>
          <h2 className="text-2xl font-bold mb-4" style={{ color: '#C6FC7B' }}>API Documentation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#C6FC7B' }}>1. Get Address Orders</h3>
              <p className="text-sm mb-2" style={{ color: '#C6FC7B' }}>
                <code className="px-2 py-1 rounded" style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}>GET /orderbook/v4.0/{'{chain}'}/address/{'{address}'}</code>
              </p>
              <p className="text-sm" style={{ color: '#C6FC7B' }}>Get limit orders belonging to the specified address</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#C6FC7B' }}>2. Get All Orders</h3>
              <p className="text-sm mb-2" style={{ color: '#C6FC7B' }}>
                <code className="px-2 py-1 rounded" style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}>GET /orderbook/v4.0/{'{chain}'}/all</code>
              </p>
              <p className="text-sm" style={{ color: '#C6FC7B' }}>Get all limit orders</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#C6FC7B' }}>3. Get Order Events</h3>
              <p className="text-sm mb-2" style={{ color: '#C6FC7B' }}>
                <code className="px-2 py-1 rounded" style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}>GET /orderbook/v4.0/{'{chain}'}/events/{'{orderHash}'}</code>
              </p>
              <p className="text-sm" style={{ color: '#C6FC7B' }}>Get fill/cancel events related to the specified order</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2" style={{ color: '#C6FC7B' }}>4. Get Permit Orders</h3>
              <p className="text-sm mb-2" style={{ color: '#C6FC7B' }}>
                <code className="px-2 py-1 rounded" style={{ backgroundColor: '#ECEFEC', color: '#122B1B' }}>GET /orderbook/v4.0/{'{chain}'}/has-active-orders-with-permit/{'{walletAddress}'}/{'{token}'}</code>
              </p>
              <p className="text-sm" style={{ color: '#C6FC7B' }}>Get all active orders which have permit for the specified wallet address and token</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

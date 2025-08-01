'use client';

import { useState } from 'react';
import axios from 'axios';

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

  const handleApiCall = async (apiName: string, url: string, config: any) => {
    setLoading(prev => ({ ...prev, [apiName]: true }));
    try {
      const response = await axios.get(url, config);
      setResponses(prev => ({
        ...prev,
        [apiName]: { data: response.data, status: response.status }
      }));
    } catch (error: any) {
      setResponses(prev => ({
        ...prev,
        [apiName]: { 
          data: null, 
          status: error.response?.status || 500,
          error: error.response?.data?.message || error.message 
        }
      }));
    } finally {
      setLoading(prev => ({ ...prev, [apiName]: false }));
    }
  };

  const getAddressOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${addressOrders.chain}/address/${addressOrders.address}`;
    const config = {
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : undefined,
      params: {
        page: parseInt(addressOrders.page),
        limit: parseInt(addressOrders.limit),
        statuses: addressOrders.statuses,
        takerAsset: addressOrders.takerAsset,
        makerAsset: addressOrders.makerAsset,
      },
      paramsSerializer: { indexes: null },
    };
    handleApiCall('addressOrders', url, config);
  };

  const getAllOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${allOrders.chain}/all`;
    const config = {
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : undefined,
      params: {
        page: parseInt(allOrders.page),
        limit: parseInt(allOrders.limit),
        statuses: allOrders.statuses,
        takerAsset: allOrders.takerAsset,
        makerAsset: allOrders.makerAsset,
      },
      paramsSerializer: { indexes: null },
    };
    handleApiCall('allOrders', url, config);
  };

  const getOrderEvents = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${orderEvents.chain}/events/${orderEvents.orderHash}`;
    const config = {
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : undefined,
      params: {},
      paramsSerializer: { indexes: null },
    };
    handleApiCall('orderEvents', url, config);
  };

  const getPermitOrders = () => {
    const url = `https://api.1inch.dev/orderbook/v4.0/${permitOrders.chain}/has-active-orders-with-permit/${permitOrders.walletAddress}/${permitOrders.token}`;
    const config = {
      headers: apiKey ? { 'Authorization': `Bearer ${apiKey}` } : undefined,
      params: {},
      paramsSerializer: { indexes: null },
    };
    handleApiCall('permitOrders', url, config);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">1inch API Explorer</h1>
          <p className="text-lg text-gray-600">Test and explore 1inch Orderbook API endpoints</p>
        </div>

        {/* API Key Input */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">API Configuration</h2>
          <div className="flex gap-4">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                API Key (Optional)
              </label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your 1inch API key"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Get Address Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-blue-600">Get Address Orders</h3>
            <p className="text-sm text-gray-600 mb-4">Get limit orders belonging to the specified address</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chain ID</label>
                <input
                  type="text"
                  value={addressOrders.chain}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  type="text"
                  value={addressOrders.address}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
                  <input
                    type="number"
                    value={addressOrders.page}
                    onChange={(e) => setAddressOrders(prev => ({ ...prev, page: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                  <input
                    type="number"
                    value={addressOrders.limit}
                    onChange={(e) => setAddressOrders(prev => ({ ...prev, limit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statuses</label>
                <input
                  type="text"
                  value={addressOrders.statuses}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, statuses: e.target.value }))}
                  placeholder="1,2,3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taker Asset</label>
                <input
                  type="text"
                  value={addressOrders.takerAsset}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, takerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maker Asset</label>
                <input
                  type="text"
                  value={addressOrders.makerAsset}
                  onChange={(e) => setAddressOrders(prev => ({ ...prev, makerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={getAddressOrders}
              disabled={loading.addressOrders}
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.addressOrders ? 'Loading...' : 'Get Address Orders'}
            </button>

            {responses.addressOrders && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="text-sm font-medium mb-2">
                  Status: {responses.addressOrders.status}
                  {responses.addressOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.addressOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(responses.addressOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get All Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-green-600">Get All Orders</h3>
            <p className="text-sm text-gray-600 mb-4">Get all limit orders</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chain ID</label>
                <input
                  type="text"
                  value={allOrders.chain}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Page</label>
                  <input
                    type="number"
                    value={allOrders.page}
                    onChange={(e) => setAllOrders(prev => ({ ...prev, page: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Limit</label>
                  <input
                    type="number"
                    value={allOrders.limit}
                    onChange={(e) => setAllOrders(prev => ({ ...prev, limit: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Statuses</label>
                <input
                  type="text"
                  value={allOrders.statuses}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, statuses: e.target.value }))}
                  placeholder="1,2,3"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Taker Asset</label>
                <input
                  type="text"
                  value={allOrders.takerAsset}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, takerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Maker Asset</label>
                <input
                  type="text"
                  value={allOrders.makerAsset}
                  onChange={(e) => setAllOrders(prev => ({ ...prev, makerAsset: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={getAllOrders}
              disabled={loading.allOrders}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.allOrders ? 'Loading...' : 'Get All Orders'}
            </button>

            {responses.allOrders && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="text-sm font-medium mb-2">
                  Status: {responses.allOrders.status}
                  {responses.allOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.allOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(responses.allOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get Order Events */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-purple-600">Get Order Events</h3>
            <p className="text-sm text-gray-600 mb-4">Get fill/cancel events related to the specified order</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chain ID</label>
                <input
                  type="text"
                  value={orderEvents.chain}
                  onChange={(e) => setOrderEvents(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Order Hash</label>
                <input
                  type="text"
                  value={orderEvents.orderHash}
                  onChange={(e) => setOrderEvents(prev => ({ ...prev, orderHash: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={getOrderEvents}
              disabled={loading.orderEvents}
              className="w-full bg-purple-600 text-white py-2 px-4 rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.orderEvents ? 'Loading...' : 'Get Order Events'}
            </button>

            {responses.orderEvents && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="text-sm font-medium mb-2">
                  Status: {responses.orderEvents.status}
                  {responses.orderEvents.error && (
                    <span className="text-red-600 ml-2">Error: {responses.orderEvents.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(responses.orderEvents.data, null, 2)}
                </pre>
              </div>
            )}
          </div>

          {/* Get Permit Orders */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4 text-orange-600">Get Permit Orders</h3>
            <p className="text-sm text-gray-600 mb-4">Get all active orders which have permit for the specified wallet address and token</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Chain ID</label>
                <input
                  type="text"
                  value={permitOrders.chain}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, chain: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Wallet Address</label>
                <input
                  type="text"
                  value={permitOrders.walletAddress}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, walletAddress: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Token Address</label>
                <input
                  type="text"
                  value={permitOrders.token}
                  onChange={(e) => setPermitOrders(prev => ({ ...prev, token: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            <button
              onClick={getPermitOrders}
              disabled={loading.permitOrders}
              className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading.permitOrders ? 'Loading...' : 'Get Permit Orders'}
            </button>

            {responses.permitOrders && (
              <div className="mt-4 p-3 bg-gray-50 rounded-md">
                <div className="text-sm font-medium mb-2">
                  Status: {responses.permitOrders.status}
                  {responses.permitOrders.error && (
                    <span className="text-red-600 ml-2">Error: {responses.permitOrders.error}</span>
                  )}
                </div>
                <pre className="text-xs overflow-auto max-h-40">
                  {JSON.stringify(responses.permitOrders.data, null, 2)}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Documentation */}
        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">API Documentation</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">1. Get Address Orders</h3>
              <p className="text-sm text-gray-600 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded">GET /orderbook/v4.0/{'{chain}'}/address/{'{address}'}</code>
              </p>
              <p className="text-sm text-gray-600">Get limit orders belonging to the specified address</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">2. Get All Orders</h3>
              <p className="text-sm text-gray-600 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded">GET /orderbook/v4.0/{'{chain}'}/all</code>
              </p>
              <p className="text-sm text-gray-600">Get all limit orders</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">3. Get Order Events</h3>
              <p className="text-sm text-gray-600 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded">GET /orderbook/v4.0/{'{chain}'}/events/{'{orderHash}'}</code>
              </p>
              <p className="text-sm text-gray-600">Get fill/cancel events related to the specified order</p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-2">4. Get Permit Orders</h3>
              <p className="text-sm text-gray-600 mb-2">
                <code className="bg-gray-100 px-2 py-1 rounded">GET /orderbook/v4.0/{'{chain}'}/has-active-orders-with-permit/{'{walletAddress}'}/{'{token}'}</code>
              </p>
              <p className="text-sm text-gray-600">Get all active orders which have permit for the specified wallet address and token</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

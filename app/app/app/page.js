'use client';

import { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  DollarSign, 
  Target, 
  Clock,
  Search,
  Filter,
  RefreshCw,
  Hexagon,
  Triangle,
  Circle
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadialBarChart, RadialBar, PieChart, Pie, Cell } from 'recharts';

export default function GannCryptoScanner() {
  const [selectedCoin, setSelectedCoin] = useState('BTC');
  const [campaignFilter, setCampaignFilter] = useState('all');
  const [isScanning, setIsScanning] = useState(false);
  const [gannData, setGannData] = useState(null);

  // Mock cryptocurrency data with Gann analysis
  const cryptoCoins = [
    {
      symbol: 'BTC',
      name: 'Bitcoin',
      price: 43250.00,
      change24h: 2.34,
      gannCycle: '127 days',
      hexagonAngle: 240,
      resistance: [42000, 45000, 48000],
      support: [40000, 38000, 35000],
      timeSquare: 49,
      priceSquare: 9,
      campaign: 'bull',
      momentum: 'strong'
    },
    {
      symbol: 'ETH',
      name: 'Ethereum',
      price: 2650.50,
      change24h: -1.25,
      gannCycle: '91 days',
      hexagonAngle: 180,
      resistance: [2700, 2850, 3000],
      support: [2500, 2300, 2100],
      timeSquare: 36,
      priceSquare: 16,
      campaign: 'accumulation',
      momentum: 'neutral'
    },
    {
      symbol: 'ADA',
      name: 'Cardano',
      price: 0.485,
      change24h: 5.67,
      gannCycle: '61 days',
      hexagonAngle: 120,
      resistance: [0.50, 0.55, 0.62],
      support: [0.45, 0.40, 0.35],
      timeSquare: 25,
      priceSquare: 4,
      campaign: 'bull',
      momentum: 'strong'
    },
    {
      symbol: 'SOL',
      name: 'Solana',
      price: 98.75,
      change24h: 3.45,
      gannCycle: '169 days',
      hexagonAngle: 300,
      resistance: [105, 115, 125],
      support: [95, 85, 75],
      timeSquare: 64,
      priceSquare: 25,
      campaign: 'bull',
      momentum: 'strong'
    }
  ];

  // Gann Hexagon calculation data
  const hexagonData = [
    { angle: 0, value: 1, label: 'Start' },
    { angle: 60, value: 7, label: 'First Circle' },
    { angle: 120, value: 19, label: 'Second Circle' },
    { angle: 180, value: 37, label: 'Third Circle' },
    { angle: 240, value: 61, label: 'Fourth Circle' },
    { angle: 300, value: 91, label: 'Fifth Circle' },
    { angle: 360, value: 127, label: 'Sixth Circle' }
  ];

  // Time cycle data for selected coin
  const generateTimeData = (coin) => {
    const baseDate = new Date('2024-01-01');
    return Array.from({ length: 30 }, (_, i) => ({
      day: i + 1,
      price: coin.price * (1 + (Math.sin(i * 0.2) * 0.1) + (Math.random() * 0.05 - 0.025)),
      gannLevel: coin.price * (1 + Math.sin(i * Math.PI / coin.timeSquare) * 0.08),
      volume: Math.random() * 1000000 + 500000
    }));
  };

  const [timeData, setTimeData] = useState(() => generateTimeData(cryptoCoins[0]));

  useEffect(() => {
    const coin = cryptoCoins.find(c => c.symbol === selectedCoin);
    if (coin) {
      setTimeData(generateTimeData(coin));
      setGannData(coin);
    }
  }, [selectedCoin]);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
    }, 2000);
  };

  const filteredCoins = cryptoCoins.filter(coin => 
    campaignFilter === 'all' || coin.campaign === campaignFilter
  );

  const selectedCoinData = cryptoCoins.find(c => c.symbol === selectedCoin);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className="gann-hexagon w-12 h-12 flex items-center justify-center">
                <Hexagon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Gann Crypto Scanner</h1>
                <p className="text-gray-400">Professional cryptocurrency analysis using W.D. Gann methods</p>
              </div>
            </div>
            <button
              onClick={handleScan}
              disabled={isScanning}
              className="flex items-center space-x-2 bg-gann-blue hover:bg-blue-700 px-6 py-3 rounded-lg text-white font-medium transition-colors disabled:opacity-50"
            >
              <RefreshCw className={`w-5 h-5 ${isScanning ? 'animate-spin' : ''}`} />
              <span>{isScanning ? 'Scanning...' : 'Scan Markets'}</span>
            </button>
          </div>

          {/* Filters */}
          <div className="flex items-center space-x-4 mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-5 h-5 text-gray-400" />
              <select
                value={selectedCoin}
                onChange={(e) => setSelectedCoin(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gann-blue"
              >
                {cryptoCoins.map(coin => (
                  <option key={coin.symbol} value={coin.symbol}>
                    {coin.symbol} - {coin.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <select
                value={campaignFilter}
                onChange={(e) => setCampaignFilter(e.target.value)}
                className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gann-blue"
              >
                <option value="all">All Campaigns</option>
                <option value="bull">Bull Campaign</option>
                <option value="bear">Bear Campaign</option>
                <option value="accumulation">Accumulation</option>
              </select>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Price Chart */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-white">
                {selectedCoinData?.name} - Gann Analysis
              </h2>
              <div className="flex items-center space-x-2">
                <Circle className="w-4 h-4 text-gann-blue" />
                <span className="text-sm text-gray-400">Time Square: {selectedCoinData?.timeSquare}</span>
              </div>
            </div>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={timeData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="day" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#1E40AF" 
                    strokeWidth={2}
                    dot={{ fill: '#1E40AF', strokeWidth: 2, r: 4 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="gannLevel" 
                    stroke="#F59E0B" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Gann Hexagon */}
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">Gann Hexagon</h2>
            <div className="h-80 flex items-center justify-center">
              <div className="relative">
                <div className="gann-hexagon w-48 h-48 flex items-center justify-center relative">
                  <div className="absolute inset-4 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-2xl font-bold text-gann-gold">1</span>
                  </div>
                  {hexagonData.map((point, index) => (
                    <div
                      key={index}
                      className="absolute w-8 h-8 bg-gann-blue rounded-full flex items-center justify-center text-xs font-bold text-white"
                      style={{
                        top: `${50 + 35 * Math.sin((point.angle * Math.PI) / 180)}%`,
                        left: `${50 + 35 * Math.cos((point.angle * Math.PI) / 180)}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    >
                      {point.value}
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-400">Current Angle: {selectedCoinData?.hexagonAngle}°</p>
                  <p className="text-sm text-gann-gold">Cycle: {selectedCoinData?.gannCycle}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Coin Cards Grid */}
        <div className="crypto-grid mb-8">
          {filteredCoins.map((coin) => (
            <div
              key={coin.symbol}
              className={`bg-gray-800 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-gray-750 ${
                selectedCoin === coin.symbol ? 'ring-2 ring-gann-blue' : ''
              }`}
              onClick={() => setSelectedCoin(coin.symbol)}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-gann-blue to-gann-gold rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{coin.symbol}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-white">{coin.name}</h3>
                    <p className="text-sm text-gray-400">{coin.symbol}</p>
                  </div>
                </div>
                <div className={`flex items-center space-x-1 ${
                  coin.change24h >= 0 ? 'text-gann-green' : 'text-gann-red'
                }`}>
                  {coin.change24h >= 0 ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span className="text-sm font-medium">
                    {coin.change24h >= 0 ? '+' : ''}{coin.change24h}%
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Price</span>
                  <span className="text-white font-semibold">${coin.price.toLocaleString()}</span>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Gann Cycle</span>
                  <span className="text-gann-gold">{coin.gannCycle}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-400">Campaign</span>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${
                    coin.campaign === 'bull' ? 'bg-gann-green text-white' :
                    coin.campaign === 'bear' ? 'bg-gann-red text-white' :
                    'bg-gray-600 text-white'
                  }`}>
                    {coin.campaign.toUpperCase()}
                  </span>
                </div>

                <div className="pt-2 border-t border-gray-700">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Resistance</span>
                    <span className="text-gann-red">${coin.resistance[0].toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-400">Support</span>
                    <span className="text-gann-green">${coin.support[0].toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gann Analysis Summary */}
        {selectedCoinData && (
          <div className="bg-gray-800 rounded-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              Gann Analysis Summary - {selectedCoinData.name}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gann-blue rounded-full flex items-center justify-center mx-auto mb-2">
                  <Target className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white">Price Square</h3>
                <p className="text-2xl font-bold text-gann-gold">{selectedCoinData.priceSquare}</p>
                <p className="text-sm text-gray-400">Square of {Math.sqrt(selectedCoinData.priceSquare)}</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gann-gold rounded-full flex items-center justify-center mx-auto mb-2">
                  <Clock className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white">Time Square</h3>
                <p className="text-2xl font-bold text-gann-blue">{selectedCoinData.timeSquare}</p>
                <p className="text-sm text-gray-400">Days in current cycle</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gann-green rounded-full flex items-center justify-center mx-auto mb-2">
                  <Triangle className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white">Hexagon Angle</h3>
                <p className="text-2xl font-bold text-gann-green">{selectedCoinData.hexagonAngle}°</p>
                <p className="text-sm text-gray-400">Current position</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-gann-red rounded-full flex items-center justify-center mx-auto mb-2">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-semibold text-white">Momentum</h3>
                <p className="text-2xl font-bold text-white capitalize">{selectedCoinData.momentum}</p>
                <p className="text-sm text-gray-400">Current strength</p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-700 rounded-lg">
              <h4 className="font-semibold text-white mb-2">Key Gann Levels</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-400 mb-1">Resistance Levels:</p>
                  <div className="space-y-1">
                    {selectedCoinData.resistance.map((level, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-300">R{index + 1}:</span>
                        <span className="text-gann-red font-medium">${level.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-gray-400 mb-1">Support Levels:</p>
                  <div className="space-y-1">
                    {selectedCoinData.support.map((level, index) => (
                      <div key={index} className="flex justify-between">
                        <span className="text-gray-300">S{index + 1}:</span>
                        <span className="text-gann-green font-medium">${level.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-400">
          <p>© 2024 Gann Crypto Scanner - Professional Trading Analysis</p>
          <p className="text-sm mt-2">Based on W.D. Gann's time-tested trading methods</p>
        </footer>
      </div>
    </div>
  );
}

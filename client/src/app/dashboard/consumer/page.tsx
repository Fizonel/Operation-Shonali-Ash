'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { QrCode, ShoppingBag, Leaf, MapPin, Shield, TrendingUp } from 'lucide-react';
import Timeline from '@/components/Timeline';
import { CROP_TYPES, ROLE_MAP, DISTRICTS } from '@/lib/constants';

export default function ConsumerDashboard() {
  const { address, isConnected } = useAccount();
  const [batchId, setBatchId] = useState('');
  const [traceResult, setTraceResult] = useState<any>(null);
  const [scanning, setScanning] = useState(false);

  // Mock trace data
  const mockTraceData = {
    1: {
      batchId: 1,
      cropType: 'jute',
      quantity: 5000,
      originFarmer: 'আব্দুল করিম (Abdul Karim)',
      originLocation: 'Bogura Sadar',
      harvestDate: Math.floor(Date.now() / 1000) - 432000, // 5 days ago
      currentLocation: 'Dhaka, Karwan Bazar',
      qualityScore: 95,
      steps: [
        {
          location: 'Bogura Sadar - ক্ষেত (Farm)',
          timestamp: Math.floor(Date.now() / 1000) - 432000,
          handler: 'Abdul Karim',
          role: ROLE_MAP[0],
          completed: true,
        },
        {
          location: 'Bogura to Dhaka - পরিবহন (Transport)',
          timestamp: Math.floor(Date.now() / 1000) - 345600,
          handler: 'Rahman Transport Ltd.',
          role: ROLE_MAP[1],
          completed: true,
        },
        {
          location: 'Dhaka Warehouse - গুদাম',
          timestamp: Math.floor(Date.now() / 1000) - 259200,
          handler: 'Karim Wholesale',
          role: ROLE_MAP[2],
          completed: true,
        },
        {
          location: 'Karwan Bazar - খুচরা দোকান (Retail Shop)',
          timestamp: Math.floor(Date.now() / 1000) - 86400,
          handler: 'Hasan General Store',
          role: ROLE_MAP[3],
          completed: true,
        },
      ],
      certifications: ['জৈব চাষ (Organic)', 'বিষমুক্ত (Pesticide-free)'],
    },
    2: {
      batchId: 2,
      cropType: 'potato',
      quantity: 10000,
      originFarmer: 'রহিমা খাতুন (Rahima Khatun)',
      originLocation: 'Munshiganj Sadar',
      harvestDate: Math.floor(Date.now() / 1000) - 518400, // 6 days ago
      currentLocation: 'Chittagong, Reazuddin Bazar',
      qualityScore: 88,
      steps: [
        {
          location: 'Munshiganj Sadar - ক্ষেত (Farm)',
          timestamp: Math.floor(Date.now() / 1000) - 518400,
          handler: 'Rahima Khatun',
          role: ROLE_MAP[0],
          completed: true,
        },
        {
          location: 'Munshiganj to Chittagong - পরিবহন',
          timestamp: Math.floor(Date.now() / 1000) - 432000,
          handler: 'Alam Transport',
          role: ROLE_MAP[1],
          completed: true,
        },
        {
          location: 'Chittagong Wholesale Market - পাইকারি বাজার',
          timestamp: Math.floor(Date.now() / 1000) - 259200,
          handler: 'Chittagong Wholesale Co.',
          role: ROLE_MAP[2],
          completed: true,
        },
        {
          location: 'Reazuddin Bazar - খুচরা দোকান',
          timestamp: Math.floor(Date.now() / 1000) - 172800,
          handler: 'Fresh Vegetables Shop',
          role: ROLE_MAP[3],
          completed: true,
        },
      ],
      certifications: ['মান নিয়ন্ত্রিত (Quality Controlled)', 'সতেজ (Fresh)'],
    },
  };

  const handleTrace = () => {
    const id = parseInt(batchId);
    if (mockTraceData[id as keyof typeof mockTraceData]) {
      setTraceResult(mockTraceData[id as keyof typeof mockTraceData]);
    } else {
      setTraceResult({ error: 'ব্যাচ খুঁজে পাওয়া যায়নি (Batch not found)' });
    }
  };

  const handleScanQR = () => {
    setScanning(true);
    // Simulate QR scanning
    setTimeout(() => {
      const randomId = Math.random() > 0.5 ? '1' : '2';
      setBatchId(randomId);
      setTraceResult(mockTraceData[parseInt(randomId) as keyof typeof mockTraceData]);
      setScanning(false);
    }, 2000);
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <ShoppingBag className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mb-3">
              ভোক্তা ড্যাশবোর্ড
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">Consumer Dashboard</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              আপনার খাদ্যের উৎস যাচাই করুন<br />
              <span className="text-sm">Verify Your Food Origin</span>
            </p>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-blue-800 font-semibold">🔐 সুরক্ষিত সংযোগ প্রয়োজন</p>
              <p className="text-xs text-blue-700 mt-1">আপনার ওয়ালেট সংযুক্ত করুন</p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-blue-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-xl shadow-lg">
              <QrCode className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                ভোক্তা ড্যাশবোর্ড
              </h1>
              <p className="text-xs text-gray-500">Consumer Dashboard</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        {/* Hero Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <div className="text-center mb-8">
            <Leaf className="w-16 h-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              আপনার খাদ্যের উৎস জানুন (Know Your Food's Origin)
            </h2>
            <p className="text-gray-600">
              QR কোড স্ক্যান করুন বা ব্যাচ নম্বর প্রবেশ করান (Scan QR code or enter batch number)
            </p>
          </div>

          {/* Search Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Manual Entry */}
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-xl border-2 border-blue-200">
              <h3 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                <Shield className="w-6 h-6" />
                ব্যাচ নম্বর প্রবেশ করান (Enter Batch Number)
              </h3>
              <div className="space-y-4">
                <input
                  type="number"
                  value={batchId}
                  onChange={(e) => setBatchId(e.target.value)}
                  placeholder="উদাহরণ: 1, 2, 3..."
                  className="w-full px-4 py-3 rounded-lg border-2 border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all"
                />
                <button
                  onClick={handleTrace}
                  disabled={!batchId}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-bold py-3 px-6 rounded-xl hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 transition-all"
                >
                  ট্রেস করুন (Trace Origin)
                </button>
              </div>
            </div>

            {/* QR Scanner */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border-2 border-green-200">
              <h3 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2">
                <QrCode className="w-6 h-6" />
                QR কোড স্ক্যান করুন (Scan QR Code)
              </h3>
              <div className="space-y-4">
                <div className="bg-white p-8 rounded-lg border-2 border-dashed border-green-300 flex flex-col items-center justify-center min-h-[120px]">
                  {scanning ? (
                    <div className="text-center">
                      <div className="animate-spin w-12 h-12 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                      <p className="text-sm text-gray-600">স্ক্যান করা হচ্ছে...</p>
                    </div>
                  ) : (
                    <QrCode className="w-16 h-16 text-green-400" />
                  )}
                </div>
                <button
                  onClick={handleScanQR}
                  disabled={scanning}
                  className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold py-3 px-6 rounded-xl hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 transition-all"
                >
                  {scanning ? 'স্ক্যান করা হচ্ছে...' : 'QR স্ক্যানার চালু করুন'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trace Results */}
        {traceResult && !traceResult.error && (
          <div className="space-y-8">
            {/* Product Info Card */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    ব্যাচ #{traceResult.batchId} - বিস্তারিত তথ্য
                  </h3>
                  <p className="text-gray-600">
                    সম্পূর্ণ সরবরাহ চেইন ট্র্যাকিং (Complete supply chain tracking)
                  </p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {traceResult.qualityScore}%
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">গুণমান স্কোর</p>
                </div>
              </div>

              {/* Product Details Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-600 font-semibold mb-1">ফসলের ধরন</p>
                  <p className="text-lg font-bold text-gray-800">
                    {CROP_TYPES.find(c => c.value === traceResult.cropType)?.icon}{' '}
                    {CROP_TYPES.find(c => c.value === traceResult.cropType)?.label}
                  </p>
                </div>

                <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-green-600 font-semibold mb-1">উৎপাদক কৃষক</p>
                  <p className="text-lg font-bold text-gray-800">{traceResult.originFarmer}</p>
                </div>

                <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <p className="text-sm text-purple-600 font-semibold mb-1">উৎপত্তি স্থান</p>
                  <p className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    {traceResult.originLocation}
                  </p>
                </div>
              </div>

              {/* Certifications */}
              <div className="flex flex-wrap gap-3 mb-6">
                {traceResult.certifications.map((cert: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full text-sm font-semibold flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4" />
                    {cert}
                  </span>
                ))}
              </div>

              {/* Additional Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm text-gray-600">মোট পরিমাণ</p>
                  <p className="text-lg font-semibold text-gray-800">
                    {traceResult.quantity.toLocaleString()} কেজি
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">বর্তমান অবস্থান</p>
                  <p className="text-lg font-semibold text-gray-800">{traceResult.currentLocation}</p>
                </div>
              </div>
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <Timeline steps={traceResult.steps} />
            </div>

            {/* Trust Score */}
            <div className="bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl shadow-xl p-8 text-white text-center">
              <Shield className="w-16 h-16 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">বিশ্বাসযোগ্য উৎস (Verified Origin)</h3>
              <p className="text-green-100 mb-4">
                এই পণ্যটি সম্পূর্ণভাবে ট্র্যাক করা এবং যাচাইকৃত
              </p>
              <p className="text-sm text-green-100">
                ব্লকচেইন প্রযুক্তি দ্বারা সুরক্ষিত • স্বচ্ছ সরবরাহ চেইন
              </p>
            </div>
          </div>
        )}

        {traceResult && traceResult.error && (
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="text-red-500 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{traceResult.error}</h3>
            <p className="text-gray-600">অনুগ্রহ করে সঠিক ব্যাচ নম্বর প্রবেশ করান</p>
          </div>
        )}
      </div>
    </div>
  );
}

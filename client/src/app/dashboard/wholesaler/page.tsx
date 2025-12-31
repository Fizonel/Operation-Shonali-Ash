'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Store, Search, TrendingUp, AlertTriangle, ShoppingCart, CheckCircle, Package } from 'lucide-react';
import Timeline from '@/components/Timeline';
import { CROP_TYPES, ROLE_MAP } from '@/lib/constants';

interface Batch {
  id: number;
  producer: string;
  cropType: string;
  quantity: number;
  price: number;
  currentHandler: string;
  location: string;
  timestamp: number;
  isHoarding: boolean;
}

export default function WholesalerDashboard() {
  const { address, isConnected } = useAccount();
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [showTimeline, setShowTimeline] = useState(false);

  // Mock data for available batches
  const [availableBatches] = useState<Batch[]>([
    {
      id: 1,
      producer: '0x1234...5678',
      cropType: 'jute',
      quantity: 5000,
      price: 45,
      currentHandler: '0xabcd...efgh',
      location: 'Bogura Sadar',
      timestamp: Math.floor(Date.now() / 1000) - 86400, // 1 day ago
      isHoarding: false,
    },
    {
      id: 2,
      producer: '0x8765...4321',
      cropType: 'potato',
      quantity: 10000,
      price: 35,
      currentHandler: '0xijkl...mnop',
      location: 'Munshiganj Sadar',
      timestamp: Math.floor(Date.now() / 1000) - 345600, // 4 days ago
      isHoarding: true,
    },
    {
      id: 3,
      producer: '0x2468...1357',
      cropType: 'jute',
      quantity: 3000,
      price: 50,
      currentHandler: '0xqrst...uvwx',
      location: 'Sherpur, Bogura',
      timestamp: Math.floor(Date.now() / 1000) - 43200, // 12 hours ago
      isHoarding: false,
    },
  ]);

  const [priceData] = useState([
    { month: 'জানুয়ারি', jute: 42, potato: 30 },
    { month: 'ফেব্রুয়ারি', jute: 45, potato: 32 },
    { month: 'মার্চ', jute: 48, potato: 35 },
    { month: 'এপ্রিল', jute: 50, potato: 38 },
  ]);

  const timelineSteps = [
    {
      location: 'Bogura Sadar (ক্ষেত)',
      timestamp: Math.floor(Date.now() / 1000) - 345600,
      handler: 'Abdul Karim',
      role: ROLE_MAP[0],
      completed: true,
    },
    {
      location: 'Transport to Dhaka',
      timestamp: Math.floor(Date.now() / 1000) - 259200,
      handler: 'Rahman Transport',
      role: ROLE_MAP[1],
      completed: true,
    },
    {
      location: 'Dhaka Warehouse',
      timestamp: Math.floor(Date.now() / 1000) - 172800,
      handler: 'Karim Wholesale',
      role: ROLE_MAP[2],
      completed: true,
    },
    {
      location: 'Local Market',
      timestamp: Math.floor(Date.now() / 1000),
      handler: 'Waiting...',
      role: ROLE_MAP[3],
      completed: false,
    },
  ];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Store className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              পাইকার ড্যাশবোর্ড
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">Wholesaler Dashboard</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              বাল্ক ক্রয় এবং বিতরণ ব্যবস্থাপনা<br />
              <span className="text-sm">Bulk Purchase & Distribution Management</span>
            </p>
            <div className="bg-purple-50 border-2 border-purple-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-purple-800 font-semibold">🔐 সুরক্ষিত সংযোগ প্রয়োজন</p>
              <p className="text-xs text-purple-700 mt-1">আপনার ওয়ালেট সংযুক্ত করুন</p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-indigo-50 to-pink-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-purple-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-purple-500 to-indigo-600 p-3 rounded-xl shadow-lg">
              <Store className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                পাইকার ড্যাশবোর্ড
              </h1>
              <p className="text-xs text-gray-500">Wholesaler Dashboard</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-purple-100 hover:shadow-purple-200/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Available Batches</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
                  {availableBatches.length}
                </p>
                <p className="text-xs text-gray-400 mt-1">উপলব্ধ ব্যাচ</p>
              </div>
              <div className="bg-purple-100 p-4 rounded-xl">
                <Package className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-green-100 hover:shadow-green-200/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">My Purchases</p>
                <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  {selectedBatch ? 1 : 0}
                </p>
                <p className="text-xs text-gray-400 mt-1">আমার ক্রয়</p>
              </div>
              <div className="bg-green-100 p-4 rounded-xl">
                <ShoppingCart className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-2 border-blue-100 hover:shadow-blue-200/50 transition-all duration-300 transform hover:-translate-y-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-semibold mb-1">Blockchain Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <p className="text-lg font-bold text-green-600">Connected</p>
                </div>
                <p className="text-xs text-gray-400 mt-1">ব্লকচেইন সংযুক্ত</p>
              </div>
              <div className="bg-blue-100 p-4 rounded-xl">
                <TrendingUp className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Price Chart */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6">
            মূল্য প্রবণতা (Price Trends)
          </h2>
          <div className="h-64 flex items-end justify-around gap-4">
            {priceData.map((data, index) => (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex gap-2">
                  <div
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-400 rounded-t-lg transition-all hover:shadow-lg"
                    style={{ height: `${data.jute * 3}px` }}
                    title={`Jute: ৳${data.jute}`}
                  />
                  <div
                    className="flex-1 bg-gradient-to-t from-orange-500 to-orange-400 rounded-t-lg transition-all hover:shadow-lg"
                    style={{ height: `${data.potato * 3}px` }}
                    title={`Potato: ৳${data.potato}`}
                  />
                </div>
                <p className="text-xs text-gray-600 font-medium">{data.month}</p>
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-green-500 rounded"></div>
              <span className="text-sm text-gray-600">পাট (Jute)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-orange-500 rounded"></div>
              <span className="text-sm text-gray-600">আলু (Potato)</span>
            </div>
          </div>
        </div>

        {/* Available Batches Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center gap-2">
            <Search className="w-6 h-6" />
            উপলব্ধ ব্যাচসমূহ (Available Batches)
          </h2>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-purple-100 text-purple-800">
                  <th className="px-4 py-3 text-left rounded-tl-lg">ব্যাচ ID</th>
                  <th className="px-4 py-3 text-left">ফসল</th>
                  <th className="px-4 py-3 text-left">পরিমাণ (কেজি)</th>
                  <th className="px-4 py-3 text-left">মূল্য (৳/কেজি)</th>
                  <th className="px-4 py-3 text-left">অবস্থান</th>
                  <th className="px-4 py-3 text-left">অবস্থা</th>
                  <th className="px-4 py-3 text-left rounded-tr-lg">কর্ম</th>
                </tr>
              </thead>
              <tbody>
                {availableBatches.map((batch) => (
                  <tr key={batch.id} className="border-b hover:bg-purple-50 transition-colors">
                    <td className="px-4 py-4 font-semibold text-purple-700">#{batch.id}</td>
                    <td className="px-4 py-4">
                      {CROP_TYPES.find(c => c.value === batch.cropType)?.icon}{' '}
                      {CROP_TYPES.find(c => c.value === batch.cropType)?.label}
                    </td>
                    <td className="px-4 py-4">{batch.quantity.toLocaleString()}</td>
                    <td className="px-4 py-4 font-semibold text-green-600">৳{batch.price}</td>
                    <td className="px-4 py-4 text-sm">{batch.location}</td>
                    <td className="px-4 py-4">
                      {batch.isHoarding ? (
                        <span className="px-3 py-1 bg-orange-100 text-orange-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                          <AlertTriangle className="w-3 h-3" />
                          জমা হচ্ছে
                        </span>
                      ) : (
                        <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded-full flex items-center gap-1 w-fit">
                          <CheckCircle className="w-3 h-3" />
                          ভালো
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => {
                          setSelectedBatch(batch);
                          setShowTimeline(true);
                        }}
                        className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
                      >
                        বিস্তারিত
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Timeline Modal */}
        {showTimeline && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
                <h3 className="text-2xl font-bold text-purple-700">
                  ব্যাচ #{selectedBatch?.id} - ট্র্যাকিং
                </h3>
                <button
                  onClick={() => setShowTimeline(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ✕
                </button>
              </div>
              <div className="p-6">
                <Timeline steps={timelineSteps} />
                
                <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                  <h4 className="font-semibold text-purple-800 mb-2">ক্রয় করুন (Purchase)</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    মোট মূল্য: ৳{selectedBatch ? (selectedBatch.quantity * selectedBatch.price).toLocaleString() : 0}
                  </p>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold py-3 px-6 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all">
                    এস্ক্রো তৈরি করুন (Create Escrow)
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

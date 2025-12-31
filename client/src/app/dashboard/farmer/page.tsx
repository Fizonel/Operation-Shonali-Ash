'use client';

import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useAccount } from 'wagmi';
import { Sprout, Package, TrendingUp, Clock, MapPin } from 'lucide-react';
import { DISTRICTS, CROP_TYPES, FARMER_LOCATIONS_BOGURA, FARMER_LOCATIONS_MUNSHIGANJ } from '@/lib/constants';

export default function FarmerDashboard() {
  const { address, isConnected } = useAccount();
  const [formData, setFormData] = useState({
    cropType: '',
    quantity: '',
    price: '',
    location: '',
    district: '',
  });

  const [batches, setBatches] = useState<any[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Integrate with smart contract
    const newBatch = {
      id: batches.length,
      ...formData,
      timestamp: Date.now(),
      status: 'মিন্টেড (Minted)',
    };
    setBatches([...batches, newBatch]);
    setFormData({ cropType: '', quantity: '', price: '', location: '', district: '' });
  };

  const locationOptions = formData.district === 'bogura' 
    ? FARMER_LOCATIONS_BOGURA 
    : formData.district === 'munshiganj'
    ? FARMER_LOCATIONS_MUNSHIGANJ
    : [];

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100 flex items-center justify-center p-6">
        <div className="max-w-md w-full">
          <div className="bg-white rounded-3xl shadow-2xl p-12 text-center transform hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Sprout className="w-14 h-14 text-white" />
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-3">
              কৃষক ড্যাশবোর্ড
            </h1>
            <h2 className="text-xl text-gray-600 mb-6">Farmer Dashboard</h2>
            <p className="text-gray-600 mb-8 leading-relaxed">
              ব্লকচেইন-ভিত্তিক স্বচ্ছ কৃষি সরবরাহ চেইনে আপনাকে স্বাগতম<br />
              <span className="text-sm">Welcome to Transparent Agricultural Supply Chain</span>
            </p>
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-4 mb-6">
              <p className="text-sm text-green-800 font-semibold">🔐 সুরক্ষিত সংযোগ প্রয়োজন</p>
              <p className="text-xs text-green-700 mt-1">আপনার ওয়ালেট সংযুক্ত করুন</p>
            </div>
            <ConnectButton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Header */}
      <header className="bg-white border-b-2 border-green-100 shadow-lg sticky top-0 z-50 backdrop-blur-sm bg-white/95">
        <div className="container mx-auto px-6 py-5 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-xl shadow-lg">
              <Sprout className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                কৃষক ড্যাশবোর্ড
              </h1>
              <p className="text-xs text-gray-500">Farmer Dashboard</p>
            </div>
          </div>
          <ConnectButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Mint Harvest Form */}
          <div className="lg:col-span-2 bg-white rounded-3xl shadow-2xl p-10 border border-green-100 hover:shadow-green-200/50 transition-all duration-300">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-3">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <Package className="w-7 h-7 text-green-600" />
                  </div>
                  নতুন ফসল নিবন্ধন
                </h2>
                <p className="text-gray-500 text-sm mt-2 ml-16">Register New Harvest</p>
              </div>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* District Selection */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">1</span>
                  জেলা নির্বাচন করুন (Select District)
                </label>
                <select
                  value={formData.district}
                  onChange={(e) => setFormData({ ...formData, district: e.target.value, location: '' })}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white hover:border-green-300 cursor-pointer font-medium shadow-sm"
                  required
                >
                  <option value="">জেলা নির্বাচন করুন...</option>
                  {DISTRICTS.map((district) => (
                    <option key={district.value} value={district.value}>
                      {district.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Selection */}
              {formData.district && (
                <div className="group animate-fadeIn">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">2</span>
                    <MapPin className="w-4 h-4 text-green-600" />
                    উপজেলা/এলাকা (Sub-district/Area)
                  </label>
                  <select
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white hover:border-green-300 cursor-pointer font-medium shadow-sm"
                    required
                  >
                    <option value="">এলাকা নির্বাচন করুন...</option>
                    {locationOptions.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Crop Type */}
              <div className="group">
                <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                  <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">3</span>
                  ফসলের ধরন (Crop Type)
                </label>
                <select
                  value={formData.cropType}
                  onChange={(e) => setFormData({ ...formData, cropType: e.target.value })}
                  className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white hover:border-green-300 cursor-pointer text-lg font-medium shadow-sm"
                  required
                >
                  <option value="">ফসল নির্বাচন করুন...</option>
                  {CROP_TYPES.map((crop) => (
                    <option key={crop.value} value={crop.value}>
                      {crop.icon} {crop.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity and Price Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Quantity */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">4</span>
                    পরিমাণ (কেজি)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      className="w-full px-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white hover:border-green-300 font-medium shadow-sm"
                      placeholder="উদাহরণ: 1000"
                      min="1"
                      required
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">KG</span>
                  </div>
                </div>

                {/* Price */}
                <div className="group">
                  <label className="block text-sm font-bold text-gray-700 mb-3 flex items-center gap-2">
                    <span className="bg-green-100 text-green-600 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">5</span>
                    মূল্য (টাকা/কেজি)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-lg">৳</span>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full pl-10 pr-5 py-4 rounded-xl border-2 border-gray-200 focus:border-green-500 focus:ring-4 focus:ring-green-100 transition-all duration-200 bg-white hover:border-green-300 font-medium shadow-sm"
                      placeholder="উদাহরণ: 50"
                      min="1"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Total Calculation */}
              {formData.quantity && formData.price && (
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl p-5 animate-fadeIn">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700 font-semibold">মোট মূল্য (Total Value):</span>
                    <span className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                      ৳ {(parseInt(formData.quantity) * parseInt(formData.price)).toLocaleString()}
                    </span>
                  </div>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 text-white font-bold py-5 px-8 rounded-xl hover:shadow-2xl hover:shadow-green-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 text-lg flex items-center justify-center gap-3 relative overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-green-600 to-emerald-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                <span className="relative">🌾 ফসল নিবন্ধন করুন (Register Harvest)</span>
              </button>
            </form>
          </div>

          {/* Your Batches */}
          <div className="lg:col-span-1 bg-white rounded-3xl shadow-2xl p-8 border border-green-100 hover:shadow-green-200/50 transition-all duration-300 h-fit sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                  আপনার ব্যাচ
                </h2>
                <p className="text-gray-500 text-xs mt-1">Your Batches</p>
              </div>
              <div className="bg-green-100 text-green-700 font-bold px-4 py-2 rounded-full text-sm">
                {batches.length}
              </div>
            </div>
            
            {batches.length === 0 ? (
              <div className="text-center py-16">
                <div className="bg-gray-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-10 h-10 text-gray-400" />
                </div>
                <p className="text-gray-600 font-semibold mb-1">এখনো কোন ব্যাচ নেই</p>
                <p className="text-sm text-gray-400">
                  প্রথম ফসল নিবন্ধন করুন
                </p>
              </div>
            ) : (
              <div className="space-y-4 max-h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar pr-2">
                {batches.map((batch, index) => (
                  <div
                    key={batch.id}
                    className="group relative p-5 bg-gradient-to-br from-white to-green-50 rounded-2xl border-2 border-green-200 hover:border-green-400 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1.5 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                        #{batch.id}
                      </span>
                    </div>
                    
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-3xl">
                          {CROP_TYPES.find(c => c.value === batch.cropType)?.icon}
                        </span>
                        <div>
                          <h3 className="font-bold text-lg text-gray-800">
                            {CROP_TYPES.find(c => c.value === batch.cropType)?.label}
                          </h3>
                          <span className="text-xs text-green-600 font-semibold">
                            {batch.status}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2.5 text-sm">
                      <div className="flex items-start gap-2 text-gray-700">
                        <MapPin className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="line-clamp-2">
                          {batch.location}, {DISTRICTS.find(d => d.value === batch.district)?.label}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-3 pt-2 border-t border-green-200">
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">পরিমাণ</p>
                          <p className="font-bold text-gray-800">{batch.quantity} KG</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500 mb-0.5">মূল্য/KG</p>
                          <p className="font-bold text-green-600">৳{batch.price}</p>
                        </div>
                      </div>
                      
                      <div className="bg-green-100 rounded-lg p-2 mt-2">
                        <p className="text-xs text-gray-600">মোট মূল্য</p>
                        <p className="text-lg font-bold text-green-700">
                          ৳ {(parseInt(batch.quantity) * parseInt(batch.price)).toLocaleString()}
                        </p>
                      </div>
                      
                      <p className="flex items-center gap-1.5 text-gray-400 text-xs pt-2 border-t border-green-100">
                        <Clock className="w-3 h-3" />
                        {new Date(batch.timestamp).toLocaleString('bn-BD')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import Link from 'next/link';
import { Sprout, Store, ShoppingBag, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-100">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sprout className="w-16 h-16 text-green-600" />
            <h1 className="text-5xl font-bold text-gray-800">ShonaliChain</h1>
          </div>
          <h2 className="text-3xl font-bold text-green-700 mb-4">
            শোণালী চেইন - স্বচ্ছ কৃষি সরবরাহ চেইন
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Transparent Agricultural Supply Chain for Bangladesh
          </p>
          <p className="text-lg text-gray-500 mt-2">
            বগুড়া ও মুন্সীগঞ্জ থেকে আপনার কাছে সরাসরি
          </p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Farmer Dashboard */}
          <Link href="/dashboard/farmer">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-t-4 border-green-500">
              <div className="flex items-center justify-between mb-4">
                <Sprout className="w-12 h-12 text-green-600" />
                <ArrowRight className="w-6 h-6 text-green-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                কৃষক ড্যাশবোর্ড
              </h3>
              <p className="text-gray-600 mb-4">Farmer Dashboard</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ নতুন ফসল নিবন্ধন করুন</li>
                <li>✓ আপনার ব্যাচ ট্র্যাক করুন</li>
                <li>✓ সরাসরি বিক্রয় করুন</li>
              </ul>
            </div>
          </Link>

          {/* Wholesaler Dashboard */}
          <Link href="/dashboard/wholesaler">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-t-4 border-purple-500">
              <div className="flex items-center justify-between mb-4">
                <Store className="w-12 h-12 text-purple-600" />
                <ArrowRight className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                পাইকার ড্যাশবোর্ড
              </h3>
              <p className="text-gray-600 mb-4">Wholesaler Dashboard</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ উপলব্ধ ব্যাচ দেখুন</li>
                <li>✓ মূল্য প্রবণতা বিশ্লেষণ করুন</li>
                <li>✓ নিরাপদ এস্ক্রো পেমেন্ট</li>
              </ul>
            </div>
          </Link>

          {/* Consumer Dashboard */}
          <Link href="/dashboard/consumer">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 cursor-pointer border-t-4 border-blue-500">
              <div className="flex items-center justify-between mb-4">
                <ShoppingBag className="w-12 h-12 text-blue-600" />
                <ArrowRight className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                ক্রেতা ড্যাশবোর্ড
              </h3>
              <p className="text-gray-600 mb-4">Consumer Dashboard</p>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>✓ QR কোড স্ক্যান করুন</li>
                <li>✓ উৎস ট্র্যাক করুন</li>
                <li>✓ গুণমান যাচাই করুন</li>
              </ul>
            </div>
          </Link>
        </div>

        {/* Features Section */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            কেন ShonaliChain?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🔗</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">ব্লকচেইন নিরাপত্তা</h4>
                <p className="text-sm text-gray-600">সম্পূর্ণ স্বচ্ছ এবং অপরিবর্তনীয় রেকর্ড</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">ন্যায্য মূল্য</h4>
                <p className="text-sm text-gray-600">মধ্যস্থতাকারী ছাড়া সরাসরি লেনদেন</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🛡️</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">এস্ক্রো সুরক্ষা</h4>
                <p className="text-sm text-gray-600">পণ্য ডেলিভারি নিশ্চিত না হলে টাকা ফেরত</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">📊</span>
              </div>
              <div>
                <h4 className="font-bold text-gray-800 mb-1">অ্যান্টি-হোর্ডিং</h4>
                <p className="text-sm text-gray-600">কৃত্রিম দাম বৃদ্ধি রোধ করুন</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-600">
          <p className="text-sm">
            Built for BlockChain Bangladesh 2025 Hackathon 🇧🇩
          </p>
          <p className="text-xs mt-2 text-gray-500">
            Powered by Hardhat, Next.js, RainbowKit & Polygon
          </p>
        </div>
      </div>
    </div>
  );
}

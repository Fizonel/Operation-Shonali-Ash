// Mock data for Bogura and Munshiganj regions
export const DISTRICTS = [
  { value: 'bogura', label: 'বগুড়া (Bogura)', coordinates: { lat: 24.8465, lng: 89.3770 } },
  { value: 'munshiganj', label: 'মুন্সীগঞ্জ (Munshiganj)', coordinates: { lat: 23.5422, lng: 90.5305 } },
  { value: 'dhaka', label: 'ঢাকা (Dhaka)', coordinates: { lat: 23.8103, lng: 90.4125 } },
  { value: 'chittagong', label: 'চট্টগ্রাম (Chittagong)', coordinates: { lat: 22.3569, lng: 91.7832 } },
];

export const CROP_TYPES = [
  { value: 'jute', label: 'পাট (Jute)', icon: '🌿' },
  { value: 'potato', label: 'আলু (Potato)', icon: '🥔' },
  { value: 'rice', label: 'ধান (Rice)', icon: '🌾' },
  { value: 'wheat', label: 'গম (Wheat)', icon: '🌾' },
];

export const FARMER_LOCATIONS_BOGURA = [
  'Bogura Sadar',
  'Sherpur',
  'Adamdighi',
  'Kahaloo',
  'Nandigram',
  'Sariakandi',
  'Shajahanpur',
  'Dhunat',
  'Gabtali',
  'Sonatola',
  'Shibganj',
  'Dhupchanchia',
];

export const FARMER_LOCATIONS_MUNSHIGANJ = [
  'Munshiganj Sadar',
  'Sreenagar',
  'Sirajdikhan',
  'Louhajang',
  'Gazaria',
  'Tongibari',
];

export const MOCK_FARMERS = [
  { name: 'আব্দুল করিম (Abdul Karim)', location: 'Bogura Sadar', specialty: 'Jute' },
  { name: 'রহিমা খাতুন (Rahima Khatun)', location: 'Munshiganj Sadar', specialty: 'Potato' },
  { name: 'মোঃ জামাল উদ্দিন (Md. Jamal Uddin)', location: 'Sherpur, Bogura', specialty: 'Jute' },
  { name: 'ফাতেমা বেগম (Fatema Begum)', location: 'Sreenagar, Munshiganj', specialty: 'Potato' },
];

export const ROLE_MAP = {
  0: 'কৃষক (Farmer)',
  1: 'পরিবহনকারী (Transporter)',
  2: 'পাইকার (Wholesaler)',
  3: 'খুচরা বিক্রেতা (Retailer)',
};

export const ROLE_COLORS = {
  0: 'bg-green-100 text-green-800 border-green-300',
  1: 'bg-blue-100 text-blue-800 border-blue-300',
  2: 'bg-purple-100 text-purple-800 border-purple-300',
  3: 'bg-orange-100 text-orange-800 border-orange-300',
};

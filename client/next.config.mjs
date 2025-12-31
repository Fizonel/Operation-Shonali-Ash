/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack: (config, { isServer }) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    
    // Fix for Windows path issues and React Native dependencies
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
      '@react-native-async-storage/async-storage': false,
    };
    
    // Ignore React Native specific modules
    config.resolve.alias = {
      ...config.resolve.alias,
      '@react-native-async-storage/async-storage': false,
      'react-native': false,
    };
    
    return config;
  },
  // Disable SWC minifier on Windows to avoid path issues
  swcMinify: false,
  
  // Experimental features to help with Windows compatibility
  experimental: {
    esmExternals: 'loose',
  },
};

export default nextConfig;

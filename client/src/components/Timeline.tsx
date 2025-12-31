import { CheckCircle, Circle, MapPin, Clock } from 'lucide-react';

interface TimelineStep {
  location: string;
  timestamp: number;
  handler: string;
  role?: string;
  completed: boolean;
}

interface TimelineProps {
  steps: TimelineStep[];
}

export default function Timeline({ steps }: TimelineProps) {
  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleDateString('bn-BD', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-green-700 mb-8 text-center">
        সরবরাহ চেইন ট্র্যাকিং (Supply Chain Tracking)
      </h2>
      
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-green-400 to-green-300"></div>
        
        {/* Timeline Steps */}
        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="relative flex items-start gap-6">
              {/* Icon */}
              <div className="relative z-10 flex-shrink-0">
                {step.completed ? (
                  <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/50 animate-pulse">
                    <CheckCircle className="w-7 h-7 text-white" />
                  </div>
                ) : (
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                    <Circle className="w-7 h-7 text-gray-500" />
                  </div>
                )}
              </div>
              
              {/* Content Card */}
              <div
                className={`flex-1 p-5 rounded-xl shadow-lg transition-all duration-300 ${
                  step.completed
                    ? 'bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300'
                    : 'bg-gray-50 border-2 border-gray-200'
                }`}
              >
                {/* Location */}
                <div className="flex items-center gap-2 mb-2">
                  <MapPin
                    className={`w-5 h-5 ${
                      step.completed ? 'text-green-600' : 'text-gray-400'
                    }`}
                  />
                  <h3
                    className={`text-lg font-semibold ${
                      step.completed ? 'text-green-800' : 'text-gray-600'
                    }`}
                  >
                    {step.location}
                  </h3>
                </div>
                
                {/* Handler Info */}
                <div className="ml-7 space-y-1">
                  <p
                    className={`text-sm ${
                      step.completed ? 'text-green-700' : 'text-gray-500'
                    }`}
                  >
                    <span className="font-medium">পরিচালক (Handler):</span> {step.handler}
                  </p>
                  
                  {step.role && (
                    <p
                      className={`text-sm ${
                        step.completed ? 'text-green-600' : 'text-gray-500'
                      }`}
                    >
                      <span className="font-medium">ভূমিকা (Role):</span> {step.role}
                    </p>
                  )}
                  
                  {/* Timestamp */}
                  <div className="flex items-center gap-2 mt-2">
                    <Clock
                      className={`w-4 h-4 ${
                        step.completed ? 'text-green-500' : 'text-gray-400'
                      }`}
                    />
                    <p
                      className={`text-xs ${
                        step.completed ? 'text-green-600' : 'text-gray-400'
                      }`}
                    >
                      {formatDate(step.timestamp)}
                    </p>
                  </div>
                </div>
                
                {/* Progress Badge */}
                {step.completed && index === steps.filter(s => s.completed).length - 1 && (
                  <div className="mt-3 ml-7">
                    <span className="inline-block px-3 py-1 text-xs font-semibold text-green-800 bg-green-200 rounded-full">
                      বর্তমান অবস্থান (Current Location)
                    </span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Summary */}
      <div className="mt-8 p-4 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg border-l-4 border-green-500">
        <p className="text-sm text-green-800">
          <span className="font-semibold">মোট পদক্ষেপ (Total Steps):</span> {steps.length} |{' '}
          <span className="font-semibold">সম্পন্ন (Completed):</span>{' '}
          {steps.filter(s => s.completed).length}
        </p>
      </div>
    </div>
  );
}

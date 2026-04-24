import React from 'react';
import { Heart, Droplet, Brain, Activity } from 'lucide-react';

/**
 * VitalsCard Component
 * Displays individual vital metric with icon and value
 */
const VitalsCard = ({ type, value, unit, status = 'normal' }) => {
  const vitalsConfig = {
    bpm: {
      icon: Heart,
      label: 'Heart Rate',
      color: 'from-red-500 to-pink-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      iconColor: 'text-red-500'
    },
    spo2: {
      icon: Droplet,
      label: 'Blood Oxygen',
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      iconColor: 'text-blue-500'
    },
    stress: {
      icon: Brain,
      label: 'Stress Level',
      color: 'from-purple-500 to-indigo-600',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      iconColor: 'text-purple-500'
    },
    signal: {
      icon: Activity,
      label: 'Signal Quality',
      color: 'from-green-500 to-emerald-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      iconColor: 'text-green-500'
    }
  };

  const config = vitalsConfig[type] || vitalsConfig.bpm;
  const Icon = config.icon;

  // Determine status color
  const getStatusColor = () => {
    if (status === 'critical') return 'text-red-600';
    if (status === 'warning') return 'text-yellow-600';
    return 'text-green-600';
  };

  // Format value display
  const displayValue = type === 'signal' 
    ? `${Math.round(value * 100)}%` 
    : value;

  return (
    <div className={`${config.bgColor} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-transparent hover:border-gray-200`}>
      
      {/* Icon & Label */}
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-xl bg-gradient-to-br ${config.color} shadow-md`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <span className={`text-xs font-semibold px-3 py-1 rounded-full ${getStatusColor()} bg-white`}>
          {status}
        </span>
      </div>

      {/* Value */}
      <div className="mb-2">
        <div className="flex items-baseline space-x-2">
          <span className={`text-4xl font-bold ${config.textColor}`}>
            {displayValue}
          </span>
          {unit && (
            <span className="text-lg text-gray-500 font-medium">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Label */}
      <p className="text-sm font-medium text-gray-600">
        {config.label}
      </p>

      {/* Progress Bar (for signal quality) */}
      {type === 'signal' && (
        <div className="mt-4">
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full bg-gradient-to-r ${config.color} transition-all duration-500`}
              style={{ width: `${Math.round(value * 100)}%` }}
            />
          </div>
        </div>
      )}

    </div>
  );
};

export default VitalsCard;


import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  displayValue?: string;
}

const Slider: React.FC<SliderProps> = ({ label, value, min, max, step, onChange, disabled, displayValue }) => {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <label className="block text-sm font-medium text-stone-700">{label}</label>
        <span className="text-sm font-semibold text-amber-800 bg-amber-100 px-2 py-0.5 rounded">
          {displayValue || value}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="w-full h-2 bg-amber-200 rounded-lg appearance-none cursor-pointer disabled:cursor-not-allowed"
        style={{'--thumb-color': '#b45309'} as React.CSSProperties}
      />
      <style>{`
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 16px;
            height: 16px;
            background: var(--thumb-color);
            border-radius: 50%;
            cursor: pointer;
        }
        input[type="range"]::-moz-range-thumb {
            width: 16px;
            height: 16px;
            background: var(--thumb-color);
            border-radius: 50%;
            cursor: pointer;
        }
        input[type="range"]:disabled::-webkit-slider-thumb {
            background: #9ca3af;
        }
        input[type="range"]:disabled::-moz-range-thumb {
            background: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Slider;

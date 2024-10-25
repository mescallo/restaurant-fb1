import React from 'react';

interface RatingButtonProps {
  value: number;
  selected: boolean;
  onClick: (value: number) => void;
}

export const RatingButton: React.FC<RatingButtonProps> = ({ value, selected, onClick }) => {
  return (
    <button
      onClick={() => onClick(value)}
      className={`
        w-12 h-12 rounded-full text-lg font-semibold transition-all
        ${selected 
          ? 'bg-emerald-500 text-white scale-110 shadow-lg' 
          : 'bg-white text-gray-600 hover:bg-gray-50 border-2 border-gray-200'}
      `}
    >
      {value}
    </button>
  );
};
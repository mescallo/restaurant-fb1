import React from 'react';
import { RatingButton } from './RatingButton';

interface FeedbackQuestionProps {
  question: string;
  onRate: (rating: number) => void;
  currentRating: number | null;
}

export const FeedbackQuestion: React.FC<FeedbackQuestionProps> = ({
  question,
  onRate,
  currentRating,
}) => {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-sm">
      <h2 className="text-2xl font-medium text-gray-800 mb-6 text-center">
        {question}
      </h2>
      
      <div className="flex justify-center gap-4">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
          <RatingButton
            key={value}
            value={value}
            selected={currentRating === value}
            onClick={onRate}
          />
        ))}
      </div>
    </div>
  );
};
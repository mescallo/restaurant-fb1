import React from 'react';
import { PartyPopper } from 'lucide-react';

export const ThankYouScreen: React.FC<{ onRestart: () => void }> = ({ onRestart }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-emerald-50 to-emerald-100 p-6">
      <div className="text-center">
        <PartyPopper className="w-24 h-24 mx-auto mb-6 text-emerald-500" />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          ¡Gracias por su opinión!
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Su feedback nos ayuda a mejorar cada día.
        </p>
        <button
          onClick={onRestart}
          className="px-8 py-3 bg-emerald-500 text-white rounded-lg text-lg font-medium hover:bg-emerald-600 transition-colors"
        >
          Nueva Encuesta
        </button>
      </div>
    </div>
  );
};
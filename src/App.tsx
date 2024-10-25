import React, { useEffect } from 'react';
import { ChefHat } from 'lucide-react';
import { FeedbackQuestion } from './components/FeedbackQuestion';
import { ThankYouScreen } from './components/ThankYouScreen';
import { feedbackQuestions } from './data/questions';
import { useFeedbackSession } from './hooks/useFeedbackSession';

function App() {
  const { sessionId, responses, startNewSession, saveResponse } = useFeedbackSession();
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);

  useEffect(() => {
    if (!sessionId) {
      startNewSession();
    }
  }, [sessionId, startNewSession]);

  const handleRating = (rating: number) => {
    const newResponse = {
      questionId: feedbackQuestions[currentQuestionIndex].id,
      rating,
      timestamp: new Date().toISOString(),
    };

    saveResponse(newResponse);

    if (currentQuestionIndex < feedbackQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    startNewSession();
    setCurrentQuestionIndex(0);
    setCompleted(false);
  };

  if (completed) {
    return <ThankYouScreen onRestart={handleRestart} />;
  }

  const currentQuestion = feedbackQuestions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / feedbackQuestions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            <ChefHat className="w-8 h-8 text-emerald-600 mr-3" />
            <h1 className="text-3xl font-bold text-gray-900">La Petit</h1>
          </div>
        </div>
      </header>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 h-1">
        <div
          className="bg-emerald-500 h-1 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col items-center justify-center min-h-[60vh]">
          <FeedbackQuestion
            question={currentQuestion.text}
            onRate={handleRating}
            currentRating={
              responses.find(r => r.questionId === currentQuestion.id)?.rating ?? null
            }
          />
          
          {/* Question counter */}
          <div className="mt-8 text-gray-500">
            Pregunta {currentQuestionIndex + 1} de {feedbackQuestions.length}
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
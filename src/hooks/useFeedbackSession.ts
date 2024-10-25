import { useState, useCallback } from 'react';
import { createFeedbackSession, saveFeedbackResponse, createDepartmentNotification } from '../db';
import { departments, feedbackQuestions } from '../data/questions';
import type { FeedbackResponse } from '../types';

export const useFeedbackSession = () => {
  const [sessionId, setSessionId] = useState<number | null>(null);
  const [responses, setResponses] = useState<FeedbackResponse[]>([]);
  
  const startNewSession = useCallback(() => {
    const newSessionId = createFeedbackSession();
    setSessionId(newSessionId);
    setResponses([]);
    return newSessionId;
  }, []);

  const saveResponse = useCallback((response: FeedbackResponse) => {
    if (!sessionId) return;

    const question = feedbackQuestions.find(q => q.id === response.questionId);
    if (!question) return;

    // Save the response
    const responseId = saveFeedbackResponse(sessionId, response, question.category);

    // Create notifications for relevant departments
    departments.forEach(dept => {
      if (dept.notifyOnCategories.includes(question.category)) {
        createDepartmentNotification(dept.id, responseId);
      }
    });

    setResponses(prev => [...prev, response]);
  }, [sessionId]);

  return {
    sessionId,
    responses,
    startNewSession,
    saveResponse
  };
};
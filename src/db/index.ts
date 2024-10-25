import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import type { FeedbackResponse } from '../types';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const db = new Database(join(__dirname, 'feedback.db'));

export const createFeedbackSession = () => {
  const stmt = db.prepare('INSERT INTO feedback_sessions DEFAULT VALUES');
  const result = stmt.run();
  return result.lastInsertRowid as number;
};

export const saveFeedbackResponse = (
  sessionId: number,
  response: FeedbackResponse,
  category: string
) => {
  const stmt = db.prepare(`
    INSERT INTO feedback_responses (session_id, question_id, rating, category, timestamp)
    VALUES (?, ?, ?, ?, ?)
  `);
  
  const result = stmt.run(
    sessionId,
    response.questionId,
    response.rating,
    category,
    response.timestamp
  );
  
  return result.lastInsertRowid as number;
};

export const createDepartmentNotification = (
  departmentId: string,
  feedbackResponseId: number
) => {
  const stmt = db.prepare(`
    INSERT INTO department_notifications (department_id, feedback_response_id)
    VALUES (?, ?)
  `);
  
  return stmt.run(departmentId, feedbackResponseId);
};

export const getRecentFeedback = (limit = 10) => {
  return db.prepare(`
    SELECT 
      fr.question_id,
      fr.rating,
      fr.category,
      fr.timestamp,
      fs.id as session_id
    FROM feedback_responses fr
    JOIN feedback_sessions fs ON fr.session_id = fs.id
    ORDER BY fr.timestamp DESC
    LIMIT ?
  `).all(limit);
};

export const getDepartmentAverages = () => {
  return db.prepare(`
    SELECT 
      category,
      AVG(rating) as average_rating,
      COUNT(*) as total_responses
    FROM feedback_responses
    GROUP BY category
  `).all();
};

export const getUnreadNotifications = (departmentId: string) => {
  return db.prepare(`
    SELECT 
      dn.id,
      fr.question_id,
      fr.rating,
      fr.category,
      fr.timestamp
    FROM department_notifications dn
    JOIN feedback_responses fr ON dn.feedback_response_id = fr.id
    WHERE dn.department_id = ? AND dn.is_read = FALSE
    ORDER BY dn.timestamp DESC
  `).all(departmentId);
};

export const markNotificationAsRead = (notificationId: number) => {
  const stmt = db.prepare(`
    UPDATE department_notifications
    SET is_read = TRUE
    WHERE id = ?
  `);
  
  return stmt.run(notificationId);
};
import mongoose from 'mongoose';
import QuizModel from './model.js';

export const createQuiz = async (courseId, quiz) => {
  delete quiz._id; // Remove _id if present
  const newQuiz = { ...quiz, course: courseId };
  const createdQuiz = await QuizModel.create(newQuiz);
  return createdQuiz;
};


export const findAllQuizzes = async () => {
  try {
    const quizzes = await QuizModel.find();
    return quizzes;
  } catch (error) {
    console.error('Error finding quizzes:', error);
    throw error;
  }
}

export const findQuizById = async (quizId) => {
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new Error(`Invalid quizId: ${quizId}`);
  }
  try {
    const quiz = await QuizModel.findById(quizId);
    return quiz;
  } catch (error) {
    console.error('Error finding quiz by ID:', error);
    throw error;
  }
}

export const updateQuiz = async (quizId, quiz) => {
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new Error(`Invalid quizId: ${quizId}`);
  }
  try {
    const updatedQuiz = await QuizModel.updateOne({ _id: quizId }, { $set: quiz });
    return updatedQuiz;
  } catch (error) {
    console.error('Error updating quiz:', error);
    throw error;
  }
}

export const deleteQuiz = async (quizId) => {
  if (!mongoose.Types.ObjectId.isValid(quizId)) {
    throw new Error(`Invalid quizId: ${quizId}`);
  }
  try {
    const result = await QuizModel.deleteOne({ _id: quizId });
    return result;
  } catch (error) {
    console.error('Error deleting quiz:', error);
    throw error;
  }
}

export const findQuizzesForCourse = async (courseId) => {
  try {
    const quizzes = await QuizModel.find({ course: courseId });
    return quizzes;
  } catch (error) {
    console.error('Error finding quizzes for course:', error);
    throw error;
  }
}
import * as dao from "./dao.js";
import mongoose from 'mongoose';

export default function QuizzesRoutes(app) {

  const createQuiz = async (req, res) => {
    const { cid } = req.params;
    try {
      console.log('Creating quiz for course ID:', cid);
      const quiz = await dao.createQuiz(cid, req.body);
      res.json(quiz);
    } catch (err) {
      console.error('Error creating quiz:', err);
      res.status(500).send(err);
    }
  };

  const deleteQuiz = async (req, res) => {
    const { qid } = req.params;
    try {
      console.log('Deleting quiz with ID:', qid);
      const status = await dao.deleteQuiz(qid);
      res.json(status);
    } catch (err) {
      console.error('Error deleting quiz:', err);
      res.status(500).send(err);
    }
  };

  const findAllQuizzes = async (req, res) => {
    try {
      console.log('Finding all quizzes');
      const quizzes = await dao.findAllQuizzes();
      res.json(quizzes);
    } catch (err) {
      console.error('Error finding all quizzes:', err);
      res.status(500).send(err);
    }
  };

  const findQuizById = async (req, res) => {
    const { qid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(qid)) {
      return res.status(400).send("Invalid Quiz ID");
    }
    try {
      console.log('Finding quiz with ID:', qid);
      const quiz = await dao.findQuizById(qid);
      if (quiz) {
        res.json(quiz);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('Error finding quiz by ID:', err);
      res.status(500).send(err);
    }
  };

  const updateQuiz = async (req, res) => {
    const { qid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(qid)) {
      return res.status(400).send("Invalid Quiz ID");
    }
    try {
      console.log('Updating quiz with ID:', qid);
      const status = await dao.updateQuiz(qid, req.body);
      res.json(status);
    } catch (err) {
      console.error('Error updating quiz:', err);
      res.status(500).send(err);
    }
  };

  const findQuizzesForCourse = async (req, res) => {
    const { cid } = req.params;
    if (!mongoose.Types.ObjectId.isValid(cid)) {
      return res.status(400).send("Invalid Course ID");
    }
    try {
      console.log('Finding quizzes for course ID:', cid);
      const quizzes = await dao.findQuizzesForCourse(cid);
      if (quizzes) {
        res.json(quizzes);
      } else {
        res.sendStatus(404);
      }
    } catch (err) {
      console.error('Error finding quizzes for course:', err);
      res.status(500).send(err);
    }
  };

  app.post("/api/courses/:cid/quizzes", createQuiz);
  app.delete("/api/quizzes/:qid", deleteQuiz);
  app.get("/api/quizzes", findAllQuizzes);
  app.get("/api/quizzes/:qid", findQuizById);
  app.put("/api/quizzes/:qid", updateQuiz);
  app.get("/api/courses/:cid/quizzes", findQuizzesForCourse);
  app.get("/api/courses/:cid/quizzes/:qid", findQuizById); // Add this line
}
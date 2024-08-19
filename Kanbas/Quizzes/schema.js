import mongoose from "mongoose";
const quizzesSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: "" },
    quizType: {
      type: String,
      enum: [
        "Graded Quiz",
        "Practice Quiz",
        "Graded Survey",
        "Ungraded Survey",
      ],
      default: "Graded Quiz",
    },
    assignmentGroup: {
      type: String,
      enum: ["QUIZZES", "EXAMS", "ASSIGNMENTS", "PROJECT"],
      default: "QUIZZES",
    },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    showCorrectAnswers: {
      type: Boolean,
      default: false,
    },
    accessCode: { type: String, default: "" },
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    published: { type: Boolean, default: false },
    dueDate: { type: Date, },
    availableDate: { type: Date,  },
    untilDate: { type: Date,  },
    points: { type: Number, default: 0 },
    numQuestions: { type: Number, default: 0 },
    course: { type: String, required: true },
    attempts: {type: Number, default: 1},
  },
  { collection: "quizzes" }
);
export default quizzesSchema;
import mongoose from "mongoose";
const questionSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    quiz: { type: String},
    type: {
      type: String,
      enum: ["multiple-choice", "fill-in-the-blank", "true-false"],
    },
    points: Number,
    description: String,
    options: [String],
    answers: [String],
  },

  { collection: "questions" }
);
export default questionSchema;
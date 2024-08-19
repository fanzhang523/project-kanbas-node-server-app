import express from 'express'
import "dotenv/config";
import session from 'express-session';

import CourseRoutes from "./Kanbas/Courses/routes.js";
import UserRoutes from "./Users/routes.js";

import ModuleRoutes from "./Kanbas/Modules/routes.js";
import cors from "cors";
import AssignmnetsRoutes from './Kanbas/Assignments/routes.js';
import QuizzesRoutes from './Kanbas/Quizzes/routes.js';
import mongoose from "mongoose";

import Hello from './Hello.js';
import QuestionsRoutes from './Kanbas/Questions/routes.js';
import axios from 'axios';


axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Error intercepted:', error);
    return Promise.reject(error);
  }
);


const CONNECTION_STRING = process.env.MONGO_CONNECTION_STRING || "mongodb://127.0.0.1:27017/kanbas"
mongoose.connect(CONNECTION_STRING);

const app = express()
app.use(
 cors({
   credentials: true,
   origin: process.env.NETLIFY_URL || "http://localhost:3000",
 })
);
const sessionOptions = {
  secret: process.env.SESSION_SECRET || "kanbas",
  resave: false,
  saveUninitialized: false,
};
if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.NODE_SERVER_DOMAIN,
  };
}
app.use(session(sessionOptions)); 
app.use(express.json()); // do all your work after this line

AssignmnetsRoutes(app)
ModuleRoutes(app);
CourseRoutes(app);
Hello(app)
QuizzesRoutes(app)
QuestionsRoutes(app)
UserRoutes(app)


app.listen(process.env.PORT || 4000)
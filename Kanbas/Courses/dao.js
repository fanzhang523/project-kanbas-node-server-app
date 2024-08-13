import CourseModel from "./model.js";


export const createCourse = (course) => CourseModel.create(course);


export const findAllCourses = () => CourseModel.find();


export const findCourseById = (courseId) => CourseModel.findById(courseId);


export const updateCourse = (courseId, course) =>
  CourseModel.findByIdAndUpdate(courseId, course, { new: true });


export const deleteCourse = (courseId) => CourseModel.findByIdAndDelete(courseId);

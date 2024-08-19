import * as dao from "./dao.js";

export default function CourseRoutes(app) {
  const createCourse = async (req, res) => {
    try {
      const course = req.body;
      delete course._id;  
      const newCourse = await dao.createCourse(course);
      res.status(201).json(newCourse);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteCourse = async (req, res) => {
    try {
      const { id } = req.params;
      const status = await dao.deleteCourse(id);
      res.json(status);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  const findAllCourses = async (req, res) => {
    try {
      const courses = await dao.findAllCourses();
      res.json(courses);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  const findCourseById = async (req, res) => {
    try {
      const { courseId } = req.params;
      const course = await dao.findCourseById(courseId);
      if (course) {
        res.json(course);
      } else {
        res.sendStatus(404);
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  const updateCourse = async (req, res) => {
    try {
      const { id } = req.params;
      console.log(`Received request to update course with ID: ${id}`);
      const status = await dao.updateCourse(id, req.body);
      console.log(`Update status: ${JSON.stringify(status)}`);
      res.sendStatus(status.modifiedCount ? 204 : 404);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  const enrollUser = async (req, res) => {
    try {
      const { id, userId } = req.params;
      console.log(`Current user id: ${userId}`);
      
      const result = await dao.enrollUserInCourse(id, userId);
  
      // Check if any documents were matched and the operation was acknowledged
      if (result.matchedCount > 0 && result.acknowledged) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: 'Course not found or user already enrolled' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: error.message });
    }
  };

  app.post("/api/courses", createCourse);
  app.get("/api/courses", findAllCourses);
  app.get("/api/courses/:courseId", findCourseById);
  app.put("/api/courses/:id", updateCourse);
  app.delete("/api/courses/:id", deleteCourse);
  app.put('/api/courses/:id/enroll/:userId', enrollUser);
}
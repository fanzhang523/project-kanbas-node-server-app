import * as dao from "./dao.js";

export default function CourseRoutes(app) {
    app.put("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        const course = req.body;
        try {
            await dao.updateCourse(id, course);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.delete("/api/courses/:id", async (req, res) => {
        const { id } = req.params;
        try {
            await dao.deleteCourse(id);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.post("/api/courses", async (req, res) => {
        const course = req.body;
        try {
            const createdCourse = await dao.createCourse(course);
            res.status(201).json(createdCourse);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get("/api/courses", async (req, res) => {
        try {
            const courses = await dao.findAllCourses();
            res.json(courses);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get("/api/courses/:id", async (req, res) => {
        try {
            const course = await dao.findCourseById(req.params.id);
            if (course) {
                res.json(course);
            } else {
                res.status(404).send("Course not found");
            }
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}

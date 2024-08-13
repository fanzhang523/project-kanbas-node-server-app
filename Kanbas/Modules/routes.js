import * as dao from "./dao.js"; 

export default function ModuleRoutes(app) {
    app.put("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        const module = req.body;
        try {
            await dao.updateModule(mid, module);
            res.sendStatus(204);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.delete("/api/modules/:mid", async (req, res) => {
        const { mid } = req.params;
        try {
            await dao.deleteModule(mid);
            res.sendStatus(200);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.post("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        const newModule = {
            ...req.body,
            course: cid,
        };
        try {
            const createdModule = await dao.createModule(newModule);
            res.status(201).json(createdModule);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });

    app.get("/api/courses/:cid/modules", async (req, res) => {
        const { cid } = req.params;
        try {
            const modules = await dao.findModulesByCourseId(cid);
            res.json(modules);
        } catch (error) {
            res.status(500).send(error.message);
        }
    });
}

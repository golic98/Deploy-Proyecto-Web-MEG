import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
    try {
        const { title, description, image, date } = req.body;
        const newTask = new Task({
            title,
            description,
            image,
            date,
            user: req.user.id
        });
        const saveTask = await newTask.save();
        res.json(saveTask);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear un task" });
    }
}

export const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({ user: req.user.id }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(402).json({ message: "Error al obtener las tareas" });
    }
}

export const getTaskHome = async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
}

export const getOneTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id).populate("user");
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
}

export const deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
}

export const updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
}
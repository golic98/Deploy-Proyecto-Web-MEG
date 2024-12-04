import Task2 from "../models/task2.model.js";

export const createTask2 = async (req, res) => {
    try {
        const { title2, description2, image, date2 } = req.body;
        const newTask = new Task2({
            title2,
            description2,
            image,
            date2,
            user: req.user.id
        });
        const saveTask = await newTask.save();
        res.json(saveTask);
    } catch (error) {
        return res.status(500).json({ message: "Error al crear un task" });
    }
}

export const getTask2 = async (req, res) => {
    try {
        const tasks = await Task2.find({ user: req.user.id }).populate("user");
        res.json(tasks);
    } catch (error) {
        return res.status(402).json({ message: "Error al obtener las tareas" });
    }
}

export const getTaskHome2 = async (req, res) => {
    const tasks = await Task2.find();
    res.json(tasks);
}

export const getOneTask2 = async (req, res) => {
    try {
        const task = await Task2.findById(req.params.id).populate("user");
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
}

export const deleteTask2 = async (req, res) => {
    try {
        const task = await Task2.findByIdAndDelete(req.params.id);
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        return res.sendStatus(204);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
}

export const updateTask2 = async (req, res) => {
    try {
        const task = await Task2.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!task) return res.status(404).json({ message: "Tarea no encontrada" });
        res.json(task);
    } catch (error) {
        return res.status(404).json({ message: "Task no encontrado" });
    }
}
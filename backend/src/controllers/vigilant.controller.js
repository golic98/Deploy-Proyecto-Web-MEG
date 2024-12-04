import Schedule from "../models/schedule.model.js";
import Visit from "../models/visit.model.js";

export const createSchedule = async (req, res) => {
    try {
        const { name, lunes, martes, miercoles, jueves, viernes, sabado, domingo } = req.body;
        const newSchedule = new Schedule({
            name, lunes, martes, miercoles, jueves, viernes, sabado, domingo
        });

        const saveSchedule = await newSchedule.save();
        res.json(saveSchedule);
    } catch (error) {
        console.log("Error al almacenar un horario");
    }
}

export const createVisit = async (req, res) => {
    const { visitName, dui, numPlaca, visitHouse, date } = req.body;
    
    try {
        const newVisit = new Visit({
            visitName, dui, numPlaca, visitHouse, date
        });

        const saveSchedule = await newVisit.save();
        res.json(saveSchedule);
    } catch (error) {
        console.log("Error al almacenar una visita");
    }
}

export const getAllSchedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();
        res.json(schedules);
    } catch (error) {
        console.log("Error al obtener resultados", error);
    }
}

export const getAllVisits = async (req, res) => {
    const visit = await Visit.find();
    res.json(visit);
}
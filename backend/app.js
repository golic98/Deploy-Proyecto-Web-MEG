import express from "express";
import 'dotenv/config';
import mainRouter from "./src/routes/route.main.js";
import { connectiondb } from "./src/config/dbConnection.js";
import cookieParser from "cookie-parser";
import taskRoute from "./src/routes/task.route.js";
import cors from "cors";
import vigilantRoute from "./src/routes/vigilant.route.js";

const app = express();

connectiondb();

app.use(cors({ origin: "http://44.207.4.141/5173", credentials: true })); 
app.use(express.json());
app.use(cookieParser());
app.use("/meg", mainRouter);
app.use("/meg", taskRoute);
app.use("/meg", vigilantRoute);

app.use("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "archivo.html")); 
});

const PORT = process.env.PORT || 1200;
app.listen(PORT, () => {
    console.log("El servidor está trabajando en el puerto: " + PORT);
});
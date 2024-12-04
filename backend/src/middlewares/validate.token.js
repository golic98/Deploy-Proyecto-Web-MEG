import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../token/token.js";

export const authRequired = (req, res, next) => {
    const { token } = req.cookies;

    if(!token) {
        return res.status(401).json({ message: "No hay token, autorizacion denegada"});
    }

    jwt.verify(token, TOKEN_SECRET, (error, user) => {
        if(error) return res.status(401).json({ message: "Token inválido" });
        req.user = user;
    });
    
    next();
};
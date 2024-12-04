import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { createAccessToken } from "../libs/jwt.js";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../token/token.js";

export const register = async (req, res) => {
    const { name, username, email, password, telephone, age } = req.body;

    try {

        const userFound = await User.findOne({ username });

        if (userFound) {
            return res.status(400).json(["Usuario repetido"]);
        }

        const passwordHash = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            username,
            email,
            password: passwordHash,
            telephone,
            age
        });

        const userSave = await newUser.save();
        const token = await createAccessToken({ id: userSave._id });

        res.cookie('token', token);
        res.json({
            id: userSave._id,
            name: userSave.name,
            username: userSave.username,
            email: userSave.email,
            createAt: userSave.createdAt,
            updateAt: userSave.updatedAt
        });

    } catch (error) {
        console.log("Error: No se pudo registrar usuario, consulte al administrador");
    }
};

export const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userFound = await User.findOne({ username });

        if (!userFound) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(password, userFound.password);

        if (!isPasswordValid) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = await createAccessToken({ id: userFound._id });

        res.cookie('token', token);
        res.json({
            id: userFound._id,
            name: userFound.name,
            username: userFound.username,
            email: userFound.email,
            createAt: userFound.createdAt,
            updateAt: userFound.updatedAt
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const logout = (req, res) => {
    res.cookie("token", "", {
        expires: new Date(0)
    })
    return res.sendStatus(200);
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id);

    if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" });
    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        createAt: userFound.createdAt,
        updateAt: userFound.updatedAt,
    });
};

export const verifyToken = async (req, res) => {
    const { token } = req.cookies

    if (!token) return res.status(401).json({ message: "No autorizado" });

    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
        if (error) return res.status(401).json({ message: "No autorizado" });

        const userFound = await User.findById(user.id);

        if (!userFound) return res.status(401).json({ message: "No autorizado" });

        return res.json({
            id: userFound._id,
            name: userFound.name,
            username: userFound.username,
            email: userFound.email,
            telephone: userFound.telephone,
            age: userFound.age
        });
    });
}

export const getAllUsers = async (req, res) => {
    const users = await User.find();
    if (users.length === 0) {
        return res.status(400).json({ message: "No se encontraron usuarios" });
    }

    const filterUser = users.filter(user => user.username !== "meg");
    return res.json(
        filterUser.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }))
    );
}

export const getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(400).json({ message: "No se encontraron usuarios" });
        }

        return res.json(users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        })));
    } catch (error) {
        return res.status(500).json({ message: "Error al obtener usuarios", error: error.message });
    }
};


export const deleteOneUser = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        return res.sendStatus(204);
    } catch (error) {
        console.log(error);
    }
}

export const getOneProfile = async (req, res) => {
    try {
        const profile = await User.findById(req.params.id);
        if (!profile) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(profile);
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
}

export const updateProfile = async (req, res) => {
    try {
        const profile = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!profile) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(profile);
    } catch (error) {
        return res.status(404).json({ message: "Usuario no encontrado" });
    }
}
import Pay from "../models/pay.vigilance.model.js";
import bcrypt from "bcrypt";

export const addPayVigilance = async (req, res) => {
    try {
        const { numberTarget, context, amount, date, cvc, user } = req.body;
        const targetFound = await Pay.findOne({ numberTarget });

        if (targetFound) {
            return re(400).json(["Error: Consulte con el administrador"]);
        }

        const targetHash = await bcrypt.hash(numberTarget, 10);
        const newPay = new Pay({
            numberTarget: targetHash,
            context, 
            amount, 
            date, 
            cvc,
            user: req.user.id
        });
        const savePay = await newPay.save();
        res.json(savePay);
    } catch (error) {
        console.log("Error al guardar un pago", error);
    }
};

export const getAllPay = async (req, res) => {
    try {
        const pay = await Pay.find();
        res.json(pay);
    } catch (error) {
        console.log(error);
    }
};
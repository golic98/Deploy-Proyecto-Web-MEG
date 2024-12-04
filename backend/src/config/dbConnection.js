import mongoose from "mongoose";
import "dotenv/config";

export const connectiondb = async() => {
    const URI = process.env.MONGO_URL;
    
    if(!URI){
        throw new Error('No se ha definido la URI de la base de datos');
    }

    try{
        await mongoose.connect(URI);
        console.log("Conectado a MongoDB");
    }catch(e){
        console.error(e);
        throw new Error('Error a la hora de iniciar la base de datos');
    }
}
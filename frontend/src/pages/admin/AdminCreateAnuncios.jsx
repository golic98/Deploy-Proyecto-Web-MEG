import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useEffect, useState } from "react";
import TaskCardAdmin2 from "../../components/TaskCardAdmin2.jsx";
import assets from "../../../src/assets";
import "./AdminCreateAnuncios.css";

function AdminCreateReports() {

    const { register, handleSubmit, setValue } = useForm();
    const { createTask, tasksAdmin2, getTaskAdmin2 } = useTask();
    const [imageBase64, setImageBase64] = useState("");
    const [imageError, setImageError] = useState("");

    useEffect(() => {
        getTaskAdmin2();
    }, []);

    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const validImageTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
            if (!validImageTypes.includes(file.type)) {
                setImageError("Por favor, selecciona un archivo de imagen válido, por ejemplo: JPG, PNG, GIF, WEBP.");
                setImageBase64("");
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                setImageBase64(reader.result);
                setValue("image", reader.result);
                setImageError("");
            };
            reader.readAsDataURL(file);
        }
    };

    const onSubmit = handleSubmit((data) => {
        if (imageBase64) {
            const formData = { ...data, image: imageBase64 };
            createTask(formData);
        } else {
            setImageError("La imagen no es válida o no se ha seleccionado ninguna.");
        }
    });

    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div>
            <div>
                <nav className="user-home-navbar">
                    <div className="user-home-navbar-left">
                        <Link>
                            <img src={assets.meg} alt="Logo MEG" className="user-home-logo" />
                        </Link>
                    </div>
                    <div className="user-home-navbar-right">
                        <Link to="/admin">
                            <img
                                src={assets.casa}
                                alt="Inicio"
                                className="user-home-icono"
                            />
                        </Link>
                        <div className="user-home-dropdown">
                            <Link to="/profileAdmin">
                                <img
                                    src={assets.usuario1}
                                    alt="Usuario"
                                    className="user-home-icono-usuario"
                                />
                            </Link>
                        </div>
                    </div>
                </nav>
            </div>
            <br />
            <div className="add-topic">
                <form onSubmit={onSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Ingrese el titulo de su reporte"
                            {...register("title2")}
                            autoFocus
                        />
                    </div>
                    <div>
                        <textarea
                            rows={3}
                            placeholder="Descripción"
                            {...register("description2")}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type="file"
                            onChange={handleImageChange}
                        />
                        {imageError && <p style={{ color: "red" }}>{imageError}</p>} { }
                    </div>
                    <button onClick={handleReload}>Publicar</button>
                </form>
            </div>
            <div>
                {
                    tasksAdmin2.map(task => (<TaskCardAdmin2 task={task} key={task._id} />))
                }
            </div>
        </div>
    )
}

export default AdminCreateReports;

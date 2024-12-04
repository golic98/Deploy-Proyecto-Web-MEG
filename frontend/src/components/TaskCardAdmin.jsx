import { useAuth } from "../context/AuthContext.jsx";
import { useTask } from "../context/TaskContext";
import { MdModeEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { useNavigate, useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import "./TaskCard.css";

function TaskCardAdmin({ task }) {

    const { logout, user } = useAuth();
    const { setValue } = useForm();
    const { oneTask, deleteTask, updateTask } = useTask();
    const navigate = useNavigate();
    const params = useParams();

    const handleReload = () => {
        window.location.reload();
    };

    useEffect(() => {
        async function loadTask() {
            if (params.id) {
                const task = await oneTask(params.id);
                console.log(task);
                setValue("title", task.title);
                setValue("description", task.description);
            }
        }
        loadTask();
    }, []);

    return (
        <div>
            <div className="task-card-container">
                <div className="card">
                    <h2>Titulo: {task.title}</h2>
                    <p>Descripción: {task.description}</p>
                    <p>Fecha de publicación: {new Date(task.date).toLocaleDateString()}</p>
                    <p>ID usuario: {task.user}</p>
                    <div className="imagen-card">
                        <img src={task.image} width={200} height={200} />
                    </div>
                    <div>
                        <button onClick={() => { deleteTask(task._id), handleReload() }}>
                            <MdDelete />
                        </button>
                        <Link to={`/task/${task._id}`}>
                            <MdModeEdit />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskCardAdmin;
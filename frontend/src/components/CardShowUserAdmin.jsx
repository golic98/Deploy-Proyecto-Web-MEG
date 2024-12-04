import { MdDelete } from "react-icons/md";
import { useAuth } from "../context/AuthContext";
import "./AdminDeleteUser.css";

export default function CardShowUserAdmin({user}) {
    
    const { deleteUser } = useAuth();

    const handleReload = () => {
        window.location.reload();
    };

    return(
        <div>
            <div className="card">
                <h2>{user.username}</h2>
                <p>{user.email}</p>
                <button onClick={() => { deleteUser(user.id), handleReload() }}>
                    <MdDelete />
                </button>
            </div>
        </div>
    )
};
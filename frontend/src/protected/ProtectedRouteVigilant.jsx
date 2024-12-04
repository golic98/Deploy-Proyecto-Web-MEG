import { useAuth } from "../context/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRouteVigilant() {
    const { loading, isAuthenticate, user } = useAuth();
    if (loading) return <h3>Loading..</h3>;
    if (!isAuthenticate) return <Navigate to={"/"} replace />
    if(user.username === "vigilant") return (<Outlet />);
};
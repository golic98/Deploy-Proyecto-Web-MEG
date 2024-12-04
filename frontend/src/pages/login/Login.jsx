import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import assets from "../../assets"; // Importa el archivo de assets
import "./Login.css";

function Login({ onClose }) {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const { signin, errors: signinErrors, isAuthenticate, user } = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    const handleGoogleSignIn = async () => {
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            const data = {
                username: user.email.split("@")[0],
                password: ""
            };
            signin(data);
        } catch (error) {
            console.error("Error al iniciar sesión con Google:", error);
        }
    };

    useEffect(() => {
        if (isAuthenticate) {
            if (user.username === "meg") {
                navigate("/admin");
            } else {
                navigate("/user");
            }
        }
    }, [isAuthenticate, user, navigate]);

    useEffect(() => {
        if (isAuthenticate) {
            if (user.username === "vigilant") {
                navigate("/vigilant");
            }
        }
    }, [isAuthenticate, user, navigate]);

    return (
        <div className="login-modal-overlay">
            <div className="login-modal">
                <button className="login-close-button" onClick={onClose}>
                    &times;
                </button>
                {/* Utilizando assets.meg */}
                <img src={assets.meg} alt="MEG Logo" className="login-MEG-logo" />
                <h2 className="login-title">Inicia sesión</h2>
                <button onClick={handleGoogleSignIn} className="login-google-button">
                    {/* Utilizando assets.google */}
                    <img src={assets.google} alt="Google" className="login-google-icon" />
                    Entrar con Google
                </button>
                <div className="login-divider">
                    <hr className="login-divider-line" />
                    <span className="login-divider-text">o</span>
                    <hr className="login-divider-line" />
                </div>
                {
                    signinErrors.map((error, i) => (
                        <div className="login-error" key={i}>
                            {error}
                        </div>
                    ))
                }
                <form onSubmit={onSubmit} className="login-form">
                    <input type="text" {...register("username", { required: true })}
                        className="login-input"
                        placeholder="Usuario o email"
                    />
                    {
                        errors.username && (<p className="login-error-text">El usuario es requerido</p>)
                    }
                    <input type="password" {...register("password", { required: true })}
                        className="login-input"
                        placeholder="Contraseña"
                    />
                    {
                        errors.password && (<p className="login-error-text">La contraseña es requerida</p>)
                    }
                    <Link to="/forgot-password" className="login-forgot-password">¿Has olvidado tu contraseña?</Link>
                    <button type="submit" className="login-button">Aceptar</button>
                </form>
                <p>¿No tienes cuenta? <Link to={"/register"} className="login-register-link">Ve a registrarte</Link> </p>
            </div>
        </div>
    );
}

export default Login;

{/*areglos en login*/}
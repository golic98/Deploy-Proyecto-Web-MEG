import { useState } from "react";
import "./Home.css";
import Login from "../login/Login";
import Register from "../register/Register";
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { auth } from "../../api/firebase.js";
import assets from "../../../src/assets";

function Home() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  const handleLoginClick = () => {
    console.log("Login button clicked");
    setShowLoginModal(true);
  };

  const handleRegisterClick = () => {
    console.log("Register button clicked");
    setShowRegisterModal(true);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  const handleCloseRegisterModal = () => {
    setShowRegisterModal(false);
  };

  const handleGoogleSignIn = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      console.log(user);
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <div className="home-root">
      <div className="left-section-home">
        <img src={assets.meg} alt="MEG Logo" className="home-logo" />
      </div>
      <div className="right-section-home">
        <h1>COMUNICACIÓN Y ORGANIZACIÓN PARA TODOS</h1>
        <div className="join-container-home">
          <h2>ÚNETE HOY</h2>
          <button className="google-button-home" onClick={handleGoogleSignIn}>
            <img src={assets.google} alt="Google" className="google-icon" />
            Entrar con Google
          </button>

          <div className="separator">
            <span className="separator-line"></span>
            <span className="separator-text">o</span>
            <span className="separator-line"></span>
          </div>

          {/* Botones para abrir los modales */}
          <button className="register-button-home" onClick={handleRegisterClick}>
            Crear cuenta
          </button>
          <p>¿Ya tienes una cuenta?</p>
          <button className="login-button-login" onClick={handleLoginClick}>
            Iniciar sesión
          </button>
        </div>
      </div>

      {/* Renderización de los modales de Login y Register */}
      {showLoginModal && <Login onClose={handleCloseLoginModal} />}
      {showRegisterModal && <Register onClose={handleCloseRegisterModal} />}
    </div>
  );
}




export default Home;




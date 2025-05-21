import { Outlet, Link } from "react-router-dom";
import "./styles.css";

export default function MainLayout() {
  return (
    <div className="main-layout-container">
      <nav className="navbar">
        <div className="navbar-links">
          <Link to="">Inicio</Link>
          <Link to="/play-game">Juega</Link>
          <Link to="/quiz">Genera tu pregunta</Link>
          <Link to="/about">Acerca de Nosotros</Link>
        </div>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
}

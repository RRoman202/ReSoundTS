import { NavLink } from "react-router-dom";
import { Button } from "antd";
import "./Navbar.css";

export default function NavBar() {
  return (
    <nav className="navbar-container">
      <div className="nav-menu">
        <p className="name">ReSound</p>
        <div className="divMenu">
          <NavLink to="/home" className="navbar-link">
            Главная
          </NavLink>
          <NavLink to="/piano" className="navbar-link">
            Пианинко
          </NavLink>
        </div>
      </div>
      <div className="nav-btn">
        <Button type="primary" className="auth-btn">
          Войти
        </Button>
      </div>
    </nav>
  );
}

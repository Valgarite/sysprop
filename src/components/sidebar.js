import React, { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const [isExpanded, setExpendState] = useState(true);
  return (
    <div className="nav-upper">
				<div className="nav-heading">
					{isExpanded && (
						<div className="nav-brand">
							<img src="icons/Logo.svg" alt="Logo" srcset="" />
							<h2>SysProp Gelato</h2>
						</div>
					)}
					<button
						className={
							isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"
						}
						onClick={() => setExpendState(!isExpanded)}
					>
						<span></span>
						<span></span>
						<span></span>
					</button>
				</div>

      <div className="sidebar close">
        <div className="logo-details">
          <i className="bx bxl-c-plus-plus"></i>
          <span className="logo_name">SysProp</span>
        </div>
        <ul className="nav-links">
          <li>
            <div className="iocn-link">
              <Link to="/">
                <i className="bx bx-collection"></i>
                <span className="link_name">Dasboard</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/">
                <i className="bx bx-collection"></i>
                <span className="link_name">Compras</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Ventas</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/clientes">
                <i className="bx bx-book-alt"></i>
                <span className="link_name">Clientes</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <Link to="/proveedores">
              <i className="bx bx-line-chart"></i>
              <span className="link_name">Proveedores</span>
            </Link>
          </li>
          <li>
            <div className="iocn-link">
              <Link to="/">
                <i className="bx bx-plug"></i>
                <span className="link_name">Inventario</span>
              </Link>
              <i className="bx bxs-chevron-down arrow"></i>
            </div>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-compass"></i>
              <span className="link_name">Usuarios</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-history"></i>
              <span className="link_name">Mantenimiento</span>
            </Link>
          </li>
          <li>
            <Link to="/">
              <i className="bx bx-history"></i>
              <span className="link_name">Ayuda</span>
            </Link>
          </li>

          <li>
            <div className="profile-details">
              <div className="profile-content">
                {/* <!--<img src="image/profile.jpg" alt="profileImg">--> */}
              </div>
              <div className="name-job">
                <div className="profile_name">Usuario</div>
                <div className="job">Administrador</div>
              </div>
              <i className="bx bx-log-out"></i>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;

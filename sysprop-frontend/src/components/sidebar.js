import React from 'react'

function sidebar() {
  return (
    <div>
        <div className="sidebar close">
      <div className="logo-details">
        <i className="bx bxl-c-plus-plus"></i>
        <span className="logo_name">SysProp</span>
      </div>
      <ul className="nav-links">
        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-collection"></i>
              <span className="link_name">Compras</span>
            </a>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Compras </a></li>
            <li><a href="#">Registrar</a></li>
            <li><a href="#">Recibos</a></li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-collection"></i>
              <span className="link_name">Ventas</span>
            </a>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Ventas</a></li>
            <li><a href="#">Registrar</a></li>
            <li><a href="#">Recibos</a></li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-book-alt"></i>
              <span className="link_name">Clientes</span>
            </a>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Clientes</a></li>
            <li><a href="#">Registrar</a></li>
            <li><a href="#">Lista de clientes</a></li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-book-alt"></i>
              <span className="link_name">Proovedores</span>
            </a>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Proovedores</a></li>
            <li><a href="#">Registrar</a></li>
            <li><a href="#">Lista de proovedores</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-line-chart"></i>
            <span className="link_name">Inventario</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Inventario</a></li>
          </ul>
        </li>
        <li>
          <div className="iocn-link">
            <a href="#">
              <i className="bx bx-plug"></i>
              <span className="link_name">Usuarios</span>
            </a>
            <i className="bx bxs-chevron-down arrow"></i>
          </div>
          <ul className="sub-menu">
            <li><a className="link_name" href="#">Usuarios</a></li>
            <li><a href="#">Agregar</a></li>
            <li><a href="#">Panel de usuarios</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-compass"></i>
            <span className="link_name">Perfil</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Perfil</a></li>
          </ul>
        </li>
        <li>
          <a href="#">
            <i className="bx bx-history"></i>
            <span className="link_name">Ayuda</span>
          </a>
          <ul className="sub-menu blank">
            <li><a className="link_name" href="#">Ayuda</a></li>
          </ul>
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
  )
}

export default sidebar
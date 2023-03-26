import React, { useState } from "react";


const SideBar = () => {
	const [isExpanded, setExpendState] = useState(true);
	const menuItems = [
		{
			text: "Inicio",
			icon: "bx bx-collection",
		},
		{
			text: "Compras",
			icon: "bx bx-collection",
		},
		{
			text: "Ventas",
			icon: "sbx bx-book-alt",
		},
		{
			text: "Clientes",
			icon: "bx bx-book-alt",
		},
		{
			text: "Proveedores",
			icon: "bx bx-line-chart",
		},
		{
			text: "Inventario",
			icon: "bx bx-plug",
		},
		{
			text: "Usuarios",
			icon: "bx bx-compass",
		},
		{
			text: "Mantenimiento",
			icon: "bx bx-history",
		},
		{
			text: "Ayuda",
			icon: "bx bx-history",
		},
	];
	return (
		<div
			className={
				isExpanded
					? "side-nav-container"
					: "side-nav-container side-nav-container-NX"
			}
		>
			<div className="nav-upper">
				<div className= "nav-heading">
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
				<div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="/"
						>
							<i className={icon}/>
							{isExpanded && <p> {text}</p>}
						</a>
					))}
				</div>
			</div>
			<div className="nav-footer">
				{isExpanded && (
					<div className="nav-details">
						<img
							className="nav-footer-avatar"
							src="icons/admin-avatar.svg"
							alt="Usuario"
							srcset=""
						/>
						<div className="nav-footer-info">
							<p className="nav-footer-user-name">Julio Pacheco</p>
							<p className="nav-footer-user-position">Administrador</p>
						</div>
					</div>
				)}
				<img className="logout-icon" src="icons/logout.svg" alt="" srcset="" />
			</div>
		</div>
	);
};

export default SideBar;
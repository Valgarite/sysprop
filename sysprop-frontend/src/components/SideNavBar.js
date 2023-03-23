import React, { useState } from "react";
import "./SideNavBar.css";

const SideNavBar = () => {
	const [isExpanded, setExpendState] = useState(true);
	const menuItems = [
		{
			text: "Inicio",
			icon: "icons/grid.svg",
		},
		{
			text: "Compras",
			icon: "icons/user.svg",
		},
		{
			text: "Ventas",
			icon: "icons/message.svg",
		},
		{
			text: "Clientes",
			icon: "icons/pie-chart.svg",
		},
		{
			text: "Proveedores",
			icon: "icons/folder.svg",
		},
		{
			text: "Inventario",
			icon: "icons/shopping-cart.svg",
		},
		{
			text: "Usuarios",
			icon: "icons/heart.svg",
		},
		{
			text: "Mantenimiento",
			icon: "icons/settings.svg",
		},
		{
			text: "Ayuda",
			icon: "icons/settings.svg",
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
				<div className="nav-menu">
					{menuItems.map(({ text, icon }) => (
						<a
							className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}
							href="#"
						>
							<img className="menu-item-icon" src={icon} alt={text} srcset="" />
							{isExpanded && <p>{text}</p>}
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

export default SideNavBar;

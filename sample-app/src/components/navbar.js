import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import ListItemIcon from "@mui/material/ListItemIcon";
import NavbarItem from "./navbarItem";

function Navbar(props) {
  return (
    <div
      className="navbar navbar-expand-lg navbar-dark bg-primary"
      style={{ height: "10vh" }}
    >
      <div className="container" style={{ maxWidth: "none" }}>
        <div>
          <ListItemIcon sx={{ fontSize: 25 }}>📚</ListItemIcon>
          <a href="/" className="navbar-brand">
            Sistema de Biblioteca
          </a>
        </div>
        <div>
          <ul className="navbar-nav">
            <NavbarItem render="true" href="/login" label="Sair" />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;

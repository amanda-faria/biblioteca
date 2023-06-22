import React , {useRef , useEffect , useState} from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import "toastr/build/toastr.min";
import "toastr/build/toastr.css";
import "./custom.css";
import Navbar from "./components/navbar.js";
import Rotas from "./rotas.js";
import Sidebar from "./components/sidebar.js";
import { Grid } from "@mui/material";
import { APP_URL } from './config/app';
import { BrowserRouter as Router, Route, Switch, Link, useLocation } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Rotas />
    </Router>
  );
}

export default App;
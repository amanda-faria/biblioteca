import React from "react";
import "bootswatch/dist/flatly/bootstrap.css";
import "toastr/build/toastr.min";
import "toastr/build/toastr.css";
import "./custom.css";
import Navbar from "./components/navbar.js";
import Rotas from "./rotas.js";
import Sidebar from "./components/sidebar.js";
import { Grid } from "@mui/material";

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid container style={{ height: "100%" }}>
          <Grid xs={2}>
            <Sidebar />
          </Grid>
          <Grid xs={10}>
            <Rotas />
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default App;

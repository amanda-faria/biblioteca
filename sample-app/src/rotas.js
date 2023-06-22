import React, {useRef , useEffect , useState} from 'react';
import ListagemDevolucoes from "./views/listagem-devolucoes";
import ListagemEmprestimos from "./views/listagem-emprestimos";
import ListagemExemplares from "./views/listagem-exemplares";
import ListagemTitulos from "./views/listagem-titulos";
import ListagemFuncionarios from "./views/listagem-funcionarios";
import ListagemLeitores from "./views/listagem-leitores";
import ListagemDocumentos from "./views/listagem-documentos";
import ListagemUsuarios from "./views/listagem-usuarios";

import Login from "./views/login";
import Reservar from "./views/reservar";
import Renovar from "./views/renovar";
import CadastroDevolucao from "./views/cadastro-devolucao";
import CadastroEmprestimo from "./views/cadastro-emprestimo";
import CadastroExemplar from "./views/cadastro-exemplar";
import CadastroTitulo from "./views/cadastro-titulo";
import CadastroFuncionario from "./views/cadastro-funcionario";
import CadastroLeitor from "./views/cadastro-leitor";
import CadastroUsuario from "./views/cadastro-usuario";
import CadastroDocumento from "./views/cadastro-documento";

import SituacaoLeitor from "./views/situacao-leitor";
import ConsultaLeitor from "./views/consulta-leitor";
import { Grid, Box } from "@mui/material";
import Sidebar from "./components/sidebar.js";
import Navbar from "./components/navbar.js";

import { Route, Routes, BrowserRouter, useLocation } from "react-router-dom";

function Rotas(props) {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  const routes = (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route path="/reservar/:idParam" element={<Reservar />} />
      <Route path="/renovar" element={<Renovar />} />
      <Route path="/situacao-leitor" element={<SituacaoLeitor />} />
      <Route path='/situacao-leitor/:idParam?' element={<SituacaoLeitor />} />
      <Route path="/consulta-leitor" element={<ConsultaLeitor />} />

      <Route path='/cadastro-usuario/:idParam?' element={<CadastroUsuario />} />
      <Route path="/cadastro-exemplar/:idParam?" element={<CadastroExemplar />} />
      <Route path="/cadastro-titulo/:idParam?" element={<CadastroTitulo />} />
      <Route path="/cadastro-leitor/:idParam?" element={<CadastroLeitor />} />
      <Route path="/cadastro-funcionario/:idParam?" element={<CadastroFuncionario />} />
      <Route path="/cadastro-documento/:idParam?" element={<CadastroDocumento />} />
      <Route path="/cadastro-leitor" element={<CadastroLeitor />} />
      <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
      <Route path="/cadastro-titulo" element={<CadastroTitulo />} />
      <Route path="/cadastro-exemplar" element={<CadastroExemplar />} />
      <Route path="/cadastro-emprestimo" element={<CadastroEmprestimo />} />
      <Route path="/cadastro-devolucao" element={<CadastroDevolucao />} />
      <Route path="/cadastro-documento" element={<CadastroDocumento />} />

      <Route path="/listagem-leitores" element={<ListagemLeitores />} />
      <Route path="/listagem-funcionarios" element={<ListagemFuncionarios />} />
      <Route path="/listagem-titulos" element={<ListagemTitulos />} />
      <Route path="/listagem-exemplares" element={<ListagemExemplares />} />
      <Route path="/listagem-emprestimos" element={<ListagemEmprestimos />} />
      <Route path="/listagem-devolucoes" element={<ListagemDevolucoes />} />
      <Route path="/listagem-documentos" element={<ListagemDocumentos />} />
      <Route path="/listagem-usuarios" element={<ListagemUsuarios />} />
  </Routes>
)

  return (
    <div>
        {!isLoginPage && <Navbar />}
        <Grid container style={{ height: "100%" }}>
          {!isLoginPage && <Grid xs={2}><Sidebar /></Grid>}
          {!isLoginPage ? <Grid xs={10}>{routes}</Grid> : <div style={{display: 'flex', justifyContent: 'center', alignItems:'center', height: '100vh', width: '100%'}}>{routes}</div>}
          
        </Grid>
      </div>
  );
}

export default Rotas;

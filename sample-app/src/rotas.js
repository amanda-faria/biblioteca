import React from "react";

import ListagemDevolucoes from "./views/listagem-devolucoes";
import ListagemEmprestimos from "./views/listagem-emprestimos";
import ListagemExemplares from "./views/listagem-exemplares";
import ListagemTitulos from "./views/listagem-titulos";
import ListagemFuncionarios from "./views/listagem-funcionarios";
import ListagemLeitores from "./views/listagem-leitores";

import Login from "./views/login";
import CadastroDevolucao from "./views/cadastro-devolucao";
import CadastroEmprestimo from "./views/cadastro-emprestimo";
import CadastroExemplar from "./views/cadastro-exemplar";
import CadastroTitulo from "./views/cadastro-titulo";
import CadastroFuncionario from "./views/cadastro-funcionario";
import CadastroLeitor from "./views/cadastro-leitor";

import { Route, Routes, BrowserRouter } from "react-router-dom";
import Reservar from "./views/reservar";
import Renovar from "./views/renovar";
import CadastroDocumento from "./views/cadastro-documento";
import ListagemDocumentos from "./views/listagem-documentos";

function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/cadastro-exemplar/:idParam?"
          element={<CadastroExemplar />}
        />
        <Route path="/cadastro-titulo/:idParam?" element={<CadastroTitulo />} />
        <Route path="/cadastro-leitor/:idParam?" element={<CadastroLeitor />} />
        <Route
          path="/cadastro-funcionario/:idParam?"
          element={<CadastroFuncionario />}
        />
        <Route
          path="/cadastro-documento/:idParam?"
          element={<CadastroDocumento />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/listagem-leitores" element={<ListagemLeitores />} />
        <Route path="/cadastro-leitor" element={<CadastroLeitor />} />
        <Route
          path="/listagem-funcionarios"
          element={<ListagemFuncionarios />}
        />
        <Route path="/cadastro-funcionario" element={<CadastroFuncionario />} />
        <Route path="/listagem-titulos" element={<ListagemTitulos />} />
        <Route path="/cadastro-titulo" element={<CadastroTitulo />} />
        <Route path="/listagem-exemplares" element={<ListagemExemplares />} />
        <Route path="/cadastro-exemplar" element={<CadastroExemplar />} />
        <Route path="/listagem-emprestimos" element={<ListagemEmprestimos />} />
        <Route path="/cadastro-emprestimo" element={<CadastroEmprestimo />} />
        <Route path="/listagem-devolucoes" element={<ListagemDevolucoes />} />
        <Route path="/cadastro-devolucao" element={<CadastroDevolucao />} />
        <Route path="/cadastro-documento" element={<CadastroDocumento />} />
        <Route path="/listagem-documentos" element={<ListagemDocumentos />} />
        <Route path="/reservar/:idParam" element={<Reservar />} />
        <Route path="/renovar" element={<Renovar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

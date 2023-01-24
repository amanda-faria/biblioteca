import React from 'react';

import ListagemDevolucoes from './views/listagem-devolucoes';
import ListagemEmprestimos from './views/listagem-emprestimos';
import ListagemExemplares from './views/listagem-exemplares';
import ListagemTitulos from './views/listagem-titulos';
import ListagemFuncionarios from './views/listagem-funcionarios';
import ListagemLeitores from './views/listagem-leitores';
//import ListagemAlunos from './views/listagem-alunos';

import Login from './views/login';
import CadastroDevolucao from './views/cadastro-devolucao';
import CadastroEmprestimo from './views/cadastro-emprestimo';
import CadastroExemplar from './views/cadastro-exemplar';
import CadastroTitulo from './views/cadastro-titulo';
import CadastroFuncionario from './views/cadastro-funcionario';
import CadastroLeitor from './views/cadastro-leitor';

import { Route, Routes, BrowserRouter } from 'react-router-dom';


function Rotas(props) {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path='/login' element={<Login />} />
        <Route
          path='/cadastro-usuarios/:idParam?'
          element={<CadastroUsuario />}
        />
        <Route path='/cadastro-cursos/:idParam?' element={<CadastroCurso />} />
        <Route
          path='/cadastro-professores/:idParam?'
          element={<CadastroProfessor />}
        />
        <Route path='/cadastro-leitor/:idParam?' element={<CadastroLeitor />} />
        <Route path='/listagem-usuarios' element={<ListagemUsuarios />} />
        <Route path='/listagem-cursos' element={<ListagemCursos />} />
        <Route path='/listagem-professores' element={<ListagemProfessores />} /> */}
        <Route path='/listagem-leitores' element={<ListagemLeitores />} />
        <Route path='/cadastro-leitor' element={<CadastroLeitor />} />
        <Route path='/listagem-funcionarios' element={<ListagemFuncionarios />} />
        <Route path='/cadastro-funcionario' element={<CadastroFuncionario />} />
        <Route path='/listagem-titulos' element={<ListagemTitulos />} />
        <Route path='/cadastro-titulo' element={<CadastroTitulo />} />
        <Route path='/listagem-exemplares' element={<ListagemExemplares />} />
        <Route path='/cadastro-exemplar' element={<CadastroExemplar />} />
        <Route path='/listagem-emprestimos' element={<ListagemEmprestimos />} />
        <Route path='/cadastro-emprestimo' element={<CadastroEmprestimo />} />
        <Route path='/listagem-devolucoes' element={<ListagemDevolucoes />} />
        <Route path='/cadastro-devolucao' element={<CadastroDevolucao />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Rotas;

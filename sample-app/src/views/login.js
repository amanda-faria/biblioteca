import React, { useState, useEffect } from "react";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemErro, mensagemSucesso } from "../components/toastr";
import axios from 'axios';
import { BASE_URL } from '../config/axios';
import { useNavigate } from "react-router-dom";


function Login() {
  const baseURL = `${BASE_URL}/usuarios`;
  const navigate = useNavigate();

  const [data, setData] = useState({
    "login": "",
    "senha": ""
  });

  const { login, senha } = data;


  function logar() {
    axios.post(`${baseURL}/auth`, data).then((response) => {
      localStorage.setItem('token', JSON.stringify(response.data))

      navigate('/listagem-leitores')
      mensagemSucesso(`Usuário ${login} logado com sucesso!`);
    }).catch((error) => {
      mensagemErro('Login ou senha incorretos');
    });

  };

  const cancelar = () => {
    setData((prev) => ({
      login: "",
      senha: "",
    }))
  };

  return (
    <div className="new-container">
      <div className="col-lg-4">
        <Card title="Acesso">
          <div className="row">
            <div className="bs-component">
              <FormGroup label="Login: *" htmlFor="inputLogin">
                <input
                  type="text"
                  id="inputLogin"
                  value={login}
                  className="form-control"
                  name="login"
                  onChange={(e) => setData((prev) => ({ ...prev, login: e.target.value }))}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  name="senha"
                  onChange={(e) => setData((prev) => ({ ...prev, senha: e.target.value }))}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={logar}
                  type="button"
                  className="btn btn-success"
                >
                  Entrar
                </button>
                <button
                  onClick={cancelar}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default Login;

import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import "../custom.css";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroUsuario() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/usuarios`;

  const [id, setId] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [senhaRepeticao, setSenhaRepeticao] = useState("");
  const [admin, setAdmin] = useState(false);
  const [dados, setDados] = useState([]);
  const [token, setToken] = useState("");

  function inicializar() {
    if (idParam == null) {
      setId("");
      setLogin("");
      setSenha("");
      setSenhaRepeticao("");
      setAdmin(false);
      navigate(`/listagem-usuarios`);
    } else {
      setId(dados.id);
      setLogin(dados.login);
      setSenha("");
      setSenhaRepeticao("");
      setAdmin(dados.admin);
      navigate(`/listagem-usuarios`);
    }
  }

  async function salvar() {
    let data = { id, login, senha, senhaRepeticao, admin };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          mensagemSucesso(`Usuário ${login} cadastrado com sucesso!`);
          navigate(`/listagem-usuarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          mensagemSucesso(`Usuário ${login} alterado com sucesso!`);
          navigate(`/listagem-usuarios`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    await axios.get(`${baseURL}/${idParam}`, { headers }).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setLogin(dados.login);
    setSenha("");
    setSenhaRepeticao("");
    setAdmin(dados.admin);
  }

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container">
      <Card title="Cadastro de Usuário">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Login: *" htmlFor="inputLogin">
                <input
                  type="text"
                  id="inputLogin"
                  value={login}
                  className="form-control"
                  name="login"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Senha: *" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  name="senha"
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                <input
                  type="password"
                  id="inputRepitaSenha"
                  value={senhaRepeticao}
                  className="form-control"
                  name="senhaRepeticao"
                  onChange={(e) => setSenhaRepeticao(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkAdmin"
                  checked={admin}
                  name="admin"
                  onChange={(e) => setAdmin(e.target.checked)}
                />
                {" "}Administrador
              </FormGroup>
              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={salvar}
                  type="button"
                  className="btn btn-success"
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type="button"
                  className="btn btn-danger"
                >
                  Cancelar
                </button>
              </Stack>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CadastroUsuario;

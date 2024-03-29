import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroEmprestimo() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/emprestimos`;

  const [id, setId] = useState("");
  const [numeroTombo, setNumeroTombo] = useState("");
  const [dados, setDados] = useState([]);
  const [token, setToken] = useState("");

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNumeroTombo("");
      navigate("/listagem-emprestimos");
    } else {
      setId(dados.id);
      setNumeroTombo(dados.numeroTombo);
      navigate("/listagem-emprestimos");
    }
  }

  async function salvar() {
    let data = {
      id,
      numeroTombo /*login, cpf, senha, senhaRepeticao, admin */,
    };
    //data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        })
        .then(function (response) {
          mensagemSucesso(`Empréstimo ${id} cadastrado com sucesso!`);
          navigate(`/listagem-emprestimos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
        })
        .then(function (response) {
          mensagemSucesso(`Empréstimo ${id} alterado com sucesso!`);
          navigate(`/listagem-emprestimos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar(thisToken) {
    const headers = {
      Authorization: `Bearer ${thisToken}`,
    };

    await axios.get(`${baseURL}/${idParam}`, { headers }).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNumeroTombo(dados.numeroTombo);
  }

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar(jwt.token);
  }, []);

  if (!dados) return null;

  return (
    <div className="new-container">
      <Card title="Cadastro de Empréstimo">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Id do Leitor: *" htmlFor="inputIdLeitor">
                <input
                  type="text"
                  id="inputIdLeitor"
                  value={id}
                  className="form-control"
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Número de tombo: *" htmlFor="inputNumeroTombo">
                <input
                  type="text"
                  id="inputNumeroTombo"
                  value={numeroTombo}
                  className="form-control"
                  name="numeroTombo"
                  onChange={(e) => setNumeroTombo(e.target.value)}
                />
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

export default CadastroEmprestimo;

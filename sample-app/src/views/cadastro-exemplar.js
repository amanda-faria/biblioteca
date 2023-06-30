import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroExemplar() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/exemplares`;

  const [id, setId] = useState("");
  const [numeroTombo, setNumeroTombo] = useState("");
  const [dataAquisicao, setDataAquisicao] = useState("");
  const [tipoAquisicao, setTipoAquisicao] = useState("");
  const [valor, setValor] = useState("");
  const [token, setToken] = useState("");

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNumeroTombo("");
      setDataAquisicao("");
      setTipoAquisicao("");
      setValor("");
      navigate(`/listagem-exemplares`);
    } else {
      setId(dados.idExemplar);
      setNumeroTombo(dados.numeroTombo);
      setDataAquisicao(dados.dataAquisicao);
      setTipoAquisicao(dados.tipoAquisicao);
      setValor(dados.valor);
      navigate(`/listagem-exemplares`);
    }
  }

  async function salvar() {
    let data = { id, numeroTombo, dataAquisicao, tipoAquisicao, valor };
    //data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          mensagemSucesso(`Exemplar ${numeroTombo} cadastrado com sucesso!`);
          navigate(`/listagem-exemplares`);
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
          mensagemSucesso(`Exemplar ${numeroTombo} alterado com sucesso!`);
          navigate(`/listagem-exemplares`);
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
      setId(response.data.id);
      setNumeroTombo(response.data.numeroTombo);
      setDataAquisicao(response.data.dataAquisicao);
      setTipoAquisicao(response.data.tipoAquisicao);
      setValor(response.data.valor);
    });
  }

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar(jwt.token);
  }, [id]);

  if (!dados) return null;

  return (
    <div className="container-amanda">
      <Card title="Cadastro de Exemplar">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Número de Tombo: *" htmlFor="inputNumTombo">
                <input
                  type="text"
                  id="inputNumTombo"
                  value={numeroTombo}
                  className="form-control"
                  name="numTombo"
                  onChange={(e) => setNumeroTombo(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Data de Aquisição: *"
                htmlFor="inputDtAquisicao"
              >
                <input
                  type="date"
                  maxLength="11"
                  id="inputDtAquisicao"
                  value={dataAquisicao}
                  className="form-control"
                  name="dataAquisicao"
                  onChange={(e) => setDataAquisicao(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Tipo de Aquisição: *"
                htmlFor="inputTipoAquisicao"
              >
                <input
                  type="text"
                  id="inputTipoAquisicao"
                  value={tipoAquisicao}
                  className="form-control"
                  name="tipoAquisicao"
                  onChange={(e) => setTipoAquisicao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Valor: *" htmlFor="inputValor">
                <input
                  type="text"
                  id="inputValor"
                  value={valor}
                  className="form-control"
                  name="valor"
                  onChange={(e) => setValor(e.target.value)}
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

export default CadastroExemplar;

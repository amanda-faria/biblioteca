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

  const baseURL = `${BASE_URL}/exemplar`;

  const [id, setId] = useState("");
  const [numTombo, setNumTombo] = useState("");
  const [dataAquisicao, setDataAquisicao] = useState("");
  const [tipoAquisicao, setTipoAquisicao] = useState("");
  const [valor, setValor] = useState("");
  // const [admin, setAdmin] = useState(false);

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNumTombo("");
      setDataAquisicao("");
      setTipoAquisicao("");
      setValor("");
      // setAdmin(false);
    } else {
      setId(dados.idExemplar);
      setNumTombo(dados.numTombo);
      setDataAquisicao(dados.dataAquisicao);
      setTipoAquisicao("");
      setValor("");
      // setAdmin(dados.admin);
    }
  }

  async function salvar() {
    let data = { id, numTombo, dataAquisicao, tipoAquisicao, valor /* admin*/ };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Exemplar ${numTombo} cadastrado com sucesso!`);
          navigate(`/listagem-exemplares`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Exemplar ${numTombo} alterado com sucesso!`);
          navigate(`/listagem-exemplares`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setNumTombo(dados.numTombo);
    setDataAquisicao(dados.dataAquisicao);
    setTipoAquisicao("");
    setValor("");
    // setAdmin(dados.admin);
  }

  useEffect(() => {
    buscar(); // eslint-disable-next-line
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
                  value={numTombo}
                  className="form-control"
                  name="numTombo"
                  onChange={(e) => setNumTombo(e.target.value)}
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
              {/* <FormGroup>
                <input
                  className='form-check-input'
                  type='checkbox'
                  id='checkAdmin'
                  checked={admin}
                  name='admin'
                  onChange={(e) => setAdmin(e.target.checked)}
                />
                Administrador
              </FormGroup> */}
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

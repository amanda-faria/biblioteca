import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroDevolucao() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/usuarios`;

  const [id, setId] = useState("");
  const [numTombo, setNumTombo] = useState("");

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNumTombo("");
    } else {
      setId(dados.id);
      setNumTombo(dados.setNumTombo);
    }
  }

  async function salvar() {
    let data = { id, numTombo /*login, cpf, senha, senhaRepeticao, admin*/ };
    data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { "Content-Type": "application/json" },
        })
        .then(function (response) {
          mensagemSucesso(`Devolução ${id} cadastrado com sucesso!`);
          navigate(`/listagem-devolucoes`);
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
          mensagemSucesso(`Devolução ${id} alterado com sucesso!`);
          navigate(`/listagem-devolucoes`);
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
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="new-container">
      <Card title="Cadastro de Devolução">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="ID Leitor: *" htmlFor="inputLeitor">
                <input
                  type="text"
                  id="inputLeitor"
                  value={id}
                  className="form-control"
                  name="id"
                  onChange={(e) => setId(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Número de Tombo: *" htmlFor="inputNumTombo">
                <input
                  type="text"
                  id="inputNumTombo"
                  value={numTombo}
                  className="form-control"
                  name="id"
                  onChange={(e) => setNumTombo(e.target.value)}
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

export default CadastroDevolucao;

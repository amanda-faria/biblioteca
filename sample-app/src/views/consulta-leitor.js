import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function ConsultaLeitor() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/usuarios`;

  const consultar = () => {
    navigate(`/situacao-leitor`);
  };

  const [id, setId] = useState("");

  const [dados, setDados] = useState([]);

  function inicializar() {
    if (idParam == null) {
      setId("");
    } else {
      setId(dados.id);
    }
  }

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
  }

  useEffect(() => {
    buscar();
  }, [id]);

  if (!dados) return null;

  return (
    <div className="new-container">
      <Card title="Consulta de Cadastro de Leitor">
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
              <Stack spacing={1} padding={1} direction="row">
                <button
                  onClick={consultar}
                  type="button"
                  className="btn btn-success"
                >
                  Consultar
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

export default ConsultaLeitor;

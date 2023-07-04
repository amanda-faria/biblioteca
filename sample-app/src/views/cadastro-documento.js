import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroDocumento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/documentos`;

  const [id, setId] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [prazoEntregaQuantDias, setPrazoEntregaQuantDias] = useState("");
  const [valorMulta, setValorMulta] = useState("");
  const [permiteRenovar, setPermiteRenovar] = useState("");
  const [quantMaximaEmprestimo, setquantMaximaEmprestimo] = useState("");
  const [permiteReserva, setPermiteReserva] = useState("");
  const [dados, setDados] = React.useState([]);
  const [token, setToken] = useState("");

  function inicializar() {
    if (idParam == null) {
      setId("");
      setTipoDocumento("");
      setPrazoEntregaQuantDias("");
      setValorMulta("");
      setPermiteRenovar("");
      setquantMaximaEmprestimo("");
      setPermiteReserva("");
      navigate("/listagem-documentos");
    } else {
      setId(dados.id);
      setTipoDocumento(dados.tipoDocumento);
      setPrazoEntregaQuantDias(dados.prazoEntregaQuantDias);
      setValorMulta(dados.valorMulta);
      setPermiteRenovar(dados.permiteRenovar);
      setquantMaximaEmprestimo(dados.quantMaximaEmprestimo);
      setPermiteReserva(dados.permiteReserva);
      navigate("/listagem-documentos");
    }
  }

  async function salvar() {
    let data = {
      id,
      tipoDocumento,
      prazoEntregaQuantDias,
      valorMulta,
      permiteRenovar,
      quantMaximaEmprestimo,
      permiteReserva,
    };
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then(function (response) {
          mensagemSucesso(
            `Documento ${tipoDocumento} configurado com sucesso!`
          );
          navigate(`/listagem-documentos`);
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
          mensagemSucesso(`Documento ${tipoDocumento} alterado com sucesso!`);
          navigate(`/listagem-documentos`);
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
      setTipoDocumento(response.data.tipoDocumento);
      setPrazoEntregaQuantDias(response.data.prazoEntregaQuantDias);
      setValorMulta(response.data.valorMulta);
      setPermiteRenovar(response.data.permiteRenovar);
      setquantMaximaEmprestimo(response.data.quantMaximaEmprestimo);
      setPermiteReserva(response.data.permiteReserva);
    });
  }

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar(jwt.token);
  }, []);

  if (!dados) return null;

  return (
    <div className="new-container">
      <Card title="Configuração de prazos e devoluções">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup
                label="Tipo de Documento: "
                htmlFor="inputTipoDocumento"
              >
                <input
                  //type='text'
                  maxLength="11"
                  id="inputTipoDocumento"
                  value={tipoDocumento}
                  className="form-control"
                  name="tipoDocumento"
                  onChange={(e) => setTipoDocumento(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Quantidade máxima de dias de empréstimo:"
                htmlFor="input"
              >
                <input
                  //type='date'
                  id="inputPrazoEntregaQuantDias"
                  value={prazoEntregaQuantDias}
                  className="form-control"
                  name="prazoEntregaQuantDias"
                  onChange={(e) => setPrazoEntregaQuantDias(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Valor da multa:" htmlFor="inputValorMulta">
                <input
                  //type='text'
                  id="inputValorMulta"
                  value={valorMulta}
                  className="form-control"
                  name="valorMulta"
                  onChange={(e) => setValorMulta(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Quantidade máxima de unidades:"
                htmlFor="inputQuantMaximaUnidade"
              >
                <input
                  //type='number'
                  id="inputQuantMaximaUnidade"
                  value={quantMaximaEmprestimo}
                  className="form-control"
                  name="QuantMaximaUnidade"
                  onChange={(e) => setquantMaximaEmprestimo(e.target.value)}
                />
              </FormGroup>
              <br></br>
              <FormGroup>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkAdmin"
                  checked={permiteRenovar}
                  name="Renovar"
                  onChange={(e) => setPermiteRenovar(e.target.checked)}
                />
                {" "} Permite renovar
              </FormGroup>
              <br></br>
              <FormGroup>
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="checkAdmin"
                  checked={permiteReserva}
                  name="Reserva"
                  onChange={(e) => setPermiteReserva(e.target.checked)}
                />
                {" "} Permite reserva
              </FormGroup>
              <br></br>
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

export default CadastroDocumento;

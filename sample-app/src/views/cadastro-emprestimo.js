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

  const baseURL = `${BASE_URL}/usuarios`;

  const [id, setId] = useState("");
  const [numeroTombo, setNumeroTombo] = useState("");
  // const [cpf, setCpf] = useState('');
  // const [senha, setSenha] = useState('');
  // const [senhaRepeticao, setSenhaRepeticao] = useState('');
  // const [admin, setAdmin] = useState(false);
  const [dados, setDados] = useState([]);
  const [token, setToken] = useState("");

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNumeroTombo("");
      // setCpf('');
      // setSenha('');
      // setSenhaRepeticao('');
      // setAdmin(false);
    } else {
      setId(dados.id);
      setNumeroTombo(dados.numeroTombo);
      // setCpf(dados.cpf);
      // setSenha('');
      // setSenhaRepeticao('');
      // setAdmin(dados.admin);
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
      setId(response.data.id);
      setNumeroTombo(response.data.numeroTombo);
      // setCpf(dados.cpf);
      // setSenha('');
      // setSenhaRepeticao('');
      // setAdmin(dados.admin);
    });
  }

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar(jwt.token);
  }, [id]);

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
              {/* <FormGroup label='CPF: *' htmlFor='inputCpf'>
                <input
                  type='text'
                  maxLength='11'
                  id='inputCpf'
                  value={cpf}
                  className='form-control'
                  name='cpf'
                  onChange={(e) => setCpf(e.target.value)}
                />
              </FormGroup> */}
              {/* <FormGroup label='Senha: *' htmlFor='inputSenha'>
                <input
                  type='password'
                  id='inputSenha'
                  value={senha}
                  className='form-control'
                  name='senha'
                  onChange={(e) => setSenha(e.target.value)}
                />
              </FormGroup> */}
              {/* <FormGroup label='Repita a Senha: *' htmlFor='inputRepitaSenha'>
                <input
                  type='password'
                  id='inputRepitaSenha'
                  value={senhaRepeticao}
                  className='form-control'
                  name='senhaRepeticao'
                  onChange={(e) => setSenhaRepeticao(e.target.value)}
                />
              </FormGroup> */}
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

export default CadastroEmprestimo;

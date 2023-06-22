import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";
import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroLeitor() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/leitores`;

  const [id, setId] = useState("");
  const [nome, setNome] = useState("");
  const [sexo, setSexo] = useState("");
  const [dtNascimento, setDtNascimento] = useState("");
  const [logradouro, setLogradouro] = useState("");
  const [complemento, setComplemento] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [cep, setCep] = useState("");
  const [uf, setUf] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [dados, setDados] = React.useState([]);
  const [token, setToken] = useState("");

  function inicializar() {
    if (idParam == null) {
      setId("");
      setNome("");
      setSexo("");
      setDtNascimento("");
      setLogradouro("");
      setComplemento("");
      setNumero("");
      setBairro("");
      setCidade("");
      setCep("");
      setUf("");
      setTelefone("");
      setEmail("");
      setLogin("");
      setSenha("");
      navigate(`/listagem-leitores`);
    } else {
      setId(dados.id);
      setNome(dados.nome);
      setSexo(dados.sexo);
      setDtNascimento(dados.dtNascimento);
      setLogradouro(dados.logradouro);
      setComplemento(dados.complemento);
      setNumero(dados.numero);
      setBairro(dados.bairro);
      setCidade(dados.cidade);
      setCep(dados.cep);
      setUf(dados.uf);
      setTelefone(dados.telefone);
      setEmail(dados.email);
      setLogin(dados.login);
      setSenha(dados.senha);
      navigate(`/listagem-leitores`);
    }
  }

  async function salvar() {
    let data = {
      id,
      nome,
      sexo,
      dtNascimento,
      logradouro,
      complemento,
      numero,
      bairro,
      cidade,
      cep,
      uf,
      telefone,
      email,
      login,
      senha,
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
          mensagemSucesso(`Leitor(a) ${nome} cadastrado com sucesso!`);
          navigate(`/listagem-leitores`);
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
          mensagemSucesso(`Leitor(a) ${nome} alterado com sucesso!`);
          navigate(`/listagem-leitores`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar(thistoken) {
    const headers = {
      Authorization: `Bearer ${thistoken}`,
    };

    await axios.get(`${baseURL}/${idParam}`, { headers }).then((response) => {
      setDados(response.data);
      setId(response.data.id);
      setNome(response.data.nome);
      setSexo(response.data.sexo);
      setDtNascimento(response.data.dtNascimento);
      setLogradouro(response.data.logradouro);
      setComplemento(response.data.complemento);
      setNumero(response.data.numero);
      setBairro(response.data.bairro);
      setCidade(response.data.cidade);
      setCep(response.data.cep);
      setUf(response.data.uf);
      setTelefone(response.data.telefone);
      setEmail(response.data.email);
      setLogin(response.data.login);
      setSenha(response.data.senha);
    });
  }

  // const [dadosCursos, setDadosCursos] = React.useState(null);

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/cursos`).then((response) => {
  //     setDadosCursos(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    buscar(jwt.token);
  }, [id]);

  if (!dados) return null;
  // if (!dadosCursos) return null;

  return (
    <div className="new-container">
      <Card title="Cadastro de Leitor">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Nome: *" htmlFor="inputNome">
                <input
                  type="text"
                  maxLength="11"
                  id="inputNome"
                  value={nome}
                  className="form-control"
                  name="nome"
                  onChange={(e) => setNome(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Sexo: " htmlFor="inputSexo">
                <input
                  //type='email'
                  id="inputSexo"
                  value={sexo}
                  className="form-control"
                  name="sexo"
                  onChange={(e) => setSexo(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Data de nascimento:"
                htmlFor="inputDtNascimento"
              >
                <input
                  type="date"
                  id="inputDtNascimento"
                  value={dtNascimento}
                  className="form-control"
                  name="dtNascimento"
                  onChange={(e) => setDtNascimento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Logradouro:" htmlFor="inputLogradouro">
                <input
                  type="text"
                  id="inputLogradouro"
                  value={logradouro}
                  className="form-control"
                  name="logradouro"
                  onChange={(e) => setLogradouro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Complemento:" htmlFor="inputComplemento">
                <input
                  //type='text'
                  id="inputComplemento"
                  value={complemento}
                  className="form-control"
                  name="complemento"
                  onChange={(e) => setComplemento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Número:" htmlFor="inputNumero">
                <input
                  type="number"
                  id="inputNumero"
                  value={numero}
                  className="form-control"
                  name="numero"
                  onChange={(e) => setNumero(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Bairro:" htmlFor="inputBairro">
                <input
                  type="text"
                  id="inputBairro"
                  value={bairro}
                  className="form-control"
                  name="bairro"
                  onChange={(e) => setBairro(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Cidade:" htmlFor="inputCidade">
                <input
                  type="text"
                  id="inputCidade"
                  value={cidade}
                  className="form-control"
                  name="cidade"
                  onChange={(e) => setCidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="CEP:" htmlFor="inputCep">
                <input
                  type="number"
                  id="inputCep"
                  value={cep}
                  className="form-control"
                  name="cep"
                  onChange={(e) => setCep(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="UF:" htmlFor="inputUf">
                <input
                  type="text"
                  id="inputUf"
                  value={uf}
                  className="form-control"
                  name="uf"
                  onChange={(e) => setUf(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Telefone:" htmlFor="inputTelefone">
                <input
                  type="number"
                  id="inputTelefone"
                  value={telefone}
                  className="form-control"
                  name="telefone"
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="E-mail:" htmlFor="inputEmail">
                <input
                  type="email"
                  id="inputEmail"
                  value={email}
                  className="form-control"
                  name="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Login:" htmlFor="inputLogin">
                <input
                  //type=''
                  id="inputCep"
                  value={login}
                  className="form-control"
                  name="cep"
                  onChange={(e) => setLogin(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Senha:" htmlFor="inputSenha">
                <input
                  type="password"
                  id="inputSenha"
                  value={senha}
                  className="form-control"
                  name="senha"
                  onChange={(e) => setSenha(e.target.value)}
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

export default CadastroLeitor;

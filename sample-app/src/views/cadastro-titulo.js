import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Stack from "@mui/material/Stack";

import Card from "../components/card";

import FormGroup from "../components/form-group";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import axios from "axios";
import { BASE_URL } from "../config/axios";

function CadastroTitulo() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/titulos`;

  const [id, setId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [subtitulo, setSubtitulo] = useState("");
  const [edicao, setEdicao] = useState("");
  const [area, setArea] = useState("");
  const [totalPaginas, setTotalPaginas] = useState("");
  const [notaSerie, setNotaSerie] = useState("");
  const [cidadePublicacao, setCidadePublicacao] = useState("");
  const [editora, setEditora] = useState("");
  const [dtPublicacao, setDtPublicacao] = useState("");
  const [idioma, setIdioma] = useState("");
  const [dados, setDados] = React.useState([]);
  const [token, setToken] = useState("");
  // const [idCoordenador, setIdCoordenador] = useState(0);

  function inicializar() {
    if (idParam == null) {
      setId("");
      setTitulo("");
      setSubtitulo("");
      setEdicao("");
      setArea("");
      setTotalPaginas("");
      setNotaSerie("");
      setCidadePublicacao("");
      setEditora("");
      setDtPublicacao("");
      setIdioma("");
      navigate(`/listagem-titulos`);
      // setIdCoordenador(0);
    } else {
      setId(dados.id);
      setTitulo(dados.titulo);
      setSubtitulo(dados.subtitulo);
      setEdicao(dados.edicao);
      setArea(dados.area);
      setTotalPaginas(dados.totalPaginas);
      setNotaSerie(dados.notaSerie);
      setCidadePublicacao(dados.cidadePublicacao);
      setEditora(dados.editora);
      setDtPublicacao(dados.dtPublicacao);
      setIdioma(dados.idioma);
      navigate(`/listagem-titulos`);
      // setIdCoordenador(dados.idCoordenador);
    }
  }

  async function salvar() {
    let data = {
      id,
      titulo,
      subtitulo,
      edicao,
      area,
      totalPaginas,
      notaSerie,
      cidadePublicacao,
      editora,
      dtPublicacao,
      idioma,
      // idCoordenador,
    };
    //data = JSON.stringify(data);
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        })
        .then(function (response) {
          mensagemSucesso(`Título ${titulo} cadastrado com sucesso!`);
          navigate(`/listagem-titulos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`
          },
        })
        .then(function (response) {
          mensagemSucesso(`Título ${titulo} alterado com sucesso!`);
          navigate(`/listagem-titulos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    }
  }

  async function buscar() {
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    await axios.get(`${baseURL}/${idParam}`, {headers}).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setTitulo(dados.titulo);
    setSubtitulo(dados.subtitulo);
    setEdicao(dados.edicao);
    setArea(dados.area);
    setTotalPaginas(dados.totalPaginas);
    setNotaSerie(dados.notaSerie);
    setCidadePublicacao(dados.cidadePublicacao);
    setEditora(dados.editora);
    setDtPublicacao(dados.dtPublicacao);
    setIdioma(dados.idioma);
    // setIdCoordenador(dados.idCoordenador);
  }

  // const [dadosProfessores, setDadosProfessores] = React.useState(null);

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/titulo`).then((response) => {
  //     setDadosProfessores(response.data);
  //   });
  // }, []);

  useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem('token'))
    setToken((prev) => jwt.token)
    buscar(); // eslint-disable-next-line
  }, [id]);

  if (!dados) return null;
  // if (!dadosProfessores) return null;

  return (
    <div className="new-container">
      <Card title="Cadastro de Título">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <FormGroup label="Título: *" htmlFor="inputTitulo">
                <input
                  type="text"
                  id="inputTitulo"
                  value={titulo}
                  className="form-control"
                  name="titulo"
                  onChange={(e) => setTitulo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Subtitulo: *" htmlFor="inputSubtitulo">
                <input
                  type="text"
                  id="inputSubtitulo"
                  value={titulo}
                  className="form-control"
                  name="subtitulo"
                  onChange={(e) => setSubtitulo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Edição: *" htmlFor="inputEdicao">
                <input
                  type="text"
                  id="inputEdicao"
                  value={edicao}
                  className="form-control"
                  name="edicao"
                  onChange={(e) => setEdicao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Área: *" htmlFor="inputArea">
                <input
                  type="text"
                  id="inputArea"
                  value={area}
                  className="form-control"
                  name="area"
                  onChange={(e) => setArea(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Total de Páginas: *"
                htmlFor="inputTotalPAginas"
              >
                <input
                  type="text"
                  id="inputTotalPAginas"
                  value={totalPaginas}
                  className="form-control"
                  name="totalPaginas"
                  onChange={(e) => setTotalPaginas(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Nota de série: *" htmlFor="inputNotaSérie">
                <input
                  type="text"
                  id="inputNotaSérie"
                  value={notaSerie}
                  className="form-control"
                  name="notaSerie"
                  onChange={(e) => setNotaSerie(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Cidedae de publicação: *"
                htmlFor="inputCidadePublicacao"
              >
                <input
                  type="text"
                  id="inputCidadePublicacao"
                  value={cidadePublicacao}
                  className="form-control"
                  name="cidadePublicacao"
                  onChange={(e) => setCidadePublicacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Editora: *" htmlFor="inputCidadeEditora">
                <input
                  type="text"
                  id="inputCidadeEditora"
                  value={editora}
                  className="form-control"
                  name="editora"
                  onChange={(e) => setEditora(e.target.value)}
                />
              </FormGroup>
              <FormGroup
                label="Data de publicação: *"
                htmlFor="inputDtPublicacao"
              >
                <input
                  type="date"
                  id="inputDtPublicacao"
                  value={dtPublicacao}
                  className="form-control"
                  name="dtPublicacao"
                  onChange={(e) => setDtPublicacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label="Idioma: *" htmlFor="inputIdioma">
                <input
                  type="text"
                  id="inputIdioma"
                  value={idioma}
                  className="form-control"
                  name="idioma"
                  onChange={(e) => setIdioma(e.target.value)}
                />
              </FormGroup>
              {/* <FormGroup label='Coordenador:' htmlFor='selectCoordenador'>
                <select
                  className='form-select'
                  id='selectCoordenador'
                  name='idCoordenador'
                  value={idCoordenador}
                  onChange={(e) => setIdCoordenador(e.target.value)}
                >
                  <option key='0' value='0'>
                    {' '}
                  </option>
                  {dadosProfessores.map((dado) => (
                    <option key={dado.id} value={dado.id}>
                      {dado.titulo}
                    </option>
                  ))}
                </select>
              </FormGroup> */}
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

export default CadastroTitulo;

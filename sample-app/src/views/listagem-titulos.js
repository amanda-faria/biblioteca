import React from "react";

import Card from "../components/card";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton, TextField } from "@mui/material";
import { Delete, Edit, AddCircle } from "@mui/icons-material";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/titulos`;

function ListagemTitulos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-titulo`);
  };

  const reservar = (id) => {
    console.log(id);
    navigate(`/reservar/${id}`);
  };

  const editar = (id) => {
    navigate(`/cadastro-titulo/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosFiltrados, setDadosFiltrados] = React.useState([]);
  const [filtroBusca, setFiltroBusca] = React.useState("");

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json" },
      })
      .then(function (response) {
        mensagemSucesso(`Título excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o título`);
      });
  }

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setDados(response.data);
      setDadosFiltrados(response.data);
    });
  }, []);

  if (!dados) return null;

  const handleChangeSearch = (e) => {
    setFiltroBusca(e.target.value);
    if (e.target.value !== "") {
      let dadosFiltrados = dados.filter((d) =>
        d.nome.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setDadosFiltrados(dadosFiltrados);
    } else {
      setDadosFiltrados(dados);
    }
  };

  return (
    <div className="new-container">
      <Card title="Listagem de Títulos">
        <div className="row">
          <div className="col-lg-12">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Título
              </button>
              <TextField
                id="outlined-basic"
                label="Buscar pelo nome"
                variant="outlined"
                onChange={handleChangeSearch}
              />
            </div>
            <table className="table table-hover">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Editora</th>
                  <th scope="col">Ações</th>
                </tr>
              </thead>
              <tbody>
                {!dadosFiltrados.length > 0
                  ? filtroBusca !== "" && (
                    <tr>
                      <td>Nada encontrado ao filtrar</td>
                    </tr>
                  )
                  : dadosFiltrados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.titulo}</td>
                      <td>{dado.editora}</td>

                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="reservar"
                            onClick={() => reservar(dado.id)}
                          >
                            <AddCircle />
                          </IconButton>
                          <IconButton
                            aria-label="edit"
                            onClick={() => editar(dado.id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => excluir(dado.id)}
                          >
                            <Delete />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>{" "}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemTitulos;

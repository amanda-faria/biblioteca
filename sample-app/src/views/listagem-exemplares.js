import React from "react";

import Card from "../components/card";

import { mensagemSucesso, mensagemErro } from "../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/exemplares`;

function ListagemExemplares() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-exemplar`);
  };

  const editar = (id) => {
    navigate(`/cadastro-exemplar/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [token, setToken] = React.useState("");
  const jwt = JSON.parse(localStorage.getItem("token"));


  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    const thisToken = jwt.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${thisToken}`,
    };
    console.log(headers);
    await axios
      .delete(url, {
        headers,
        data,
      })
      .then(function (response) {
        mensagemSucesso(`Exemplar excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o exemplar`);
      });
  }

  React.useEffect(() => {
    const jwt = JSON.parse(localStorage.getItem("token"));
    setToken((prev) => jwt.token);
    const headers = {
      Authorization: `Bearer ${jwt.token}`,
    };
    axios.get(baseURL, { headers }).then((response) => {
      setDados(response.data);
    });
  }, []);

  if (!dados) return null;

  return (
    <div className="new-container">
      <Card title="Listagem de Exemplares">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Exemplar
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Número de Tombo </th>
                    <th scope="col">Tipo de Aquisição </th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.numeroTombo}</td>
                      <td>{dado.tipoAquisicao}</td>
                      <td>
                        <Stack spacing={1} padding={0} direction="row">
                          <IconButton
                            aria-label="edit"
                            onClick={() => editar(dado.id)}
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            aria-label="delete"
                            onClick={() => excluir(dado.id)}
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Stack>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>{" "}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default ListagemExemplares;

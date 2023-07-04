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

const baseURL = `${BASE_URL}/documentos`;

function ListagemDocumentos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-documento`);
  };

  const editar = (id) => {
    navigate(`/cadastro-documento/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [token, setToken] = React.useState("");

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, {
        data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then(function (response) {
        mensagemSucesso(`Documento excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o documento`);
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
      <div className="row">
        <div>
          <Card title="Listagem de Documentos">
            <div className="row">
              <div className="col-lg-12">
                <div className="bs-component">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={() => cadastrar()}
                  >
                    Novo Documento
                  </button>
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th scope="col">Tipo</th>
                        <th scope="col">Prazo máximo</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dados.map((dado) => (
                        <tr key={dado.id}>
                          <td>{dado.tipoDocumento}</td>
                          <td>{dado.prazoEntregaQuantDias}</td>
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
      </div>
    </div>
  );
}

export default ListagemDocumentos;

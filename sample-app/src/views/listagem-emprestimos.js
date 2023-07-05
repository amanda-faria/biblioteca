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

const baseURL = `${BASE_URL}/emprestimos`;

function ListagemEmprestimos() {
  const navigate = useNavigate();

  const cadastrar = () => {
    navigate(`/cadastro-emprestimo`);
  };

  const editar = (id) => {
    navigate(`/cadastro-emprestimo/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const jwt = JSON.parse(localStorage.getItem("token"));

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    const thisToken = jwt.token;
    const headers = {
      "Content-Type": "application/json",
      Authorization: `Bearer ${thisToken}`,
    };
    console.log(url);
    await axios
      .delete(url, {
        data,
        headers,
      })
      .then(function (response) {
        mensagemSucesso(`Empréstimo excluído com sucesso!`);
        setDados(
          dados.filter((dado) => {
            return dado.id !== id;
          })
        );
      })
      .catch(function (error) {
        mensagemErro(`Erro ao excluir o empréstimo`);
      });
  }

  React.useEffect(() => {
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
      <Card title="Listagem de Empréstimos">
        <div className="row">
          <div className="col-lg-12">
            <div className="bs-component">
              <button
                type="button"
                className="btn btn-warning"
                onClick={() => cadastrar()}
              >
                Novo Empréstimo
              </button>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Exemplar</th>
                    <th scope="col">Funcionário</th>
                    <th scope="col">Leitor</th>
                    <th scope="col">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {dados.map((dado) => (
                    <tr key={dado.id}>
                      <td>{dado.idExemplar}</td>
                      <td>{dado.cpf}</td>
                      <td>{dado.admin}</td>
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

export default ListagemEmprestimos;

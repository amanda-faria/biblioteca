import React from "react";
import ContentContainer from "../components/content-container";
import { mensagemSucesso, mensagemErro } from "../components/toastr";

import { useNavigate } from "react-router-dom";

import Stack from "@mui/material/Stack";
import { IconButton, TextField } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import axios from "axios";
import { BASE_URL } from "../config/axios";

const baseURL = `${BASE_URL}/exemplares`;


function SituacaoLeitor() {
  const navigate = useNavigate();

  const editar = (id) => {
    navigate(`/cadastro-funcionario/${id}`);
  };

  const [dados, setDados] = React.useState(null);
  const [dadosFiltrados, setDadosFiltrados] = React.useState([]);
  const [filtroBusca, setFiltroBusca] = React.useState("");
  const [token, setToken] = React.useState("");

  async function excluir(id) {
    let data = JSON.stringify({ id });
    let url = `${baseURL}/${id}`;
    console.log(url);
    await axios
      .delete(url, data, {
        headers: { "Content-Type": "application/json", 'Authorization': `Bearer ${token}`},
      })
      .then(function (response) {
        mensagemSucesso(`Empréstimo excluído com sucesso`);
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
    const jwt = JSON.parse(localStorage.getItem('token'))
    setToken((prev) => jwt.token)
    const headers = {
      'Authorization': `Bearer ${jwt.token}`
    };

    axios.get(baseURL, {headers}).then((response) => {
      setDados(response.data);
      setDadosFiltrados(response.data);
    });
  }, []);

  if (!dados) return null;

//   const handleChangeSearch = (e) => {
//     setFiltroBusca(e.target.value);
//     if (e.target.value !== "") {
//       let dadosFiltrados = dados.filter((d) =>
//         d.nome.toLowerCase().includes(e.target.value.toLowerCase())
//       );
//       setDadosFiltrados(dadosFiltrados);
//     } else {
//       setDadosFiltrados(dados);
//     }
//   };

  return (
    <ContentContainer title="Situação do Leitor">
      <div className="row">
        <div className="col-lg-12">
          {/* <div style={{ display: "flex", justifyContent: "space-between" }}>
            <TextField
              id="outlined-basic"
              label="Buscar pelo nome"
              variant="outlined"
              onChange={handleChangeSearch}
            />
          </div> */}
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Título</th>
                <th scope="col">Número de tombo</th>
                <th scope="col">Dias de atraso</th>
                <th scope="col">Valor da multa por dia</th>
                <th scope="col">Valor total da multa</th>

                {/* <th scope="col">Ações</th> */}
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
                      <td>{"O menino maluquinho"}</td>
                      <td>{dado.numeroTombo}</td>
                      <td>{dado.id}</td>
                      <td>{"R$ " + dado.valor}</td>
                      <td>{"R$ " + dado.id * dado.valor}</td>

                      {/* <td>
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
                      </td> */}
                    </tr>
                  ))}
            </tbody>
          </table>{" "}
        </div>
      </div>
    </ContentContainer>
  );
}

export default SituacaoLeitor;

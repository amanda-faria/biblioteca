import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Stack from '@mui/material/Stack';

import Card from '../components/card';
import FormGroup from '../components/form-group';

import { mensagemSucesso, mensagemErro } from '../components/toastr';

import '../custom.css';

import axios from 'axios';
import { BASE_URL } from '../config/axios';

function CadastroDocumento() {
  const { idParam } = useParams();

  const navigate = useNavigate();

  const baseURL = `${BASE_URL}/leitor`;

  const [id, setId] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [prazo, setPrazo] = useState('');
  const [qtMaximaEmprestimo, setQtMaximaEmprestimo] = useState('');
  const [valor, setValor] = useState('');
  const [renovacao, setRenovacao] = useState('');
  const [qtMaximaUnidade, setQtMaximaUnidade] = useState('');
  const [reserva, setReserva] = useState('');
  const [dados, setDados] = React.useState([]);

  function inicializar() {
    if (idParam == null) {
      setId('');
      setTipoDocumento('');
      setPrazo('');
      setQtMaximaEmprestimo('');
      setValor('');
      setRenovacao('');
      setQtMaximaUnidade('');
      setReserva('');
    } else {
      setId(dados.id);
      setTipoDocumento(dados.tipoDocumento);
      setPrazo(dados.prazo);
      setQtMaximaEmprestimo(dados.qtMaximaEmprestimo);
      setValor(dados.valor);
      setRenovacao(dados.renovacao);
      setQtMaximaUnidade(dados.qtMaximaUnidade);
      setReserva(dados.reserva);
    }
  }

  async function salvar() {
    let data = {
      id, tipoDocumento, prazo, qtMaximaEmprestimo, valor, renovacao, qtMaximaUnidade,
      reserva
    };
    if (idParam == null) {
      await axios
        .post(baseURL, data, {
          headers: { 'Content-Type': 'application/json' },
        })
        .then(function (response) {
          mensagemSucesso(`Documento ${tipoDocumento} configurado com sucesso!`);
          navigate(`/listagem-documentos`);
        })
        .catch(function (error) {
          mensagemErro(error.response.data);
        });
    } else {
      await axios
        .put(`${baseURL}/${idParam}`, data, {
          headers: { 'Content-Type': 'application/json' },
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

  async function buscar() {
    await axios.get(`${baseURL}/${idParam}`).then((response) => {
      setDados(response.data);
    });
    setId(dados.id);
    setTipoDocumento(dados.tipoDocumento);
    setPrazo(dados.prazo);
    setQtMaximaEmprestimo(dados.qtMaximaEmprestimo);
    setValor(dados.valor);
    setRenovacao(dados.renovacao);
    setQtMaximaUnidade(dados.qtMaximaUnidade);
    setReserva(dados.reserva);
  }

  // const [dadosCursos, setDadosCursos] = React.useState(null);

  // useEffect(() => {
  //   axios.get(`${BASE_URL}/cursos`).then((response) => {
  //     setDadosCursos(response.data);
  //   });
  // }, []);

  useEffect(() => {
    buscar(); // eslint-disable-next-line
  }, []);

  if (!dados) return null;
  // if (!dadosCursos) return null;

  return (
    <div className='container'>
      <Card title='Configuração de prazos e devoluções'>
        <div className='row'>
          <div className='col-lg-12'>
            <div className='bs-component'>
              <FormGroup label='Tipo de Documento: ' htmlFor='inputTipoDocumento'>
                <input
                  //type='text'
                  maxLength='11'
                  id='inputTipoDocumento'
                  value={tipoDocumento}
                  className='form-control'
                  name='tipoDocumento'
                  onChange={(e) => setTipoDocumento(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Prazo (em dias úteis): ' htmlFor='inputPrazo'>
                <input
                  //type='email'
                  id='inputPrazo'
                  value={prazo}
                  className='form-control'
                  name='prazo'
                  onChange={(e) => setPrazo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade máxima de dias de empréstimo:' htmlFor='inputQtMaximaEmprestimo'>
                <input
                  //type='date'
                  id='inputQtMaximaEmprestimo'
                  value={qtMaximaEmprestimo}
                  className='form-control'
                  name='qtMaximaEmprestimo'
                  onChange={(e) => setQtMaximaEmprestimo(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Valor da multa:' htmlFor='inputValor'>
                <input
                  //type='text'
                  id='inputValor'
                  value={valor}
                  className='form-control'
                  name='valor'
                  onChange={(e) => setValor(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Possibilidade de renovação:' htmlFor='inputRenovacao'>
                <input
                  //type='text'
                  id='inputRenovacao'
                  value={renovacao}
                  className='form-control'
                  name='renovacao'
                  onChange={(e) => setRenovacao(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Quantidade máxima de unidades:' htmlFor='inputQtMaximaUnidade'>
                <input
                  //type='number'
                  id='inputQtMaximaUnidade'
                  value={qtMaximaUnidade}
                  className='form-control'
                  name='qtMaximaUnidade'
                  onChange={(e) => setQtMaximaUnidade(e.target.value)}
                />
              </FormGroup>
              <FormGroup label='Possibilidade de reserva:' htmlFor='inputReserva'>
                <input
                  //type='text'
                  id='inputReserva'
                  value={reserva}
                  className='form-control'
                  name='reserva'
                  onChange={(e) => setReserva(e.target.value)}
                />
              </FormGroup>
              <Stack spacing={1} padding={1} direction='row'>
                <button
                  onClick={salvar}
                  type='button'
                  className='btn btn-success'
                >
                  Salvar
                </button>
                <button
                  onClick={inicializar}
                  type='button'
                  className='btn btn-danger'
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
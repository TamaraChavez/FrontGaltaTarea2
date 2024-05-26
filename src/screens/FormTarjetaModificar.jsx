
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

const FormTarjetaModificar = () => {
  const [tarjeta, setTarjeta] = useState({NumeroTarjeta: '', PIN:'', CVV:'', idTipoTarjeta:''});
  const [tipoTarjetas, setTipoTarjetas] =useState([]) 

  const { idCliente, NumeroTarjeta } = useParams();

  const cargarDatosIniciales = () => {
    Promise.all([
      fetch('http://127.0.0.1:3001/tipoTarjetas').then(res => res.json()).then(data => setTipoTarjetas(data)),
      fetch(`http://127.0.0.1:3001/tarjetas-s/${NumeroTarjeta}`).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      }).then(data => {
        console.log("carga exitosa")
        setTarjeta(data[0]);
        console.log(data)
      }).catch(error => console.error("Error al obtener los datos de Tarjetas:", error))
    ]).catch(error => console.error("Error al cargar datos iniciales:", error));
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);


  const handleChange = (e) => {
    setTarjeta({ ...tarjeta, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!tarjeta.NumeroTarjeta || !tarjeta.PIN || !tarjeta.CVV || !tarjeta.idTipoTarjeta) {
      console.error('Todos los campos son obligatorios');
      return;
    }


    const modificarTarjeta = (url, vehiculoData) => {
      return fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(vehiculoData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    };

    const datosTarjeta = {
      numeroTarjeta: tarjeta.NumeroTarjeta,
      PIN: tarjeta.PIN ,
      CVV: tarjeta.CVV,
      idCliente:idCliente,
      idTipoTarjeta: tarjeta.idTipoTarjeta
    };

    const TarjetaUrl = `http://127.0.0.1:3001/tarjetas/${NumeroTarjeta}`;
    modificarTarjeta(TarjetaUrl, datosTarjeta)
      .then(data => {
        console.log('Tarjeta modificada en SQL Server:', data);
        alert('Tarjeta modificada con éxito');
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al modificar la tarjeta. ' + error.message);
      });
  };

  const resetForm = () => {
    setTarjeta({ numeroTarjeta: '', PIN:'', CVV:'', idTipoTarjeta:''});
  };


  return (
    <ContenedorTabla>
      <h1>Crear Tarjeta</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Numero de Tarjeta:</StyledLabel>
          <StyledInput
            type="number"
            name="numeroTarjeta"
            value={tarjeta.NumeroTarjeta}
            onChange={handleChange}
            placeholder="Numero de Tarjeta"
            required
          />
          <StyledLabel>PIN:</StyledLabel>
          <StyledInput
            type="number"
            name="PIN"
            value={tarjeta.PIN}
            onChange={handleChange}
            placeholder="PIN"
            required
          />
          <StyledLabel>CVV:</StyledLabel>
          <StyledInput
            type="number"
            name="CVV"
            value={tarjeta.CVV}
            onChange={handleChange}
            placeholder="CVV"
            required
          />

          <StyledLabel>Tipo Tarjeta:</StyledLabel>
          <StyledSelect
            name="idTipoTarjeta"
            value={tarjeta.idTipoTarjeta}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tipoTarjetas
              .map((tv) => (
                <option value={tv.idTipoTarjeta}>{tv.tipo}</option>
              ))}
          </StyledSelect>

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to={`/AdmClientes/AdmTarjetas/${idCliente}`}>Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormTarjetaModificar;

const ContenedorTabla = styled.div`
  padding:90px;

`;
const StyledLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;
const ContenedorBotones = styled.div`
  display:flex;
  flex-flow: row nowrap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #f8f8f8;
  justify-content:center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StyledForm = styled.form`
  display: flex;
  max-width:500px;
  flex-direction: column;
  gap: 15px;
`;

const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;

const BotonAccion = styled.button`
  text-decoration:none;
  font-weight:bold;
  padding: 5px 10px;
  margin: 0 5px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;

const BotonCancelar = styled(BotonAccion)`
  background-color: #FF6347; 
  color: white;

  &:hover {
    background-color: #E55347; 
  }
`;
const BotonAgregar = styled(BotonAccion)`
  background-color: #007bff; 
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;
const StyledSelect = styled(StyledInput).attrs({ as: 'select' })``;
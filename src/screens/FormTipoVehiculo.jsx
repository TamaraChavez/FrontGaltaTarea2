
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
const FormTipoVehiculo = () => {
  const [tipoVehiculo, setTipoVehiculo] = useState({nombre: '', montoPorHora: ''});
  const handleChange = (e) => {
    setTipoVehiculo({ ...tipoVehiculo, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!tipoVehiculo.nombre || !tipoVehiculo.montoPorHora)  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarTipoVehiculo = (url, tipoVehiculoData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tipoVehiculoData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
    const datosTipoVehiculo = {
      nombre: tipoVehiculo.nombre,
      montoPorHora: tipoVehiculo.montoPorHora
    }
    // Primero intentar insertar en SQL Server
    insertarTipoVehiculo('http://127.0.0.1:3001/tipoVehiculo', datosTipoVehiculo)
    .then(data => {
      console.log('Tipo Vehiculo agregada en MySQL:', data);
      alert('Tipo Vehiculo agregada con éxito.');
      resetForm(); 
      console.log('Tipo Vehiculo agregado en SQL Server:', data);
    })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el tipo vehiculo. ' + error.message);
      });
  };
const resetForm = () => {
    setTipoVehiculo({ nombre: '', montoPorHora: ''});
};


  return (
    <ContenedorTabla>
      <h1>Crear tipo vehiculo</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombre"
            value={tipoVehiculo.nombre}
            onChange={handleChange}
            placeholder="Nombre Tipo"
            required
          />
          <StyledLabel>Monto Por hora:</StyledLabel>

            <StyledInput
            type="number"
            name="montoPorHora"
            value={tipoVehiculo.montoPorHora}
            onChange={handleChange}
            placeholder="Monto Por Hora"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmTipoVehiculo">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormTipoVehiculo;



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

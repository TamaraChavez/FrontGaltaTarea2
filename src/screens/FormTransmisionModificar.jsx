
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

const FormTransmisionModificar = () => {
  const [transmision, setTransmision] = useState({tipoTransmision: ''});
  const {idTransmision} = useParams(); //poner use params


  const cargarTransmision = () => {
    if (!idTransmision) {
      console.error("No hay ID de transmision proporcionado");
      return;
    }
    fetch(`http://127.0.0.1:3001/transmision/${idTransmision}`)
      .then(response => response.json())
      .then(data => {
        setTransmision(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
};
useEffect(() => {
    cargarTransmision();
  }, []);

  const handleChange = (e) => {
    setTransmision({ ...transmision, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!transmision.tipoTransmision )  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    const modificarTransmision = (TransmisionData) => {
        return fetch(`http://127.0.0.1:3001/transmision/${idTransmision}`, {  // Asumiendo que el endpoint correcto para modificar es /clientes/:id
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(TransmisionData)
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
      };
    
      // Construir objeto con datos del cliente a modificar
      const datosTransmision = {
        tipoTransmision: transmision.tipoTransmision,
      };
    
      // Intentar modificar el cliente en la base de datos
      modificarTransmision(datosTransmision)
        .then(data => {
          console.log('Transmision modificado con éxito:', data);
          alert('Transmision modificado con éxito');
          
        })
        .catch(error => {
          console.error('Error al modificar el transmision:', error);
          alert('Error al modificar el transmision: ' + error.message);
        });
    };
  return (
    <ContenedorTabla>
      <h1>Crear transmision</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="tipoTransmision"
            value={transmision.tipoTransmision}
            onChange={handleChange}
            placeholder="Nombre Transmision"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmTransmision">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};
export default FormTransmisionModificar;

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


import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormDetalleAlquiler = () => {
  const [detalleAlquiler, setDetallesAlquileres] = useState({idAlquiler: '', fechaDevolucion: '', montoTotal: ''});

  const handleChange = (e) => {
    setDetallesAlquileres({ ...detalleAlquiler, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!detalleAlquiler.idAlquiler || !detalleAlquiler.fechaDevolucion|| !detalleAlquiler.montoTotal )  {
      console.error('Todos los campos son obligatorios');
      return;
    }
    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarDetalleAlquiler = (url, detalleAlquilerData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(detalleAlquilerData)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      });
    };
  

    const datosDetallesAlquileres = {
      idAlquiler: detalleAlquiler.idAlquiler,
      fechaDevolucion: detalleAlquiler.fechaDevolucion,
      montoTotal: detalleAlquiler.montoTotal
    }
    // Primero intentar insertar en SQL Server
    insertarDetalleAlquiler('http://127.0.0.1:3001/detallesAlquileres-sql', datosDetallesAlquileres)
      .then(data => {
        console.log('Detalles de alquiler agregado en SQL Server:', data);
        // Aquí capturamos el idCliente devuelto por el backend
        const idDetallesAlquiler = data.idDetallesAlquiler;
        console.log('ID de detalle agregado:', id);
  
        // Si necesitas usar el idCliente para la siguiente inserción en MySQL o para otro propósito
        // Asegúrate de incluir el idCliente en el objeto datosCliente si es necesario para la inserción en MySQL
        // Esto depende de cómo esté configurado tu backend para manejar estas inserciones
        datosDetallesAlquileres.idDetallesAlquiler = idDetallesAlquiler;
  
        // Luego, si el primero tiene éxito, intentar insertar en MySQL (ajusta según tu lógica)
        return insertarDetalleAlquiler('http://127.0.0.1:3001/detallesAlquileres-mysql', datosDetallesAlquileres);
      })
      .then(data => {
        console.log('Detalle de alquiler agregado en MySQL:', data);
        alert('Detalle de alquiler agregado con éxito en ambas bases de datos');
     
        resetForm(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el color. ' + error.message);
      });
  };

const resetForm = () => {
    setDetallesAlquileres({idAlquiler: '', fechaDevolucion: '', montoTotal: ''});
};

  return (
    <ContenedorTabla>
      <h1>Crear detalle de alquiler</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>ID Alquiler:</StyledLabel>
          <StyledInput
            type="text"
            name="idAlquiler"
            value={detalleAlquiler.idAlquiler}
            onChange={handleChange}
            placeholder="ID Alquiler"
            required
          />
          <StyledLabel>Fecha devolucion:</StyledLabel>
          <StyledInput
            type="date"
            name="fechaDevolucion"
            value={detalleAlquiler.fechaDevolucion}
            onChange={handleChange}
            placeholder="Fecha de Devolucion"
            required
          />
          <StyledLabel>monto Total</StyledLabel>
          <StyledInput
            type="text"
            name="montoTotal"
            value={detalleAlquiler.montoTotal}
            onChange={handleChange}
            placeholder="Monto Total"
            required
          />
          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmDetallesAlquiler">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};
export default FormDetalleAlquiler;

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

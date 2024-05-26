
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

const FormCliente = () => {
  const [cliente, setCliente] = useState({ nombre: '', apellidos: '', telefono: '', identificacion: '', paisResidencia: '', direccion: '', tipoCliente: '' });
  const [paises, setPaises] = useState([])
  const cargarPaises = () => {
    fetch('http://127.0.0.1:3001/pais')
      .then(response => response.json())
      .then(data => {
        setPaises(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  
  useEffect(() => {
    cargarPaises();
  }, []);


  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!cliente.identificacion || !cliente.nombre || !cliente.apellidos || !cliente.telefono || !cliente.telefono || !cliente.paisResidencia || !cliente.direccion || !cliente.tipoCliente) {
      console.error('Todos los campos son obligatorios');
      return;
    }

    if (!/^\d{10}$/.test(cliente.identificacion)) {
      alert("La Identificación debe tener exactamente 10 dígitos y solo debe contener números");
      return;
    }

    // Definir una función auxiliar para insertar el cliente en una base de datos
    const insertarCliente = (url, clienteData) => {
      return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(clienteData)
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
    };


    const datosCliente = {
      nombre: cliente.nombre,
      apellidos: cliente.apellidos,
      telefono: cliente.telefono,
      identificacion: cliente.identificacion,
      paisResidencia: cliente.paisResidencia,
      direccion: cliente.direccion,
      tipoCliente: cliente.tipoCliente
    };

    // Primero intentar insertar en SQL Server
    insertarCliente('http://127.0.0.1:3001/clientes', datosCliente)
      .then(data => {
        console.log('Cliente agregado en MySQL:', data);
        alert('Cliente agregado con éxito');

        resetForm();

      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al agregar el cliente. ' + error.message);
      });
  };




  const resetForm = () => {
    setCliente({ nombre: '', apellidos: '', telefono: '', identificacion: '', paisResidencia: '', direccion: '', tipoCliente: '' });
  };


  return (
    <ContenedorTabla>
      <h1>Crear Cliente</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Identificación:</StyledLabel>
          <StyledInput
            type="text"
            name="identificacion"
            value={cliente.identificacion}
            onChange={handleChange}
            placeholder="Identificación"
            required
          />
          <StyledLabel>Nombre:</StyledLabel>
          <StyledInput
            type="text"
            name="nombre"
            value={cliente.nombre}
            onChange={handleChange}
            placeholder="Nombre Cliente"
            required
          />
          <StyledLabel>Apellido:</StyledLabel>
          <StyledInput
            type="text"
            name="apellidos"
            value={cliente.apellidos}
            onChange={handleChange}
            placeholder="Apellido Cliente"
            required
          />
          <StyledLabel>Telefono:</StyledLabel>
          <StyledInput
            type="text"
            name="telefono"
            value={cliente.telefono}
            onChange={handleChange}
            placeholder="Telefono"
            required
          />
          <StyledLabel>Pais residencia:</StyledLabel>
          <StyledSelect
            name="paisResidencia"
            value={cliente.paisResidencia}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un país</option>
            {paises
              .map((pais) => (
                <option value={pais.idPais}>{pais.nombrePais}</option>
              ))}
          </StyledSelect>
          <StyledLabel>Direccion:</StyledLabel>
          <StyledInput
            type="text"
            name="direccion"
            value={cliente.direccion}
            onChange={handleChange}
            placeholder="Direccion"
            required
          />
          <StyledLabel>Tipo Cliente:</StyledLabel>
          <StyledSelect
            name="tipoCliente"
            value={cliente.tipoCliente}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            <option value="1">Nacional</option>
            <option value="2">Extranjero</option>
          </StyledSelect>

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmClientes">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormCliente;



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
const StyledSelect = styled(StyledInput).attrs({ as: 'select' })``;

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

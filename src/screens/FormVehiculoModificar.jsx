
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

const FormVehiculoModificar = () => {
  const [vehiculo, setVehiculo] = useState({ placa:'', idTipo: '', idColor: '', idCombustible: '', año: '', idMarca: '', estado: 'Disponible', idTransmision: '' });
  const [colores, setColores] = useState([])
  const [combustibles, setCombustibles] = useState([])
  const [transmisiones, setTransmisiones] = useState([])
  const [marcas, setMarcas] = useState([])
  const [tipoVehiculos, setTipoVehiculos] = useState([])
  const { id } = useParams();

  const cargarDatosIniciales = () => {
    Promise.all([
      fetch('http://127.0.0.1:3001/color').then(res => res.json()).then(data => setColores(data)),
      fetch('http://127.0.0.1:3001/combustibles').then(res => res.json()).then(data => setCombustibles(data)),
      fetch('http://127.0.0.1:3001/transmision').then(res => res.json()).then(data => setTransmisiones(data)),
      fetch('http://127.0.0.1:3001/marcas').then(res => res.json()).then(data => setMarcas(data)),
      fetch('http://127.0.0.1:3001/tipoVehiculo').then(res => res.json()).then(data => setTipoVehiculos(data)),
      fetch(`http://127.0.0.1:3001/vehiculos/${id}`).then(res => {
        if (!res.ok) throw new Error('Network response was not ok');
        return res.json();
      }).then(data => {
        console.log("carga exitosa")
        setVehiculo(data);
        console.log(data)
      }).catch(error => console.error("Error al obtener los datos del vehículo:", error))
    ]).catch(error => console.error("Error al cargar datos iniciales:", error));
  };

  useEffect(() => {
    cargarDatosIniciales();
  }, []);



  const handleChange = (e) => {
    setVehiculo({ ...vehiculo, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();


    if (!id || !vehiculo.placa || !vehiculo.idTipoVehiculo || !vehiculo.idColor || !vehiculo.idCombustible || !vehiculo.año || !vehiculo.idMarca || !vehiculo.estado || !vehiculo.idTransmision) {
      console.error('Todos los campos son obligatorios');
      return;
    }


    const modificarVehiculo = (url, vehiculoData) => {
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

    const datosVehiculo = {
      IDTipo: vehiculo.idTipoVehiculo,
      Color: vehiculo.idColor,
      TipoCombustible: vehiculo.idCombustible,
      Año: vehiculo.año,
      Marca: vehiculo.idMarca,
      Estado: vehiculo.estado,
      Placa : vehiculo.placa,
      IdTransmision: vehiculo.idTransmision,
    };


    const vehiculoUrl = `http://127.0.0.1:3001/vehiculos/${id
      }`;
    modificarVehiculo(vehiculoUrl, datosVehiculo)
      .then(data => {
        console.log('Vehículo modificado en SQL Server:', data);
        alert('Vehículo modificado con éxito');
        resetForm();
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Error al modificar el vehículo. ' + error.message);
      });
  };





  const resetForm = () => {
    setVehiculo({ placa:'', idTipoVehiculo: '', idColor: '', idCombustible: '', año: '', idMarca: '', estado: '', idTransmision: '' });
  };


  return (
    <ContenedorTabla>
      <h1>Crear Vehiculo</h1>
      <FormContainer>
        <StyledForm onSubmit={handleSubmit}>
          <StyledLabel>Placa:</StyledLabel>
          <StyledInput
            type="text"
            name="placa"
            value={vehiculo.placa}
            onChange={handleChange}
            placeholder="Placa"
            required
          />
          <StyledLabel>Tipo Vehiculo:</StyledLabel>
          <StyledSelect
            name="idTipoVehiculo"
            value={vehiculo.idTipoVehiculo}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {tipoVehiculos
              .map((tv) => (
                <option value={tv.idTipo}>{tv.nombre}</option>
              ))}
          </StyledSelect>
          <StyledLabel>Color:</StyledLabel>
          <StyledSelect
            name="idColor"
            value={vehiculo.idColor}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un color</option>
            {colores
              .map((color) => (
                <option value={color.idColor}>{color.nombreColor}</option>
              ))}
          </StyledSelect>
          <StyledLabel>Combustible:</StyledLabel>
          <StyledSelect
            name="idCombustible"
            value={vehiculo.idCombustible}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un combustible</option>
            {combustibles
              .map((tv) => (
                <option value={tv.idCombustible}>{tv.nombreCombustible}</option>
              ))}
          </StyledSelect>
          <StyledLabel>Año:</StyledLabel>
          <StyledInput
            type="text"
            name="año"
            value={vehiculo.año}
            onChange={handleChange}
            placeholder="año"
            required
          />
          <StyledLabel>Marca:</StyledLabel>
          <StyledSelect
            name="idMarca"
            value={vehiculo.idMarca}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione una marca</option>
            {marcas
              .map((tv) => (
                <option value={tv.idMarca}>{tv.nombreMarca}</option>
              ))}
          </StyledSelect>

          <StyledLabel>Transmision:</StyledLabel>
          <StyledSelect
            name="idTransmision"
            value={vehiculo.idTransmision}
            onChange={handleChange}
            required
          >
            <option value="">Seleccione un tipo</option>
            {transmisiones
              .map((tv) => (
                <option value={tv.idTransmision}>{tv.tipoTransmision}</option>
              ))}
          </StyledSelect>

          <ContenedorBotones>
            <BotonAgregar type="submit">Guardar</BotonAgregar>
            <BotonCancelar as={Link} to="/AdmVehiculos">Cancelar</BotonCancelar>
          </ContenedorBotones>
        </StyledForm>
      </FormContainer>
    </ContenedorTabla>
  );
};

export default FormVehiculoModificar;



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
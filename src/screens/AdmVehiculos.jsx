// En /screens/AdmVehiculos.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';



const AdmVehiculos = () => {
  const [vehiculos, setVehiculos] = useState([]);
  //Neuvo estado para controlar el filtrado de vehiculos
  const [filtroidVehiculo, setFiltroVehiculo] = useState('');
  const [colores, setColores] = useState([])
  const [combustibles, setCombustibles] = useState([])
  const [transmisiones, setTransmisiones] = useState([])
  const [marcas, setMarcas] = useState([])
  const [tipoVehiculos, setTipoVehiculos] = useState([])

  const cargarColores = () => {
    fetch('http://127.0.0.1:3001/color')
      .then(response => response.json())
      .then(data => {
        setColores(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarCombustible = () => {
    fetch('http://127.0.0.1:3001/combustibles')
      .then(response => response.json())
      .then(data => {
        setCombustibles(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarTransmisiones = () => {
    fetch('http://127.0.0.1:3001/transmision')
      .then(response => response.json())
      .then(data => {
        setTransmisiones(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarMarcas = () => {
    fetch('http://127.0.0.1:3001/marcas')
      .then(response => response.json())
      .then(data => {
        setMarcas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarTipoVehiculo = () => {
    fetch('http://127.0.0.1:3001/tipoVehiculo')
      .then(response => response.json())
      .then(data => {
        setTipoVehiculos(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };

  const cargarVehiculos = () => {
    fetch('http://127.0.0.1:3001/vehiculos')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setVehiculos(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  useEffect(() => {
    cargarVehiculos();
    cargarColores();
    cargarCombustible();
    cargarTransmisiones();
    cargarMarcas();
    cargarTipoVehiculo();
  }, []);



  const handleDelete = async (idVehiculo) => {
    const confirmar = window.confirm("¿Realmente desea eliminar el registro seleccionado?");

    if (!confirmar) {
      return;
    }

    try {
      // Usa el nuevo endpoint que maneja ambas bases de datos
      const url = `http://127.0.0.1:3001/vehiculos/${idVehiculo}`;
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Falló la solicitud de eliminación');
      console.log('Vehiculo eliminado:', data.message);

      // Actualiza el estado de clientes en la UI después de la eliminación exitosa
      setVehiculos(prevVehiculos => prevVehiculos.filter(vehiculo => vehiculo.idVehiculo !== idVehiculo));
    } catch (error) {
      console.error('Error al eliminar el vehiculo:', error);
      alert(`Error al eliminar el vehiculo: ${error.message}`);
    }
  };

  return (

    <ContenedorTabla>
      <h1>Administación de vehiculos</h1>

      <BotonAgregar as={Link} to="/AdmVehiculos/FormVehiculo">Nuevo</BotonAgregar>
      <StyledInput
        type="text"
        placeholder="idVehiculo"
        value={filtroidVehiculo}
        onChange={(e) => setFiltroVehiculo(e.target.value)}
      />

      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Placa</Th>
            <Th>Tipo Vehiculo</Th>
            <Th>Color</Th>
            <Th>Combustible</Th>
            <Th>Transmision</Th>
            <Th>Marca</Th>
            <Th>Año</Th>
            <Th>Estado</Th>

            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {vehiculos
            .map((vehiculo) => {
              const color = colores.find(c => c.idColor === vehiculo.idColor);
              const tipoVehiculo = tipoVehiculos.find(tv => tv.idTipo === vehiculo.idTipoVehiculo);
              const combustible = combustibles.find(c => c.idCombustible === vehiculo.idCombustible);
              const transmision = transmisiones.find(c => c.idTransmision === vehiculo.idTransmision);
              const marca = marcas.find(c => c.idMarca === vehiculo.idMarca);

              console.log("Select COLORES");
              console.log(colores);
              return (
                <Tr key={vehiculo.idVehiculo}>
                  <Td><a href={`/AdmVehiculos/FormVehiculoModificar/${vehiculo.idVehiculo}`}>{vehiculo.idVehiculo}</a></Td>
                  <Td>{vehiculo.placa}</Td>
                  <Td>{tipoVehiculo ? tipoVehiculo.nombre : 'No disponible'}</Td>
                  <Td>{color ? color.nombreColor : 'No disponible'}</Td>
                  <Td>{combustible ? combustible.nombreCombustible : 'No disponible'}</Td>
                  <Td>{transmision ? transmision.tipoTransmision : 'No disponible'}</Td>
                  <Td>{marca ? marca.nombreMarca : 'No disponible'}</Td>
                  <Td>{vehiculo.año}</Td>
                  <Td>{vehiculo.estado}</Td>
                  <Td>
                    {vehiculo.estado == 'Disponible' ? (
                      <BotonAlquilar as={Link} to={`/AdmVehiculos/FormAlquiler/${vehiculo.idVehiculo}`}>Alquilar</BotonAlquilar>
                    ) : (

                      <BotonAlquilarDesabilitado as={Link} >Alquilar</BotonAlquilarDesabilitado>

                    )}
                    <BotonAccionEliminar onClick={() => handleDelete(vehiculo.idVehiculo)}>Eliminar</BotonAccionEliminar>
                  </Td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default AdmVehiculos;

// Styled-components para la tabla, ajusta según tus necesidades
// Estilos de los componentes
const StyledInput = styled.input`
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin:10px;
  &:focus {
    border-color: #007bff;
    outline: none;
  }
`;
const BotonAccion = styled.button`
  padding: 5px 10px;
  text-decoration:none;
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
const BotonAlquilar = styled(BotonAccion)`
  background-color: #4CAF50; 
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;
const BotonAlquilarDesabilitado = styled(BotonAccion)`
  background-color: #555755; 
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;
const BotonDevolver = styled(BotonAccion)`
  background-color: #8a0a6e; 
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;
const BotonAccionEliminar = styled(BotonAccion)`
  background-color: #FF6347; /* Rojo */
  color: white;

  &:hover {
    background-color: #E55347; /* Un rojo un poco más oscuro al pasar el mouse */
  }
`;

const BotonAccionModificar = styled(BotonAccion)`
  background-color: #FFA500; /* Naranja */
  color: white;

  &:hover {
    background-color: #cc8400; /* Un naranja un poco más oscuro al pasar el mouse */
  }
`;
const BotonCerrar = styled.button`
  background-color: #FF6347;
  color: white; 
  padding: 10px 20px;  
  border: none; 
  cursor: pointer; 
  font-size: 1rem;
  font-weight: bold;
  
  &:hover {
    opacity: 0.8;
  }
`;
const BotonAgregar = styled.button`
  background-color: #4CAF50; 
  text-decoration:none;
  color: white; 
  padding: 7px 15px;
  margin:10px;
  border: none; 
  border-radius:5px;
  cursor: pointer; 
  font-size: 1rem; 
  &:hover {
    opacity: 0.8;
  }
`;

const ModalContainer = styled.div`
  position: fixed; 
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5); 
  z-index: 1000;

  > div {
    background: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
`;
const ContenedorTabla = styled.div`
  padding:90px;

`;
const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border:1px solid #7c7c7c;
  border-radius: 25px;

`;

const Th = styled.th`
  text-align: left;
  background-color: #f2f2f2;
  padding: 8px;
`;

const Td = styled.td`
  padding: 8px;
  text-align: left;
`;

const Tr = styled.tr`

  &:nth-child(even) {
    background-color: #f9f9f9;
    border-bottom: 1px solid #7c7c7c inherit;
  }
`;

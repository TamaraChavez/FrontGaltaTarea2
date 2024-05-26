// En /screens/AdmClientes.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styled from 'styled-components';

////////linea 7 cambio prueba/////

const AdmClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [paises, setPaises] = useState([]);
  const [tiposClientes, setTiposClientes] = useState([]);
  //Neuvo estado para controlar el filtrado de clientes
  const [filtroCedula, setFiltroCedula] = useState('');


  const cargarClientes = () => {
    fetch('http://127.0.0.1:3001/clientes')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setClientes(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));

  };
  const cargarTipoCliente = () => {
    fetch('http://127.0.0.1:3001/tipoClientes')
      .then(response => response.json())
      .then(data => {
        setTiposClientes(data);
        console.log("tipos clientes")
        console.log(data)
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarPaises = () => {
    fetch('http://127.0.0.1:3001/pais')
      .then(response => response.json())
      .then(data => {
        setPaises(data);

      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };

  useEffect(() => {
    cargarClientes();
    cargarPaises();
    cargarTipoCliente();
  }, []);



  const handleDelete = async (id) => {
    const confirmar = window.confirm("¿Realmente desea eliminar el cliente seleccionado?");

    if (!confirmar) {
      return;
    }

    try {
      // Usa el nuevo endpoint que maneja ambas bases de datos
      const url = `http://127.0.0.1:3001/clientes/${id}`;
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();

      if (!response.ok) throw new Error(data.message || 'Falló la solicitud de eliminación');
      console.log('Cliente eliminado:', data.message);

      // Actualiza el estado de clientes en la UI después de la eliminación exitosa
      setClientes(prevClientes => prevClientes.filter(cliente => cliente.id !== id));
    } catch (error) {
      console.error('Error al eliminar el cliente:', error);
      alert(`Error al eliminar el cliente: ${error.message}`);
    }
  };



  return (

    <ContenedorTabla>
      <h1>Administación de clientes</h1>

      <BotonAgregar as={Link} to="/AdmClientes/FormCliente">Nuevo</BotonAgregar>
      <StyledInput
        type="text"
        placeholder="Identificación"
        value={filtroCedula}
        onChange={(e) => setFiltroCedula(e.target.value)}
      />

      <Table>
        <thead>
          <Tr>
            <Th>ID</Th>
            <Th>Nombre</Th>
            <Th>Apellido</Th>
            <Th>Telefono</Th>
            <Th>Identificacion</Th>
            <Th>Pais residencia</Th>
            <Th>Direccion</Th>
            <Th>Tipo de Cliente</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {clientes
            .filter((cliente) => cliente.identificacion.includes(filtroCedula))
            .map((cliente) => {
              const pais = paises.find(p => p.idPais === cliente.idPaisResidencia);  // Encuentra el país correspondiente al ID
              const tipoCliente = tiposClientes.find(t => t.idTipoCliente === cliente.tipoCliente);
              console.log("TIPO CLIENTE")
              console.log(tipoCliente)
              return (
                <Tr key={cliente.id}>
                  <Td><a href={`/AdmClientes/FormClienteModificar/${cliente.id}`}>{cliente.id}</a></Td>
                  <Td>{cliente.nombre}</Td>
                  <Td>{cliente.apellidos}</Td>
                  <Td>{cliente.telefono}</Td>
                  <Td>{cliente.identificacion}</Td>
                  <Td>{pais ? pais.nombrePais : 'No disponible'}</Td> 
                  <Td>{cliente.direccion}</Td>
                  <Td>{tipoCliente ? tipoCliente.tipoCliente : 'No disponible'}</Td>
                  <Td>
                    <BotonTarjetas as={Link} to={`/AdmClientes/AdmTarjetas/${cliente.id}`}>Ver tarjetas</BotonTarjetas>
                    <BotonAccionEliminar as={Link} onClick={() => handleDelete(cliente.id)}>Eliminar</BotonAccionEliminar>
                  </Td>
                </Tr>
              );
            })}
        </tbody>
      </Table>
    </ContenedorTabla>
  );
};

export default AdmClientes;

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
const BotonTarjetas = styled(BotonAccion)`
  background-color: #FFA500; /* Rojo */
  color: white;
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

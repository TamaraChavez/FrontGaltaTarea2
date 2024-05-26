// En /screens/AdmClientes.js
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import styled from 'styled-components';

const AdmTarjetas = () => {
  const [tarjetas, setTarjetas] = useState([]);

  const [tipoTarjetas, setTipoTarjetas] = useState([])  //Neuvo estado para controlar el filtrado de clientes
  const { idCliente } = useParams();
  const cargarTarjetas = () => {
    fetch(`http://127.0.0.1:3001/tarjetas/${idCliente}`)
      .then(response => response.json())
      .then(data => {
        console.log("TARJETAS", data); // Esto debería mostrar los datos en la consola
        setTarjetas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarTipoTarjeta = () => {
    fetch('http://127.0.0.1:3001/tipoTarjetas')
      .then(response => response.json())
      .then(data => {
        console.log(data); // Esto debería mostrar los datos en la consola
        setTipoTarjetas(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  useEffect(() => {
    cargarTarjetas();
    cargarTipoTarjeta();

  }, []);

  const handleDelete = async (numeroTarjeta) => {
    const confirmar = window.confirm("¿Realmente desea eliminar el registro seleccionado?");

    if (!confirmar) {
      return;
    }

    try {
      // Usa el nuevo endpoint que maneja ambas bases de datos
      const url = `http://127.0.0.1:3001/tarjetas/${numeroTarjeta}`;
      const response = await fetch(url, { method: 'DELETE' });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Falló la solicitud de eliminación');
      console.log('Tarjeta eliminada:', data.message);
      // Actualiza el estado de clientes en la UI después de la eliminación exitosa
      setTarjetas(prevTarjetas => prevTarjetas.filter(tarjeta => tarjeta.numeroTarjeta !== numeroTarjeta));
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
      alert(`Error al eliminar la tarjeta: ${error.message}`);
    }
  };
  return (

    <ContenedorTabla>
      <h1>Administación de Tarjetas</h1>
      <BotonAgregar as={Link} to={`/AdmTarjetas/FormTarjeta/${idCliente}`}>Nuevo</BotonAgregar>
      <br></br>
      <Table>
        <thead>
          <Tr>
            <Th>Numero de Tarjeta</Th>
            <Th>PIN</Th>
            <Th>CVV</Th>
            <Th>Fecha de Vencimiento</Th>
            <Th>Tipo Tarjeta</Th>
            <Th></Th>
          </Tr>
        </thead>
        <tbody>
          {tarjetas.map((tarjeta) => {
            const tipoTarjeta = tipoTarjetas.find(tipo => tipo.idTipoTarjeta === tarjeta.idTipoTarjeta);
            return (
              <Tr key={tarjeta.NumeroTarjeta}>
                <Td>
                  <a href={`/AdmTarjetas/FormTarjetaModificar/${tarjeta.idCliente}/${tarjeta.NumeroTarjeta}`}>
                    {tarjeta.NumeroTarjeta}
                  </a>
                </Td>
                <Td>{tarjeta.PIN}</Td>
                <Td>{tarjeta.CVV}</Td>
                <Td>{tarjeta.fechaVencimiento}</Td>
                <Td>{tipoTarjeta ? tipoTarjeta.tipo : 'No disponible'}</Td>
                <Td>
                  <BotonAccionEliminar onClick={() => handleDelete(tarjeta.NumeroTarjeta)}>Eliminar</BotonAccionEliminar>
                </Td>
              </Tr>
            );
          })}
        </tbody>

      </Table>
    </ContenedorTabla>
  );
};

export default AdmTarjetas;
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

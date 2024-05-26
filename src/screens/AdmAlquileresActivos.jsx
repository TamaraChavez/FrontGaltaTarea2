import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const AdmDetallesAlquiler = () => {
  const [alquileres, setAlquileres] = useState([]);
  const [error, setError] = useState(false);
  const [clientes, setClientes] = useState([]);
  const [vehiculos, setVehiculos] = useState([]);
  const [seguros, setSeguros] = useState([]);

  const cargarAlquileres = () => {
    fetch('http://127.0.0.1:3001/alquiler')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setAlquileres(data);
        } else {
          setError(true);
          console.error("Error en el formato de los datos:", data);
        }
      })
      .catch(error => {
        setError(true);
        console.error("Error al obtener los datos:", error);
      });
  };
  const cargarClientes = () => {
    fetch('http://127.0.0.1:3001/clientes')
      .then(response => response.json())
      .then(data => {
        setClientes(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarVehiculos = () => {
    fetch('http://127.0.0.1:3001/vehiculos')
      .then(response => response.json())
      .then(data => {
        setVehiculos(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };
  const cargarSeguros = () => {
    fetch('http://127.0.0.1:3001/seguros')
      .then(response => response.json())
      .then(data => {
        setSeguros(data);
      })
      .catch(error => console.error("Error al obtener los datos:", error));
  };

  useEffect(() => {
    cargarAlquileres();
    cargarVehiculos();
    cargarSeguros();
    cargarClientes();
  }, []);
  // Función para finalizar alquiler
  const finalizarAlquiler = async (idAlquiler) => {
    const confirmar = window.confirm("¿Realmente desea devolver este vehiculo?");

    if (!confirmar) {
      return;
    }
    try {
      const response = await fetch('http://127.0.0.1:3001/finalizarAlquiler', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idAlquiler })
      });

      const data = await response.json();
      if (response.ok) {
        alert('Alquiler finalizado correctamente');
        cargarAlquileres(); // Recargar los alquileres para reflejar cambios
      } else {
        throw new Error(data.message || "Error al finalizar alquiler");
      }
    } catch (error) {
      console.error("Error al finalizar el alquiler:", error);
      alert(error.message);
    }
  };

  return (
    <ContenedorTabla>
      <h1>Alquileres activos</h1>
      {alquileres.length > 0 ? (

        <Table>
          <thead>
            <Tr>
              <Th>Id Alquiler</Th>
              <Th>Cliente</Th>
              <Th>Fecha Alquiler</Th>
              <Th>Fecha Entrega</Th>
              <Th>ID Vehiculo</Th>
              <Th>Seguro</Th>
              <Th>Monto</Th>
              <Th></Th>
            </Tr>
          </thead>
          <tbody>
            {alquileres.map((alquiler) => {

              const cliente = clientes.find(c => c.id === alquiler.idCliente);
              const vehiculo = vehiculos.find(v => v.idVehiculo === alquiler.idVehiculo);
              const seguro = seguros.find(s => s.idSeguro === alquiler.idSeguro);

              return (
                <Tr key={alquiler.idAlquiler}>
                  <Td>{alquiler.idAlquiler}</Td>
                  <Td>{cliente ? `${cliente.identificacion} - ${cliente.nombre} ${cliente.apellidos}` : 'No disponible'}</Td>
                  <Td>{alquiler.fechaAlquiler}</Td>
                  <Td>{alquiler.fechaEntrega}</Td>
                  <Td>{vehiculo ? vehiculo.idVehiculo : 'No disponible'}</Td>
                  <Td>{seguro ? seguro.tipoSeguro : 'No disponible'}</Td>
                  <Td>{`${alquiler.monto}$`}</Td>
                  <Td>
                    <BotonDevolver onClick={() => finalizarAlquiler(alquiler.idAlquiler)}>
                      Devolver
                    </BotonDevolver>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <div>
          <div>No hay alquileres activos.</div>
          <br />
          <BotonCancelar as={Link} to="/Alquileres">Regresar</BotonCancelar>
        </div>
      )}
    </ContenedorTabla>
  );
};

export default AdmDetallesAlquiler;

// Continúa con los estilos como los tenías definidos...


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


const BotonCancelar = styled(BotonAccion)`
  background-color: #FF6347; 
  color: white;

  &:hover {
    background-color: #E55347; 
  }
`;
const BotonDevolver = styled(BotonAccion)`
  background-color: #8a0a6e; 
  color: white;

  &:hover {
    opacity: 0.8;
  }
`;

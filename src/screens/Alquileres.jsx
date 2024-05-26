import React from 'react'
import styled from 'styled-components';
import clientes from '../img/clientes.webp';
import cuentas from '../img/cuentas.webp';
import tarjetas from '../img/tarjetas.webp';
import usuarios from '../img/usuarios.webp';
import { Link } from 'react-router-dom';

const Alquileres = () => {
  return (
    <ContenedorPrincipal>
      <ContenedorTitulo>

        <h2>Alquileres</h2>

      </ContenedorTitulo>
      <Contenedor>
        
      <BotonAgregar as={Link} to="/AdmVehiculos">Nuevo Alquiler</BotonAgregar>
        <br></br>
        <BotonAgregar as={Link} to="/Alquileres/AdmAlquileresActivos">Ver Alquileres Activos</BotonAgregar>
        <br></br>
        <BotonAgregar as={Link} to="/Alquileres/AdmHistorialAlquileres">Ver Historial de Alquileres</BotonAgregar>
        <br></br>


      </Contenedor>
      
    </ContenedorPrincipal>
  )
}

export default Alquileres
const BotonNavegar = styled.button`
  background-color: #273352;
  text-decoration: none;
  color: white;
  padding: 10px 20px; /* Aumenté el padding para hacer los botones más grandes */
  margin: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  font-size: 1.1rem; /* Aumenté el tamaño de la fuente */
  transition: opacity 0.3s ease-in-out;
  &:hover {
    opacity: 0.8;
  }
`;

const ContenedorPrincipal = styled.div`
  padding: 90px;
`;

const ContenedorTitulo = styled.div`
  display: flex;
  justify-content: center;
`;

const Contenedor = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap; /* Permite que los botones se envuelvan en múltiples líneas */
`;

const BotonAgregar = styled(BotonNavegar)`
  background-color: #4CAF50;
  &:hover {
    background-color: #3d8b3d; /* Cambié el color del botón al hacer hover */
  }
`;
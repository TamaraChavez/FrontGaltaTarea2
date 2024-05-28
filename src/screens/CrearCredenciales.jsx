import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import inicio from '../img/contrasena.png';

const CrearCredenciales = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Usuario: username,
          Contrasena: password
        })
      });

      const data = await response.json();

      if (response.ok && data.message === 'Usuario agregado exitosamente') {
        alert("Usuario registrado exitosamente");
        navigate('/Login'); // Navega al login después del registro
      } else {
        alert("Error en el registro: " + data.message);
      }
    } catch (error) {
      alert("Error de conexión o del servidor: " + error.message);
      console.error('Register error:', error);
    }
  };

  return (
    <Container>
      <h1>Crear Credenciales</h1>
      <FormContainer>
        <StyledForm onSubmit={handleRegister}>
          <InputLabel>
            Username:
            <StyledInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputLabel>
          <InputLabel>
            Password:
            <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputLabel>
          <ButtonContainer>
            <ButtonPrimary type="submit">Registrar</ButtonPrimary>
          </ButtonContainer>
          <ImageContainer>
            <StyledImage src={inicio} alt="" />
          </ImageContainer>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default CrearCredenciales;

const Container = styled.div`
  padding: 15px;
  height: 82vh; /* Altura del contenedor */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputLabel = styled.label`
  margin-bottom: 5px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px;
  background-color: #f8f8f8;
  justify-content: center;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  height: 100vh; /* Altura del contenedor del formulario */
  max-height: 60vh; /* Altura máxima del contenedor del formulario */
  overflow-y: auto; /* Agregar desplazamiento vertical si el contenido excede la altura */
`;

const StyledForm = styled.form`
  display: flex;
  max-width: 500px;
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

const ButtonBase = styled.button`
  text-decoration: none;
  font-weight: bold;
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

const ButtonPrimary = styled(ButtonBase)`
  background-color: #007bff;
  color: white;

  &:hover {
    background-color: #0056b3;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 200px; /* Ancho deseado */
  height: auto; /* Altura automática para mantener la proporción */
`;
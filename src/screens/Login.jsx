import React, { useState, useEffect } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import inicio from '../img/contrasena.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginAttempts, setLoginAttempts] = useState(0);
  const [isLocked, setIsLocked] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30); // 30 segundos iniciales
  const navigate = useNavigate();

  const hashPassword = (password) => {
    const hash = CryptoJS.SHA256(password);
    return hash.toString();
  }
  useEffect(() => {
    let timer;

    if (isLocked) {
      timer = setInterval(() => {
        setTimeLeft((timeLeft) => {
          if (timeLeft > 1) return timeLeft - 1;
          clearInterval(timer);
          setIsLocked(false);
          setLoginAttempts(0);
          return 30; // Restablecer tiempo de espera
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isLocked]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isLocked) {
      alert(`Demasiados intentos fallidos. Intente nuevamente en ${timeLeft} segundos.`);
      return;
    }

    try {
      const hashedPassword = hashPassword(password);
      const response = await fetch('http://127.0.1:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: username,
          contrasena: password
        })
      });

      const data = await response.json(); 

      if (response.ok && data.message === 'Autenticación exitosa.') {
        alert("Bienvenido " + username);
        navigate('/Principal');
      } else {
        alert("Error de autenticación: " + data.message);
        const newLoginAttempts = loginAttempts + 1;
        setLoginAttempts(newLoginAttempts);
        if (newLoginAttempts >= 3) {
          setIsLocked(true);
          setTimeLeft(30); // Restablece el contador cuando se bloquea
        }
      }
    } catch (error) {
      alert("Error de conexión o del servidor: " + error.message);
      console.error('Login error:', error);
    }
  };

  return (
    <Container>
      <h1>Login</h1>
      <FormContainer>
        <StyledForm onSubmit={handleLogin}>
          <InputLabel>
            Username:
            <StyledInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </InputLabel>
          <InputLabel>
            Password:
            <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          </InputLabel>
          <ButtonContainer>
            <ButtonPrimary type="submit" disabled={isLocked}>
              {isLocked ? `Espera ${timeLeft}s` : 'Login'}
            </ButtonPrimary>
          </ButtonContainer>
          <ImageContainer>
            <StyledImage src={inicio} alt="" />
          </ImageContainer>
        </StyledForm>
      </FormContainer>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  padding: 15px;
  height: 82vh;
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
  height: 100vh;
  max-height: 60vh;
  overflow-y: auto;
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

const ButtonDanger = styled(ButtonBase)`
  background-color: #ff6347;
  color: white;

  &:hover {
    background-color: #e55347;
  }
`;

const ImageContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StyledImage = styled.img`
  width: 200px;
  height: auto;
`;

const LinkContainer = styled.div`
  text-align: center;
  margin-top: 20px;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  font-weight: bold;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;
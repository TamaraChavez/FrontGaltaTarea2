import React from 'react'
import {Link} from 'react-router-dom'
import styled from 'styled-components'

const links = [
  {
    name : "Usuarios",
    href : "/Usuarios",
  },

]

const NavBar = () => {
  return (
    <NavContainer>
      <ContenedorLogo>
        <Link to="/Principal" class="principal" ></Link>
      
      </ContenedorLogo>
      <div>
        {links.map((x) => (
          <Link class='navigation' to={x.href}>{x.name}</Link>
        ))}
      </div>
    </NavContainer>
  );
};

export default NavBar

const ContenedorLogo = styled.div`
  display: flex;
`;

const NavContainer = styled.nav`
  position: fixed;
  padding-top: 10px;
  padding-bottom: 10px;
  background-color: #ff9900; /* Naranja pastel claro */
  display: flex;
  width: 100%;
  justify-content: space-between;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  img {
    max-width: 200px;
  }

  h2 {
    color: white;
    font-weight: 400;
    font-size: 1.5rem;
    span {
      font-weight: bold;
    }
  }

  div {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .navigation {
    color: #05234d; 
    text-decoration: none;
    margin: 0 0.5rem;
    padding: 8px 16px; /* Aumenté el padding para hacer los botones más grandes */
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;
    font-weight: bold;
    border: 2px solid #f5f5dc; /* Borde sólido verde pastel */
    background-color: #f5f5dc; /* Fondo beige */
    font-family: 'Roboto', sans-serif; /* Cambia la fuente a Roboto */
    border-radius: 8px; /* Bordes redondeados */

    &:hover {
      background-color: #6b8ca0; /* Morado más intenso al pasar el mouse */
      color: #333333;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    div {
      flex-direction: column;
      align-items: flex-start;
      width: 100%;
    }

    a {
      margin: 0.5rem 0;
    }
  }
`;

export { ContenedorLogo, NavContainer };

import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
background-color: #ff9900;
color: white;
padding: 10px;
text-align: center;
width: 100%;
position: flex;
bottom: 0;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <p>© {new Date().getFullYear()} Todos los derechos reservados.</p>
    </FooterContainer>
  );
};

export default Footer;
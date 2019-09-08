import React from 'react';
import logo from 'logo.svg';
import styled from 'styled-components';
import './styles.css';

const HeaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  margin: 20px 0px;
  font-size: 25px;
`;

const Header = () => (
  <HeaderContainer>
    Multiplayer Game of Life created with
    <img className="App-logo" src={logo} />, Socket.io and Node.js
  </HeaderContainer>
);

export default Header;

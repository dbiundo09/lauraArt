import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Nav = styled.nav`
  padding: 2rem;
  position: fixed;
  width: 100%;
  z-index: 100;
  background: rgba(255, 240, 243, 0.95);
  backdrop-filter: blur(5px);
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Logo = styled(Link)`
  font-family: ${props => props.theme.fonts.accent};
  font-size: 2rem;
  color: ${props => props.theme.colors.accent2};
`;

const NavLinks = styled.div`
  display: flex;
  gap: 2rem;

  a {
    font-family: ${props => props.theme.fonts.accent};
    font-size: 1.2rem;
    position: relative;
    
    &:after {
      content: '';
      position: absolute;
      width: 0;
      height: 1px;
      bottom: -2px;
      left: 0;
      background-color: ${props => props.theme.colors.accent2};
      transition: width 0.3s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }
`;

const Navigation = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    navigate(path);
  };

  return (
    <Nav>
      <NavContainer>
        <Logo to="/" onClick={() => handleNavigation('/')}>Laura's Art</Logo>
        <NavLinks>
          <Link to="/" onClick={() => handleNavigation('/')}>Home</Link>
          <Link to="/progress" onClick={() => handleNavigation('/progress')}>Progress</Link>
          <Link to="/about" onClick={() => handleNavigation('/about')}>About</Link>
        </NavLinks>
      </NavContainer>
    </Nav>
  );
};

export default Navigation; 
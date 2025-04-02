import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const HomeContainer = styled.div`
  min-height: 100vh;
  padding-top: 80px;
`;

const Hero = styled.section`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  
  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.accent1}22,
      ${props => props.theme.colors.primary}22);
    z-index: -1;
  }
`;

const HeroTitle = styled(motion.h1)`
  font-size: 5rem;
  margin-bottom: 1rem;
  text-align: center;
  color: ${props => props.theme.colors.accent2};
  font-family: ${props => props.theme.fonts.heading};

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    font-size: 3rem;
  }
`;

const HeroSubtitle = styled(motion.p)`
  font-size: 1.5rem;
  max-width: 600px;
  text-align: center;
  margin: 0 auto;
  color: ${props => props.theme.colors.text};
  font-family: ${props => props.theme.fonts.main};
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const Home = () => {
  return (
    <HomeContainer>
      <Hero>
        <HeroTitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Laura's Art Gallery
        </HeroTitle>
        <HeroSubtitle
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
        </HeroSubtitle>
      </Hero>
    </HomeContainer>
  );
};

export default Home; 
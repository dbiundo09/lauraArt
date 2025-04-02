import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutContainer = styled.div`
  min-height: 100vh;
  padding: 120px 2rem 4rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const AboutContent = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const AboutText = styled.div`
  h2 {
    font-size: 3rem;
    margin-bottom: 2rem;
    color: ${props => props.theme.colors.accent2};
  }

  p {
    margin-bottom: 1.5rem;
    font-size: 1.1rem;
    line-height: 1.8;
  }
`;

const ArtistImage = styled(motion.div)`
  width: 100%;
  height: 500px;
  background-color: ${props => props.theme.colors.accent1}33;
  border-radius: 20px;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, 
      ${props => props.theme.colors.primary}22,
      ${props => props.theme.colors.secondary}22);
  }
`;

const About = () => {
  return (
    <AboutContainer>
      <AboutContent>
        <AboutText>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            About the Artist
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </p>
            <p>
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
              Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.
            </p>
          </motion.div>
        </AboutText>
        <ArtistImage
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
      </AboutContent>
    </AboutContainer>
  );
};

export default About; 
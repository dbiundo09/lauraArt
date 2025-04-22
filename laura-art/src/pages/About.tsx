import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const AboutWrapper = styled.div`
  background-color: rgb(252, 234, 230);
  min-height: 100vh;
`;

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

const ArtistImage = styled(motion.img)`
  width: 100%;
  height: 500px;
  object-fit: cover;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
  transition: transform 0.3s ease;
`;

const About = () => {
  return (
    <AboutWrapper>
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
              Laura Haas's paintings explore the fluid boundaries between friendship and identity—how we are shaped by those around us, and how we, in turn, shape them. Through layered compositions and intimate perspectives drawn from moments with close girl-friends, she aims to give form to the feelings of both understanding and isolation that arise within human connection. Each image becomes a site of negotiation: between self and other, memory and presence, past and possibility.
              </p>
              <p>
              Haas is especially drawn to moments of emotional residue — where gestures, objects, and spaces carry the weight of shared histories. These fragments come together to form portraits that are less about likeness and more about feeling. Identity, in her work, is not fixed. It shifts and softens, often reflected through ambiguous faces and blurred boundaries.
              </p>
              <p>
              By engaging with these intersections, Haas creates spaces for reflection — where viewers might recognize themselves, their relationships, or their own evolving sense of self mirrored in the work.
              </p>
            </motion.div>
          </AboutText>
          <ArtistImage
            src="headshot.JPG"
            alt="Laura Haas"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          />
        </AboutContent>
      </AboutContainer>
    </AboutWrapper>
  );
};

export default About; 
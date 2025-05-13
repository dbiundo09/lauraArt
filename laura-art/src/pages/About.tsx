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

const InstagramButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background-color: ${props => props.theme.colors.accent2};
  color: white;
  padding: 0.8rem 1.5rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.accent};
  font-size: 1.1rem;
  margin-top: 2rem;
  text-decoration: none;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }

  svg {
    width: 20px;
    height: 20px;
  }
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
                Laura Haas's paintings explore the fluid boundaries between friendship and identity—how we are shaped by those around us, and how we, in turn, shape them. Through layered compositions and intimate perspectives drawn from moments with close friends, she aims to give form to the feelings of both understanding and isolation that arise within human connection. Each image becomes a site of negotiation: between self and other, memory and presence, past and possibility.
              </p>
              <p>
                Haas is especially drawn to moments of emotional residue — where gestures, objects, and spaces carry the weight of shared histories. These fragments come together to form portraits that are less about likeness and more about feeling. Identity, in her work, is not fixed. It shifts and softens, often reflected through ambiguous faces and blurred boundaries.
              </p>
              <p>
                By engaging with these intersections, Haas creates spaces for reflection — where viewers might recognize themselves, their relationships, or their own evolving sense of self mirrored in the work.
              </p>
              <InstagramButton
                href="https://www.instagram.com/laurasarrtt/"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                Follow on Instagram
              </InstagramButton>
            </motion.div>
          </AboutText>
          <ArtistImage
            src="https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/headshot.JPG?alt=media&token=4089e5fa-e636-42d7-9b9e-5c2e26372195"
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
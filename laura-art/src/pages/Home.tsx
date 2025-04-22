import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const HomeWrapper = styled.div`
  background-color: rgb(252, 234, 230);
  min-height: 100vh;
`;

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
      rgba(252, 234, 230, 0.8),
      rgba(252, 234, 230, 0.4));
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

const GallerySection = styled.section`
  padding: 4rem 2rem;
  background-color: rgb(252, 234, 230);
`;

const ArtworkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ArtworkCard = styled(motion.div)`
  position: relative;
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  aspect-ratio: 3/4;
  
  &:hover img {
    transform: scale(1.05);
  }
`;

const ArtworkImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
`;

const Lightbox = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: 2rem;
`;

const LightboxImage = styled(motion.img)`
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
`;

const CloseButton = styled(motion.button)`
  position: absolute;
  top: 2rem;
  right: 2rem;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
  
  &:hover {
    opacity: 0.8;
  }
`;

const ScrollButton = styled(motion.button)`
  background-color: ${props => props.theme.colors.accent2};
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.accent};
  font-size: 1.2rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 2rem;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ProgressButton = styled(Link)`
  display: inline-block;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 1rem 2rem;
  border-radius: 30px;
  font-family: ${props => props.theme.fonts.accent};
  font-size: 1.2rem;
  margin-top: 4rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
`;

const ScrollTopButton = styled(motion.button)`

  position: fixed;
  bottom: 2rem;
  right: 2rem;
  background-color: ${props => props.theme.colors.accent2};
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 100;
`;

const images = [
  `${process.env.PUBLIC_URL}/images/img1.jpg`,
  `${process.env.PUBLIC_URL}/images/img2.jpeg`,
  `${process.env.PUBLIC_URL}/images/img3.jpeg`,
  `${process.env.PUBLIC_URL}/images/img4.jpeg`,
  `${process.env.PUBLIC_URL}/images/img5.jpeg`

];

const Home = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToGallery = () => {
    galleryRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <HomeWrapper>
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
            Exploring the boundaries between friendship and identity
          </HeroSubtitle>
          <ButtonContainer>
            <ScrollButton
              onClick={scrollToGallery}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              View Gallery
            </ScrollButton>
          </ButtonContainer>
        </Hero>

        <GallerySection ref={galleryRef}>
          <ArtworkGrid>
            {images.map((image, index) => (
              <ArtworkCard
                key={image}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedImage(image)}
              >
                <ArtworkImage src={image} alt={`Artwork ${index + 1}`} />
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        </GallerySection>

        <AnimatePresence>
          {selectedImage && (
            <Lightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >
              <CloseButton
                onClick={() => setSelectedImage(null)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ×
              </CloseButton>
              <LightboxImage
                src={selectedImage}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </Lightbox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollButton && (
            <ScrollTopButton
              onClick={handleScrollTop}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ↑
            </ScrollTopButton>
          )}
        </AnimatePresence>
      </HomeContainer>
    </HomeWrapper>
  );
};

export default Home; 
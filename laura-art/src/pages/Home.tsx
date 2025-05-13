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

const LightboxContent = styled.div`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: calc(90vh - 150px);
  object-fit: contain;
`;

const ArtworkInfo = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 1.5rem;
  font-family: ${props => props.theme.fonts.main};
  border-radius: 8px;
  width: 100%;
  max-width: 600px;
  text-align: center;
`;

const ArtworkTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  font-family: ${props => props.theme.fonts.heading};
`;

const ArtworkDetails = styled.p`
  font-size: 1rem;
  opacity: 0.9;
  line-height: 1.4;
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

interface Artwork {
  title: string;
  year: string;
  medium: string;
  dimensions: string;
  imageUrl: string;
}

const artworks: Artwork[] = [
  {
    title: "Kairos",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "18 in x 25 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img10.jpg?alt=media&token=b52a00f8-4700-41a5-8c88-99a94cec1085"
  },
  {
    title: "Blue Bath",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "24 in x 30 in x 2 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img4.jpeg?alt=media&token=3a2a61db-9653-4ec5-a8ec-d586cf5c14c1"
  },
  {
    title: "Beach Bath",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "20 in x 16 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img3.jpeg?alt=media&token=73ba0d4b-c9c1-4888-8c98-516906da90e9"
  },
  {
    title: "Sarah and Laura",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "12 in x 16 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img5.jpeg?alt=media&token=6cd28ede-108f-4f83-9182-e6c9a130ff9c"
  },
  {
    title: "Untitled",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "30 in x 40 in x 2 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img6.jpg?alt=media&token=49b8db2e-f27b-4263-b428-cf5d8960ad6f"
  },
  {
    title: "Girl Talks",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "18 in x 24 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img7.jpg?alt=media&token=052d987d-e1b3-4225-a3e1-2d34950f06a9"
  },
  {
    title: "Girl on Beach",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "24 in x 18 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img8.jpg?alt=media&token=1148d91c-f260-43a2-8607-a9001c34cab2"
  },
  {
    title: "Poker game",
    year: "2025",
    medium: "Oil on canvas",
    dimensions: "18 in x 24 in x 1.5 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img9.jpg?alt=media&token=c1d2512d-577b-47f8-9fe2-d55c3b3936ae"
  },
  {
    title: "In the Mod Light",
    year: "2024",
    medium: "Oil on paper",
    dimensions: "24 in x 30 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img1.jpg?alt=media&token=f7ca71dc-4e7b-4dd7-bc03-12a93e4f0d5d"
  },
  {
    title: "In the Grass",
    year: "2024",
    medium: "Oil on paper",
    dimensions: "8.5 in x 12 in",
    imageUrl: "https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/img2.jpeg?alt=media&token=74058c99-48c9-468e-9847-3528cfd354a5"
  }
];

const Home = () => {
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Laura's Art Gallery
          </HeroTitle>
          <HeroSubtitle
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Exploring the boundaries between friendship and identity
          </HeroSubtitle>
          <ButtonContainer>
            <ScrollButton
              onClick={scrollToGallery}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              View Gallery
            </ScrollButton>
          </ButtonContainer>
        </Hero>

        <GallerySection ref={galleryRef}>
          <ArtworkGrid>
            {artworks.map((artwork) => (
              <ArtworkCard
                key={artwork.imageUrl}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                whileHover={{ y: -2 }}
                onClick={() => setSelectedArtwork(artwork)}
              >
                <ArtworkImage src={artwork.imageUrl} alt={artwork.title} />
              </ArtworkCard>
            ))}
          </ArtworkGrid>
        </GallerySection>

        <AnimatePresence>
          {selectedArtwork && (
            <Lightbox
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedArtwork(null)}
            >
              <CloseButton
                onClick={() => setSelectedArtwork(null)}
                whileHover={{ scale: 1.05 }}
              >
                ×
              </CloseButton>
              <LightboxContent onClick={(e) => e.stopPropagation()}>
                <LightboxImage
                  src={selectedArtwork.imageUrl}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
                <ArtworkInfo
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <ArtworkTitle>{selectedArtwork.title}, {selectedArtwork.year}</ArtworkTitle>
                  <ArtworkDetails>
                    {selectedArtwork.medium}<br />
                    {selectedArtwork.dimensions}
                  </ArtworkDetails>
                </ArtworkInfo>
              </LightboxContent>
            </Lightbox>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showScrollButton && (
            <ScrollTopButton
              onClick={handleScrollTop}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              whileHover={{ scale: 1.05 }}
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
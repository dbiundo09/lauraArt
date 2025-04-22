import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressContainer = styled.div`
  min-height: 100vh;
  padding: 120px 2rem 4rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const ProgressTitle = styled(motion.h1)`
  font-size: 3rem;
  color: ${props => props.theme.colors.accent2};
  margin-bottom: 2rem;
  text-align: center;
`;

const TimelineContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
`;

const TimelineItem = styled(motion.div)`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  align-items: center;
  padding: 2rem;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.tablet}) {
    grid-template-columns: 1fr;
  }
`;

const TimelineImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
`;

const TimelineContent = styled.div`
  h3 {
    font-size: 1.8rem;
    color: ${props => props.theme.colors.accent2};
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.1rem;
    line-height: 1.6;
    color: ${props => props.theme.colors.text};
  }
`;

const ImageCarousel = styled.div`
  position: relative;
  width: 100%;
  border-radius: 8px;
  overflow: hidden;
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 1rem;
  z-index: 2;
`;

const CarouselDot = styled.button<{ active: boolean }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background-color: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.2);
  }
`;

const CarouselArrow = styled(motion.button)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 2;
  
  &:hover {
    background: white;
  }

  &.prev {
    left: 1rem;
  }

  &.next {
    right: 1rem;
  }
`;

const StageLabel = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-size: 0.9rem;
  z-index: 2;
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

interface ArtworkProgress {
  id: string;
  title: string;
  description: string;
  stages: {
    image: string;
    label: string;
  }[];
}

const artworkProgress: ArtworkProgress[] = [
  {
    id: '1',
    title: 'Portrait Study',
    description: 'An exploration of emotion through portraiture, focusing on the interplay of light and shadow.',
    stages: [
      { image: 'images/progress/img2.jpeg', label: 'Initial Sketch' },
      { image: 'images/progress/img1.jpeg', label: 'Base Colors' }
    ]
  },{
    id: '2',
    title: 'Portrait Study',
    description: 'An exploration of emotion through portraiture, focusing on the interplay of light and shadow.',
    stages: [
      { image: 'images/progress/img5.jpeg', label: 'Initial Sketch' },
      { image: 'images/progress/img9.jpg', label: 'Base Colors' },
      { image: 'images/progress/img10.jpg', label: 'Final Details' },
      { image: 'images/progress/img8.jpg', label: 'Final Details' },
    ]
  },{
    id: '3',
    title: 'Portrait Study',
    description: 'An exploration of emotion through portraiture, focusing on the interplay of light and shadow.',
    stages: [
      { image: 'images/progress/img6.jpeg', label: 'Initial Sketch' },
    ]
  },
  {
    id: '4',
    title: 'Portrait Study',
    description: 'An exploration of emotion through portraiture, focusing on the interplay of light and shadow.',
    stages: [
      { image: 'images/progress/img7.jpeg', label: 'Initial Sketch' }
    ]
  },
{
    id: '5',
    title: 'Portrait Study',
    description: 'An exploration of emotion through portraiture, focusing on the interplay of light and shadow.',
    stages: [
      { image: 'images/progress/img3.jpeg', label: 'Initial Sketch' },
      { image: 'images/progress/img4.jpeg', label: 'Initial Sketch' }
    ]
  }
    // Add more artwork progress items as needed
];

const Progress = () => {
  const [currentStages, setCurrentStages] = useState<Record<string, number>>(
    Object.fromEntries(artworkProgress.map(art => [art.id, 0]))
  );
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Add scroll event listener to show/hide scroll button
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

  const handleNext = (artworkId: string) => {
    setCurrentStages(prev => ({
      ...prev,
      [artworkId]: (prev[artworkId] + 1) % artworkProgress.find(art => art.id === artworkId)!.stages.length
    }));
  };

  const handlePrev = (artworkId: string) => {
    setCurrentStages(prev => ({
      ...prev,
      [artworkId]: prev[artworkId] === 0 
        ? artworkProgress.find(art => art.id === artworkId)!.stages.length - 1 
        : prev[artworkId] - 1
    }));
  };

  return (
    <ProgressContainer>
      <ProgressTitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Painting Progression
      </ProgressTitle>

      <TimelineContainer>
        {artworkProgress.map((artwork) => (
          <TimelineItem
            key={artwork.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ImageCarousel>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStages[artwork.id]}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <TimelineImage 
                    src={artwork.stages[currentStages[artwork.id]].image} 
                    alt={`${artwork.title} - ${artwork.stages[currentStages[artwork.id]].label}`} 
                  />
                  <StageLabel>
                    {artwork.stages[currentStages[artwork.id]].label}
                  </StageLabel>
                </motion.div>
              </AnimatePresence>

              {/* Only show carousel controls if there are multiple images */}
              {artwork.stages.length > 1 && (
                <>
                  <CarouselControls>
                    {artwork.stages.map((_, index) => (
                      <CarouselDot
                        key={index}
                        active={currentStages[artwork.id] === index}
                        onClick={() => setCurrentStages(prev => ({ ...prev, [artwork.id]: index }))}
                      />
                    ))}
                  </CarouselControls>

                  <CarouselArrow
                    className="prev"
                    onClick={() => handlePrev(artwork.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    ←
                  </CarouselArrow>
                  <CarouselArrow
                    className="next"
                    onClick={() => handleNext(artwork.id)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    →
                  </CarouselArrow>
                </>
              )}
            </ImageCarousel>

            <TimelineContent>
              <h3>{artwork.title}</h3>
              <p>{artwork.description}</p>
            </TimelineContent>
          </TimelineItem>
        ))}
      </TimelineContainer>

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
    </ProgressContainer>
  );
};

export default Progress; 
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const ProgressWrapper = styled.div`
  background-color: rgb(252, 234, 230);
  min-height: 100vh;
`;

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

const ProgressGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ProgressCard = styled(motion.div)`
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

const ProgressImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
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
`;

const LightboxImage = styled(motion.img)`
  max-width: 100%;
  max-height: calc(90vh - 120px);
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

const LoadingContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgb(252, 234, 230);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  gap: 1rem;
`;

const LoadingText = styled.h2`
  color: ${props => props.theme.colors.accent2};
  font-size: 1.5rem;
  margin-bottom: 1rem;
`;

const ProgressBarContainer = styled.div`
  width: 300px;
  height: 4px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 2px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)`
  height: 100%;
  background-color: ${props => props.theme.colors.accent2};
  width: 0%;
`;

interface ProgressImage {
  image: string;
  label: string;
}

const progressImages: ProgressImage[] = [
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg2.jpeg?alt=media&token=1fa666f3-8b2b-432a-8495-1b989c342981', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg1.jpeg?alt=media&token=4f374569-b045-48c5-8ef8-210f4f833e4f', label: 'Base Colors' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg5.jpeg?alt=media&token=6dba481e-7212-41c3-ac9d-5275fbcbe207', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg9.jpg?alt=media&token=cc7bde64-5ca4-4e97-b9d5-bbf10ece67cd', label: 'Base Colors' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg10.jpg?alt=media&token=6f6efbf4-d271-448c-9316-f4bfa4a99f52', label: 'Final Details' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg8.jpg?alt=media&token=e6148c1f-db9e-4c7c-8cbe-0180a1507ef3', label: 'Final Details' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg6.jpeg?alt=media&token=8df817a6-d109-41dc-be67-5db866a3311b', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg7.jpeg?alt=media&token=250f5807-e819-479c-b64c-a4d77111c8af', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg3.jpeg?alt=media&token=9eddb820-1ec0-4de8-ad71-6a3f8585c616', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2Fimg4.jpeg?alt=media&token=fe1246dc-147a-498a-9dbe-a02d6b4c0e13', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0082_(1).jpg?alt=media&token=ca66a702-b7ca-41c9-89cf-956d654fd94d', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0082_(1).jpg?alt=media&token=ca66a702-b7ca-41c9-89cf-956d654fd94d', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0853.jpg?alt=media&token=28c53cd3-54f9-48b1-8af1-9024fb29828f', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0854.jpg?alt=media&token=b40cd1d6-2143-43b7-b868-4eb27135ca09', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0855.jpg?alt=media&token=82698a25-6243-4257-86c8-4cb22e383c64', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0857.jpg?alt=media&token=567d34e8-f9d0-4a0f-9186-4124f5b506b8', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0859.jpg?alt=media&token=18846a1f-0aa3-41c1-9a31-5485d2522931', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0860.jpg?alt=media&token=9a8b5099-c452-4ac2-a533-9366b4ebc380', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0861.jpg?alt=media&token=369d23af-d654-44f9-bdf9-4094cead20a4', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0862.jpg?alt=media&token=4adf0264-f310-42e2-9de5-d53e1309437f', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0863.jpg?alt=media&token=fdedb569-c6a4-4322-b51b-eb0c9e6b50ea', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0864.jpg?alt=media&token=16e933a2-f0de-4845-830e-3fdba1871bfa', label: 'Initial Sketch' },
  { image: 'https://firebasestorage.googleapis.com/v0/b/laura-ef296.firebasestorage.app/o/progress%2FIMG_0865.jpg?alt=media&token=f10bc72b-d794-427b-b4cd-57fcaba68bfa', label: 'Initial Sketch' }
];

const Progress: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<ProgressImage | null>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Preload images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = progressImages.map((item) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = item.image;
          img.onload = () => {
            setLoadedImages(prev => {
              const newSet = new Set(prev);
              newSet.add(item.image);
              return newSet;
            });
            resolve(img);
          };
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(imagePromises);
        setTimeout(() => {
          setIsLoading(false);
        }, 500);
      } catch (error) {
        console.error('Error loading images:', error);
        // If there's an error, we should still show the gallery
        setIsLoading(false);
      }
    };

    preloadImages();
  }, []);

  const loadingProgress = (loadedImages.size / progressImages.length) * 100;

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <ProgressWrapper>
      <AnimatePresence>
        {isLoading && (
          <LoadingContainer
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LoadingText>Loading Gallery</LoadingText>
            <ProgressBarContainer>
              <ProgressBar
                initial={{ width: '0%' }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.3 }}
              />
            </ProgressBarContainer>
          </LoadingContainer>
        )}
      </AnimatePresence>

      <ProgressContainer>
        <ProgressTitle
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Progression and Experimentation
        </ProgressTitle>

        <ProgressGrid>
          {progressImages.map((item) => (
            <ProgressCard
              key={item.image}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              whileHover={{ y: -2 }}
              onClick={() => setSelectedImage(item)}
            >
              <ProgressImage
                src={item.image}
                alt={item.label}
              />
            </ProgressCard>
          ))}
        </ProgressGrid>

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
                whileHover={{ scale: 1.05 }}
              >
                ×
              </CloseButton>
              <LightboxContent onClick={(e) => e.stopPropagation()}>
                <LightboxImage
                  src={selectedImage.image}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
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
      </ProgressContainer>
    </ProgressWrapper>
  );
};

export default Progress; 
import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&family=Italiana&family=Playfair+Display:wght@400;500;600&display=swap');

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: ${theme.fonts.main};
    background-color: ${theme.colors.background};
    color: ${theme.colors.text};
    line-height: 1.6;
    overflow-x: hidden;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: 500;
  }

  a {
    text-decoration: none;
    color: inherit;
  }
`;

export default GlobalStyle; 
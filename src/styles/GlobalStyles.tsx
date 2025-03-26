import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  :root {
    --color-primary: ${props => props.theme.colors.primary};
    --color-secondary: ${props => props.theme.colors.secondary};
    --color-danger: ${props => props.theme.colors.danger};
    --color-background: ${props => props.theme.colors.background};
    --color-text: ${props => props.theme.colors.text};
    --color-button: ${props => props.theme.colors.button};
    --color-button-text: ${props => props.theme.colors.buttonText};
    --color-display: ${props => props.theme.colors.display};
    --border-radius: ${props => props.theme.borderRadius};
    --transition: ${props => props.theme.transition};
  }
`;
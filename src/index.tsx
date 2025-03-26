import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/global.css';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { theme } from './styles/theme';
import { CalculatorProvider } from './context/CalculatorContext';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CalculatorProvider>
        <App />
      </CalculatorProvider>
    </ThemeProvider>
  </React.StrictMode>
);
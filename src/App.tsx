import React, { useEffect } from 'react';
import { Calculator } from './components/Calculator';
import { GlobalStyles } from './styles/GlobalStyles';
import { useCalculator } from './hooks/useCalculator';
import ErrorBoundary from './components/ErrorBoundary';

const App: React.FC = () => {
  const { handleKeyDown } = useCalculator();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <>
      <GlobalStyles />
      <div className="app-container">
        <h1>React Mini Calculator</h1>
        <ErrorBoundary>
          <Calculator />
        </ErrorBoundary>
      </div>
    </>
  );
};

export default App;
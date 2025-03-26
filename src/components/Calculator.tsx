import React, { useMemo } from 'react';
import styled from 'styled-components';
import { Display } from './Display';
import { ButtonPad } from './ButtonPad';
import { useCalculator } from '../hooks/useCalculator';
import { formatNumber } from '../utils';

export const Calculator: React.FC = () => {
  const { state } = useCalculator();
  
  // Format the display value for better UX
  const formattedDisplay = useMemo(() => {
    if (state.display === 'Error: Division by zero') return state.display;
    return formatNumber(state.display);
  }, [state.display]);
  
  return (
    <CalculatorContainer>
      <Display value={formattedDisplay} />
      <ButtonPad />
    </CalculatorContainer>
  );
};

const CalculatorContainer = styled.div`
  width: 100%;
  max-width: 320px;
  background-color: ${props => props.theme.colors.background};
  border-radius: ${props => props.theme.borderRadius};
  box-shadow: ${props => props.theme.boxShadow};
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  
  @media (max-width: 340px) {
    padding: 15px;
    max-width: 290px;
  }
`;
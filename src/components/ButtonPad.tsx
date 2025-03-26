import React, { memo } from 'react';
import styled from 'styled-components';
import { Button } from './Button';
import { useCalculator } from '../hooks/useCalculator';
import { OperationType } from '../types';

export const ButtonPad: React.FC = memo(() => {
  const {
    handleDigitClick,
    handleOperationClick,
    handleEqualsClick,
    handleClearClick,
    handleDeleteClick,
    handleDecimalClick
  } = useCalculator();
  
  return (
    <ButtonGrid>
      <Button 
        value="C" 
        onClick={handleClearClick} 
        type="clear" 
        aria-label="Clear all"
      />
      <Button 
        value="⌫" 
        onClick={handleDeleteClick} 
        type="delete" 
        aria-label="Delete"
      />
      <Button 
        value="÷" 
        onClick={() => handleOperationClick(OperationType.DIVIDE)} 
        type="operation" 
        aria-label="Divide"
      />
      <Button 
        value="×" 
        onClick={() => handleOperationClick(OperationType.MULTIPLY)} 
        type="operation" 
        aria-label="Multiply"
      />
      <Button 
        value="7" 
        onClick={() => handleDigitClick('7')} 
        type="digit"
      />
      <Button 
        value="8" 
        onClick={() => handleDigitClick('8')} 
        type="digit"
      />
      <Button 
        value="9" 
        onClick={() => handleDigitClick('9')} 
        type="digit"
      />
      <Button 
        value="-" 
        onClick={() => handleOperationClick(OperationType.SUBTRACT)} 
        type="operation" 
        aria-label="Subtract"
      />
      <Button 
        value="4" 
        onClick={() => handleDigitClick('4')} 
        type="digit"
      />
      <Button 
        value="5" 
        onClick={() => handleDigitClick('5')} 
        type="digit"
      />
      <Button 
        value="6" 
        onClick={() => handleDigitClick('6')} 
        type="digit"
      />
      <Button 
        value="+" 
        onClick={() => handleOperationClick(OperationType.ADD)} 
        type="operation" 
        aria-label="Add"
      />
      <Button 
        value="1" 
        onClick={() => handleDigitClick('1')} 
        type="digit"
      />
      <Button 
        value="2" 
        onClick={() => handleDigitClick('2')} 
        type="digit"
      />
      <Button 
        value="3" 
        onClick={() => handleDigitClick('3')} 
        type="digit"
      />
      <Button 
        value="=" 
        onClick={handleEqualsClick} 
        type="equals" 
        span="double" 
        aria-label="Equals"
      />
      <Button 
        value="0" 
        onClick={() => handleDigitClick('0')} 
        type="digit" 
        span="double"
      />
      <Button 
        value="." 
        onClick={handleDecimalClick} 
        type="digit" 
        aria-label="Decimal point"
      />
    </ButtonGrid>
  );
});

const ButtonGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 10px;
  
  @media (max-width: 340px) {
    grid-gap: 8px;
  }
`;
import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import { ButtonProps } from '../types';

export const Button: React.FC<ButtonProps> = memo(({ 
  value, 
  onClick, 
  type = 'digit', 
  span = 'normal',
  'aria-label': ariaLabel
}) => {
  return (
    <StyledButton 
      onClick={onClick} 
      $type={type} 
      $span={span}
      aria-label={ariaLabel}
    >
      {value}
    </StyledButton>
  );
});

interface StyledButtonProps {
  $type: 'digit' | 'operation' | 'equals' | 'clear' | 'delete';
  $span: 'normal' | 'double';
}

const StyledButton = styled.button<StyledButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${props => props.theme.fontFamily};
  font-size: 1.5rem;
  border: none;
  border-radius: ${props => props.theme.borderRadius};
  padding: 15px;
  cursor: pointer;
  transition: ${props => props.theme.transition};
  
  ${props => props.$span === 'double' && css`
    grid-column: span 2;
  `}
  
  /* Button type styles */
  ${props => {
    switch(props.$type) {
      case 'digit':
        return css`
          background-color: ${props.theme.colors.button};
          color: ${props.theme.colors.buttonText};
          &:hover, &:focus {
            background-color: #d3d3d3;
          }
        `;
      case 'operation':
        return css`
          background-color: ${props.theme.colors.operator};
          color: white;
          font-weight: bold;
          &:hover, &:focus {
            background-color: #3b4fd8;
          }
        `;
      case 'equals':
        return css`
          background-color: ${props.theme.colors.equals};
          color: white;
          font-weight: bold;
          &:hover, &:focus {
            background-color: #32098d;
          }
        `;
      case 'clear':
        return css`
          background-color: ${props.theme.colors.clear};
          color: white;
          font-weight: bold;
          &:hover, &:focus {
            background-color: #d51b33;
          }
        `;
      case 'delete':
        return css`
          background-color: #ffa500;
          color: white;
          font-weight: bold;
          &:hover, &:focus {
            background-color: #e69500;
          }
        `;
      default:
        return '';
    }
  }}
  
  &:active {
    transform: scale(0.95);
  }
  
  &:focus {
    outline: 3px solid rgba(0, 123, 255, 0.5);
    outline-offset: 2px;
  }
  
  @media (max-width: 340px) {
    font-size: 1.2rem;
    padding: 12px;
  }
`;
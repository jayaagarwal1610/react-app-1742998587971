import React from 'react';
import styled from 'styled-components';

interface DisplayProps {
  value: string;
}

export const Display: React.FC<DisplayProps> = ({ value }) => {
  return (
    <DisplayContainer role="textbox" aria-live="polite" aria-readonly={true}>
      {value}
    </DisplayContainer>
  );
};

const DisplayContainer = styled.div`
  width: 100%;
  min-height: 60px;
  background-color: ${props => props.theme.colors.display};
  border-radius: ${props => props.theme.borderRadius};
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px 16px;
  font-size: 1.75rem;
  font-family: ${props => props.theme.fontFamily};
  overflow: hidden;
  word-break: break-all;
  text-align: right;
  box-shadow: inset 0 2px 5px rgba(0, 0, 0, 0.1);
  
  @media (max-width: 340px) {
    font-size: 1.5rem;
    min-height: 50px;
  }
`;
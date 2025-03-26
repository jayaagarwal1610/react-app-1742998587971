import React, { Component, ErrorInfo, ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };
  
  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }
  
  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('Calculator error:', error, errorInfo);
  }
  
  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <ErrorContainer>
          <h2>Something went wrong</h2>
          <p>We encountered an error while processing your calculation.</p>
          <ErrorMessage>{this.state.error?.message}</ErrorMessage>
          <ResetButton onClick={() => this.setState({ hasError: false })}>
            Reset Calculator
          </ResetButton>
        </ErrorContainer>
      );
    }
    
    return this.props.children;
  }
}

const ErrorContainer = styled.div`
  background-color: #fff3f3;
  border: 1px solid #ffcccb;
  border-radius: 8px;
  padding: 20px;
  margin: 20px 0;
  text-align: center;
  max-width: 320px;
`;
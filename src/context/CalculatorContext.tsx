import React, { createContext, useReducer, useCallback } from 'react';
import { CalculatorState, CalculatorAction, CalculatorContextProps, OperationType } from '../types';
import { calculate, getActionFromKey } from '../utils';

const initialState: CalculatorState = {
  display: '0',
  currentValue: '',
  previousValue: '',
  operation: OperationType.NONE,
  isResult: false,
};

const reducer = (state: CalculatorState, action: CalculatorAction): CalculatorState => {
  switch (action.type) {
    case 'DIGIT': {
      const digit = action.payload?.digit || '';
      
      // If showing the result, start with a new number
      if (state.isResult) {
        return {
          ...initialState,
          display: digit,
          currentValue: digit,
        };
      }
      
      // If the current value is '0', replace it
      if (state.currentValue === '0' && digit === '0') {
        return state;
      }
      
      // Don't allow more than 16 digits
      if (state.currentValue.replace(/[^0-9]/g, '').length >= 16) {
        return state;
      }
      
      const newValue = state.currentValue === '0' ? digit : state.currentValue + digit;
      
      return {
        ...state,
        display: newValue,
        currentValue: newValue,
      };
    }
    
    case 'DECIMAL': {
      // If showing the result, start with a new decimal
      if (state.isResult) {
        return {
          ...initialState,
          display: '0.',
          currentValue: '0.',
        };
      }
      
      // If already has a decimal, don't add another
      if (state.currentValue.includes('.')) {
        return state;
      }
      
      const newValue = state.currentValue === '' ? '0.' : `${state.currentValue}.`;
      
      return {
        ...state,
        display: newValue,
        currentValue: newValue,
      };
    }
    
    case 'OPERATION': {
      const operation = action.payload?.operation || OperationType.NONE;
      
      // If there's already a previous value and operation, calculate the result first
      if (state.previousValue && state.currentValue && state.operation !== OperationType.NONE) {
        const result = calculate(state.previousValue, state.currentValue, state.operation);
        
        return {
          display: result,
          previousValue: result,
          currentValue: '',
          operation,
          isResult: false,
        };
      }
      
      return {
        ...state,
        previousValue: state.currentValue || state.previousValue || '0',
        currentValue: '',
        operation,
        isResult: false,
      };
    }
    
    case 'CALCULATE': {
      if (!state.previousValue || !state.currentValue || state.operation === OperationType.NONE) {
        return state;
      }
      
      const result = calculate(state.previousValue, state.currentValue, state.operation);
      
      return {
        display: result,
        previousValue: '',
        currentValue: result,
        operation: OperationType.NONE,
        isResult: true,
      };
    }
    
    case 'CLEAR': {
      return initialState;
    }
    
    case 'DELETE': {
      // If showing the result, clear the display
      if (state.isResult) {
        return initialState;
      }
      
      // If the current value is empty, nothing to delete
      if (!state.currentValue || state.currentValue.length === 0) {
        return state;
      }
      
      const newValue = state.currentValue.slice(0, -1);
      
      return {
        ...state,
        display: newValue || '0',
        currentValue: newValue,
      };
    }
    
    default:
      return state;
  }
};

export const CalculatorContext = createContext<CalculatorContextProps | undefined>(undefined);

export const CalculatorProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    const action = getActionFromKey(event.key);
    if (action) {
      dispatch(action);
    }
  }, []);
  
  return (
    <CalculatorContext.Provider value={{ state, dispatch, handleKeyDown }}>
      {children}
    </CalculatorContext.Provider>
  );
};
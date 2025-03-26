export enum OperationType {
  ADD = '+',
  SUBTRACT = '-',
  MULTIPLY = '×',
  DIVIDE = '÷',
  NONE = '',
}

export interface CalculatorState {
  display: string;
  currentValue: string;
  previousValue: string;
  operation: OperationType;
  isResult: boolean;
}

export interface CalculatorAction {
  type: 'DIGIT' | 'OPERATION' | 'CLEAR' | 'DELETE' | 'CALCULATE' | 'DECIMAL';
  payload?: {
    digit?: string;
    operation?: OperationType;
  };
}

export interface CalculatorContextProps {
  state: CalculatorState;
  dispatch: React.Dispatch<CalculatorAction>;
  handleKeyDown: (event: KeyboardEvent) => void;
}

export interface ButtonProps {
  value: string;
  onClick: () => void;
  type?: 'digit' | 'operation' | 'equals' | 'clear' | 'delete';
  span?: 'normal' | 'double';
  'aria-label'?: string;
}
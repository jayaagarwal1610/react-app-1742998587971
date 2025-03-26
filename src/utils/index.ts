import { OperationType } from '../types';

// Format display for better UX
export const formatNumber = (num: string): string => {
  if (num === '') return '0';
  
  // Handle decimal portion
  if (num.includes('.')) {
    const [intPart, decPart] = num.split('.');
    const formattedInt = formatInteger(intPart);
    return `${formattedInt}.${decPart}`;
  }
  
  return formatInteger(num);
};

// Format the integer part with commas for thousands
const formatInteger = (numStr: string): string => {
  // Remove leading zeros
  const cleanedStr = numStr.replace(/^0+(?=\d)/, '');
  
  // If empty or just a minus sign, return as is
  if (cleanedStr === '' || cleanedStr === '-') return cleanedStr || '0';
  
  const isNegative = cleanedStr.startsWith('-');
  const absNumStr = isNegative ? cleanedStr.slice(1) : cleanedStr;
  
  // Add commas
  const withCommas = absNumStr.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return isNegative ? `-${withCommas}` : withCommas;
};

// Perform calculation based on operation
export const calculate = (
  previousValue: string,
  currentValue: string,
  operation: OperationType
): string => {
  const prev = parseFloat(previousValue || '0');
  const curr = parseFloat(currentValue || '0');
  
  if (isNaN(prev) || isNaN(curr)) return '0';
  
  let result: number;
  
  switch (operation) {
    case OperationType.ADD:
      result = prev + curr;
      break;
    case OperationType.SUBTRACT:
      result = prev - curr;
      break;
    case OperationType.MULTIPLY:
      result = prev * curr;
      break;
    case OperationType.DIVIDE:
      if (curr === 0) return 'Error: Division by zero';
      result = prev / curr;
      break;
    default:
      return currentValue;
  }
  
  // Handle floating point precision issues
  return Number.isInteger(result) 
    ? result.toString() 
    : result.toFixed(10).replace(/\.?0+$/, '');
};

// Map key press to calculator actions
export const getActionFromKey = (key: string): { 
  type: 'DIGIT' | 'OPERATION' | 'CLEAR' | 'DELETE' | 'CALCULATE' | 'DECIMAL'; 
  payload?: { digit?: string; operation?: OperationType } 
} | null => {
  if (/[0-9]/.test(key)) {
    return { type: 'DIGIT', payload: { digit: key } };
  }
  
  switch (key) {
    case '.':
      return { type: 'DECIMAL' };
    case '+':
      return { type: 'OPERATION', payload: { operation: OperationType.ADD } };
    case '-':
      return { type: 'OPERATION', payload: { operation: OperationType.SUBTRACT } };
    case '*':
    case 'x':
    case 'X':
      return { type: 'OPERATION', payload: { operation: OperationType.MULTIPLY } };
    case '/':
      return { type: 'OPERATION', payload: { operation: OperationType.DIVIDE } };
    case 'Enter':
    case '=':
      return { type: 'CALCULATE' };
    case 'Escape':
    case 'c':
    case 'C':
      return { type: 'CLEAR' };
    case 'Backspace':
      return { type: 'DELETE' };
    default:
      return null;
  }
};
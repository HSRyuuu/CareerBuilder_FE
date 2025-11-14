/**
 * 컴포넌트 Props 타입 정의
 */

import { ButtonVariant, CommonSize, InputVariant } from '@/constants/enums/style-enum';

// Button 컴포넌트 Props
export interface ButtonProps {
  variant?: ButtonVariant;
  size?: CommonSize;
  disabled?: boolean;
  icon?: string;
  iconOnly?: boolean;
  iconPosition?: 'left' | 'right';
  iconSize?: string;
  type?: 'button' | 'submit' | 'reset';
  block?: boolean;
}

// Input 컴포넌트 Props
export interface InputProps {
  modelValue: string | number;
  label?: string;
  placeholder?: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'month' | 'date';
  size?: CommonSize;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
}

// TextArea 컴포넌트 Props
export interface TextAreaProps {
  modelValue: string;
  label?: string;
  placeholder?: string;
  size?: CommonSize;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
  error?: boolean;
  rows?: number;
}


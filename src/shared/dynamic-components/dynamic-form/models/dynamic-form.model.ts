// export interface DynamicFormConfig {}

export interface BaseControl {
  type: ControlType;
  key: string;
  label: string;
  icon?: string;
  hint?: string;
  disabled?: boolean;
  required?: boolean;
  options?: Option[];
  inputPattern?: string;
  inputType: InputType;
}

export type ControlType =
  | 'Input'
  | 'Select'
  | 'CheckBox'
  | 'Switch'
  | 'Slider'
  | 'Radio'
  | 'Divider';

export type InputType = 'text' | 'number' | 'currency' | 'textarea';

export interface SelectControl {}

export interface Option {
  value: any;
  description: string | number;
}

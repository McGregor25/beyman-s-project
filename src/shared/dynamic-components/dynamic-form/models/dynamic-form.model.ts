export interface BaseControl {
  type: ControlType;
  key: string;
  label: string;
  defaultValue?: any;
  icon?: string;
  hint?: string;
  loading?: boolean;
  hidden?: boolean;
  tooltip?: string;
  classes?: string;
  appearance?: 'fill' | 'outline';
  col?: columnConfig;
  _formField_iconLeft?: 'string';
  _formField_iconRight?: 'string';
  _input_minDate?: Date;
  _input_maxDate?: Date;
  _input_type?: InputType;
  _input_placeholder?: string;
  _file_progressValue?: number;
  _selection_options?: Option[];
  _autocomplete_internalFilter?: boolean;
  _validator_inputPattern?: string;
  _validator_disabled?: boolean;
  _validator_required?: boolean;
  _validator_email?: boolean;
  _validator_nullValidator?: boolean;
  _validator_minLength?: number;
  _validator_maxLength?: number;
  _validator_min?: number;
  _validator_max?: number;
}

export interface columnConfig {
  xxl?: number;
  xl?: number;
  lg?: number;
  md?: number;
  sm?: number;
  xs?: number;
}

export type ControlType =
  | 'Input'
  | 'File'
  | 'Select'
  | 'CheckBox'
  | 'Switch'
  | 'Slider'
  | 'Radio'
  | 'Divider';

export type InputType = 'text' | 'number' | 'currency' | 'textarea' | 'date';

export interface Option {
  value: any;
  description: string | number;
}

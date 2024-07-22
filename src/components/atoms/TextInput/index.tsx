import { ReactNode, forwardRef } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { FormControl, FormGroup, FormControlProps } from 'react-bootstrap';

import { HookErrorMessage } from '..';
import style from './style.module.scss';
import { HookInputBaseProps } from '../HookFormProvider';

export interface InputBaseProps extends FormControlProps {
  label?: string;
  labelClassName?: string;
  min?: number | string;
  rows?: number;
  max?: number;
  step?: string;
}

export interface TextInputProps extends InputBaseProps {
  error?: string;
  inputClassName?: string;
  endIcon?: ReactNode;
  viewPassword?: boolean;
  errorNode?: ReactNode;
  handleEndIconClick?: () => void;
  value?: string | number;
  handleOnChange?: (arg: string) => void;
  endIconClassName?: string;
}

export interface HookInputProps extends Omit<TextInputProps, 'onChange'>, HookInputBaseProps {
  name: string;
}

const BaseInput = forwardRef<HTMLInputElement, InputBaseProps>(
  (
    { placeholder, onChange, name, className, maxLength, autoComplete, label, labelClassName, required, ...rest },
    ref,
  ) => (
    <>
      {label && (
        <label
          className={['mb-1', labelClassName, required ? 'required' : '', style.inputLabel].join(' ')}
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <FormControl
        id={name}
        ref={ref}
        placeholder={placeholder}
        onChange={onChange}
        name={name}
        className={`${style['text-input-control']} ${className} position-relative`}
        maxLength={maxLength}
        autoComplete={autoComplete || 'off'}
        {...rest}
      />
    </>
  ),
);

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      className,
      inputClassName,
      type,
      endIcon,
      errorNode,
      labelClassName,
      handleOnChange,
      handleEndIconClick,
      value,
      onChange,
      endIconClassName,
      ...rest
    },
    ref,
  ) => {
    const error = !!inputClassName?.includes('is-invalid');

    return (
      <FormGroup className={`${className} position-relative`}>
        <BaseInput
          ref={ref}
          labelClassName={[style.inputBaseLabel, labelClassName].join(' ')}
          className={[
            inputClassName || '',
            style.inputBase,
            error ? 'border border-danger' : '',
            endIcon && style.hasEndIcon,
          ].join(' ')}
          type={type || 'text'}
          value={value}
          onChange={(event) => {
            handleOnChange?.(event.target.value);
            onChange?.(event);
          }}
          {...rest}
        />
        {endIcon && (
          <div
            className={[style.endIcon, rest.label && style.labeledEndIcon, endIconClassName].join(' ')}
            onClick={handleEndIconClick}
          >
            {endIcon}
          </div>
        )}
        {error && errorNode}
      </FormGroup>
    );
  },
);

const HookTextInput = forwardRef<HTMLInputElement, HookInputProps>(
  ({ name, required, inputClassName, validate, disabled, defaultValue, ...rest }, ref) => {
    const { control } = useFormContext();

    return (
      <Controller
        name={name}
        rules={{ validate, required: required && 'Required' }}
        control={control}
        defaultValue={defaultValue}
        render={({ field: { value, onChange, ...field }, fieldState: { error } }) => (
          <TextInput
            {...rest}
            {...field}
            ref={ref}
            value={value}
            onChange={({ target: { value } }) => {
              onChange(value);
            }}
            defaultValue={defaultValue}
            disabled={disabled}
            required={required}
            inputClassName={[error ? 'is-invalid' : '', inputClassName].join(' ')}
            errorNode={error && <HookErrorMessage message={error.message} />}
          />
        )}
      />
    );
  },
);

export { TextInput, HookTextInput };

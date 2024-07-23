import { FC, ReactNode } from 'react';
import { FormCheckProps, Form, FormGroup } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

import { HookErrorMessage } from '..';
import { HookInputBaseProps } from '../HookFormProvider';
import style from './style.module.scss';

interface CheckBoxProps extends FormCheckProps {
  label?: string;
  className?: string;
  errorNode?: ReactNode;
  isRadio?: boolean;
}

interface HookCheckBoxProps extends CheckBoxProps, HookInputBaseProps {
  name: string;
}

const CheckBox: FC<CheckBoxProps> = ({
  onChange,
  name,
  label,
  className,
  errorNode,
  isRadio,
  type = 'checkbox',
  ...rest
}) => (
  <FormGroup
    className={[style.checkbox, className, 'position-relative', isRadio && style['checkbox--radio']].join(' ')}
  >
    <Form.Check name={name} label={label} type={type} onChange={onChange} {...rest} />
    {errorNode}
  </FormGroup>
);

const HookCheckBox: FC<HookCheckBoxProps> = ({ name, required, validate, defaultChecked, disabled, ...rest }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      rules={{ required: required && 'Required', validate }}
      control={control}
      defaultValue={defaultChecked}
      render={({ field: { onChange, ...field }, fieldState: { error } }) => (
        <CheckBox
          {...rest}
          {...field}
          onChange={(e) => {
            onChange(e.target.checked);
            rest?.onChange?.(e);
          }}
          defaultChecked={defaultChecked}
          disabled={disabled}
          required={required}
          errorNode={error && <HookErrorMessage message={error.message} />}
        />
      )}
    />
  );
};

export { CheckBox, HookCheckBox };

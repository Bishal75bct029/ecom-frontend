import { FC, DetailedHTMLProps, FormHTMLAttributes } from 'react';
import { useFormContext } from 'react-hook-form';
import { HookInputBaseProps } from '../HookFormProvider';

export interface HookFormProps
  extends Omit<DetailedHTMLProps<FormHTMLAttributes<HTMLFormElement>, HTMLFormElement>, 'onSubmit'>,
    HookInputBaseProps {
  onSubmit?: (value: any) => Promise<void> | void;
}

const HookForm: FC<HookFormProps> = ({ children, onSubmit, ...rest }) => {
  const { handleSubmit } = useFormContext();

  return (
    <form onSubmit={onSubmit && handleSubmit(onSubmit)} {...rest}>
      {children}
    </form>
  );
};

export default HookForm;

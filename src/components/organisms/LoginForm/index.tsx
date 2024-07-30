import React, { FC, useMemo, useState } from 'react';
import { Stack } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import { Button, HookForm, HookFormProvider, HookTextInput, Typography } from '@/components/atoms';
import { validateEmail } from '@/utils';
import { EyeOpenIcon, EyeCloseIcon } from '@/assets/icons';
import { LoginPayload } from '@/store/features/auth/types';

interface LoginFormProps {
  onSubmit: (payload: LoginPayload) => void;
  title?: React.ReactNode;
  wrapperClass?: string;
  isLoading?: boolean;
}

const LoginFormView: FC<LoginFormProps> = ({ title, wrapperClass, onSubmit, isLoading }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const { watch, handleSubmit } = useFormContext<LoginPayload>();
  const [email, password] = watch(['email', 'password']);

  const isButtonDisabled = useMemo(() => !email || !password, [email, password]);

  return (
    <div className={wrapperClass}>
      <Typography fontsStyle="large-semi-bold" className="mb-3" color="primary-purple">
        {title || 'Welcome to Ecom! Please Login.'}
      </Typography>
      <HookForm onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          <HookTextInput
            name="email"
            label="Email"
            placeholder="Enter the email"
            className="mb-3"
            validate={validateEmail}
            required
            autoFocus
          />
          <HookTextInput
            type={showPassword ? 'text' : 'password'}
            name="password"
            label="Password"
            placeholder="Enter the password"
            endIcon={showPassword ? <EyeOpenIcon /> : <EyeCloseIcon />}
            handleEndIconClick={() => setShowPassword(!showPassword)}
            className="mb-4"
            autoComplete="new-password"
            required
          />
          <Button variant="primary" type="submit" className="px-5" disabled={isButtonDisabled} loading={isLoading}>
            Log In
          </Button>
        </Stack>
      </HookForm>
    </div>
  );
};

const LoginForm: FC<LoginFormProps> = (props) => (
  <HookFormProvider>
    <LoginFormView {...props} />
  </HookFormProvider>
);

export default LoginForm;

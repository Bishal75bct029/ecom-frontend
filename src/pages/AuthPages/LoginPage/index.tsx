import { LoginForm } from '@/components/organisms';
import { usePostLoginMutation } from '@/store/features/auth';
import { LoginPayload } from '@/store/features/auth/types';
import style from './style.module.scss';

const LoginPage = () => {
  const [postLogin] = usePostLoginMutation();

  const handleLogin = (payload: LoginPayload) => {
    postLogin(payload);
  };

  return <LoginForm onSubmit={handleLogin} wrapperClass={style.loginWrapper} />;
};

export default LoginPage;

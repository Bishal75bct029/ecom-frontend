import { LoginForm } from '@/components/organisms';
import { usePostLoginMutation } from '@/store/features/auth';
import { LoginPayload } from '@/store/features/auth/types';
import style from './style.module.scss';
import { useAuth } from '@/hooks';

const LoginPage = () => {
  const [postLogin] = usePostLoginMutation();

  const { loginHandler } = useAuth();

  const handleLogin = (payload: LoginPayload) => {
    postLogin(payload).unwrap().then(loginHandler);
  };

  return <LoginForm onSubmit={handleLogin} wrapperClass={style.loginWrapper} />;
};

export default LoginPage;

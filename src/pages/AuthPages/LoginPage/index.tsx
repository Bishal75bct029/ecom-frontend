import { useNavigate } from 'react-router-dom';
import { LoginForm } from '@/components/organisms';
import { usePostLoginMutation } from '@/store/features/auth';
import { LoginPayload } from '@/store/features/auth/types';
import style from './style.module.scss';
import { useAuth } from '@/hooks';
import { toastSuccess } from '@/utils';
import { Breadcrumb } from '@/components/atoms';

const LoginPage = () => {
  const navigate = useNavigate();
  const { loginHandler } = useAuth();

  const [postLogin, { isLoading }] = usePostLoginMutation();

  const handleLogin = (payload: LoginPayload) => {
    postLogin(payload)
      .unwrap()
      .then((res) => {
        toastSuccess('User Logged in successfully');
        loginHandler(res);
        navigate('/');
      });
  };

  return (
    <>
      <div style={{ marginLeft: '470px' }}>
        <Breadcrumb active="Login" items={[{ label: 'Home', link: '/' }]} />
      </div>
      <div className={style.loginContainer}>
        <LoginForm onSubmit={handleLogin} wrapperClass={style.loginWrapper} isLoading={isLoading} />
      </div>
    </>
  );
};

export default LoginPage;

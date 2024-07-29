import { LoginResponse } from '@/store/features/auth/types';
import { useAppDispatch } from '@/store/hooks';
import { clearLocalStorage, setStorageItem } from '@/utils';
import baseApi from '@/store/baseApi';
import { setUserState } from '@/store/features/user';

const useAuth = () => {
  const dispatch = useAppDispatch();

  const loginHandler = (response: LoginResponse) => {
    setStorageItem('token', response.token);
    setStorageItem('refreshToken', response.refreshToken);
    dispatch(setUserState({ token: response.token }));
  };

  const logoutHandler = () => {
    clearLocalStorage();
    dispatch(baseApi.util.resetApiState());
    window.location.href = '/';
  };

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;

import { usePostLogoutMutation } from '@/store/features/auth';
import { setUserState, useLazyGetUserDetailQuery } from '@/store/features/user';
import { useAppDispatch } from '@/store/hooks';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [postLogout] = usePostLogoutMutation();
  const [getUserDetail] = useLazyGetUserDetailQuery();

  const loginHandler = () => {
    getUserDetail()
      .unwrap()
      .then((payload) => {
        dispatch(setUserState({ user: payload }));
      })
      .catch(() => {
        dispatch(setUserState({ user: undefined }));
      });
  };

  const logoutHandler = () => {
    postLogout();
    dispatch(setUserState({ user: undefined }));
  };

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;

import { useLazyGetUserDetailQuery, usePostLogoutMutation } from '@/store/features/auth';
import { setGlobalState } from '@/store/features/global';
import { useAppDispatch } from '@/store/hooks';

const useAuth = () => {
  const dispatch = useAppDispatch();
  const [postLogout] = usePostLogoutMutation();
  const [getUserDetail] = useLazyGetUserDetailQuery();

  const loginHandler = () => {
    getUserDetail()
      .unwrap()
      .then((payload) => {
        dispatch(setGlobalState({ user: payload }));
      })
      .catch(() => {
        dispatch(setGlobalState({ user: undefined }));
      });
  };

  const logoutHandler = () => {
    postLogout();
    dispatch(setGlobalState({ user: undefined }));
  };

  return {
    loginHandler,
    logoutHandler,
  };
};

export default useAuth;

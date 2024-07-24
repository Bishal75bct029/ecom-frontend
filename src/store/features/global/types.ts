import { UserDetailType } from '../auth/types';

export type GlobalState = {
  user: UserDetailType | undefined;
};

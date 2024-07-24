export interface UserDetailType {
  id: string;
  name: string;
  email: string;
  image: string;
  addresses: {
    name: string;
    type: string;
    contact: string;
  }[];
}

export type GlobalState = {
  user: UserDetailType | undefined;
  modalInView: string | false;
};

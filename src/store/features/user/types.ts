export interface UserDetailType {
  id: string;
  email: string;
  name: string;
  image: string;
  addresses: UserAddress[];
  cart: { productMetaId: string[] };
}

export interface UserAddress {
  id: string;
  name: string;
  contact: string;
  type: UserAddressGroup;
}

export type UserAddressGroup = 'BILLING' | 'SHIPPING';

export type UserState = {
  user: UserDetailType | undefined;
  token: string | null;
};

export type LoginPayload = {
  email: string;
  password: string;
};

export interface UserDetailType {
  id: string;
  email: string;
  name: string;
  image: string;
  addresses: Address[];
  cart: { productMetaId: string[] };
}

interface Address {
  name: string;
  contact: string;
  type: string;
}

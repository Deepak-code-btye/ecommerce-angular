export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface login {
  email: string;
  password: string;
}

export interface product {
  productname: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
  productId: undefined | number;
}
export interface cart {
  productname: string;
  price: number;
  category: string;
  color: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  userId: number;
  productId: number;
}

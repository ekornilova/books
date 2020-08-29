import { SimpleType } from '../../additional';

export interface ShopI {
  id: SimpleType;
  name: string;
  address?: string;
}

export interface QuantityShopInfoI {
  id?: SimpleType;
  shopId: SimpleType;
  bookId: SimpleType;
  rests: number;
}

export interface AuthorI {
  id: SimpleType;
  firstName: string;
  lastName: string;
}

export interface AddressI {
  country: string;
  city: string;
  street: string;
  house: string;
  zipCode: string;
}
export interface GenreI {
  id: SimpleType;
  name: string;
}

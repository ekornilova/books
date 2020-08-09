export interface ShopI {
  id: string | number;
  name: string;
  address?: string;
}

export interface QuantityShopInfoI {
  id?: string | number;
  shopId: string | number;
  bookId: string | number;
  rests: number;
}

export interface AuthorI {
  id: string | number;
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
  id: string | number;
  name: string;
}

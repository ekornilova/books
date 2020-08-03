export interface ShopI {
  id: string;
  name: string;
  address: string;
}

export interface QuantityShopInfoI {
  shopId: string;
  bookId: string;
  rests: number;
}

export interface AuthorI {
  id: string;
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

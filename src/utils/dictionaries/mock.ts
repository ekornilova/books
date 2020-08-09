import { AuthorI, GenreI, ShopI, QuantityShopInfoI } from './interface';
import { BookI } from '../book';

export const authorsMock: AuthorI[] = [
  {
    id: 1,
    firstName: 'Lev',
    lastName: 'Tolstoy',
  },
  {
    id: 2,
    firstName: 'Nikolai',
    lastName: 'Gogol',
  },
  {
    id: 3,
    firstName: 'Ivan',
    lastName: 'Turgenev',
  },
  {
    id: 4,
    firstName: 'Aleksandr',
    lastName: 'Pushkin',
  },
  {
    id: 5,
    firstName: 'Michail',
    lastName: 'Lermontov',
  },
];
export const genresMock: GenreI[] = [
  {
    id: 1,
    name: 'Fantasy',
  },
  {
    id: 2,
    name: 'Adventure',
  },
  {
    id: 3,
    name: 'Romance',
  },
  {
    id: 4,
    name: 'Contemporary',
  },
  {
    id: 5,
    name: 'Dystopian',
  },
  {
    id: 6,
    name: 'Mystery',
  },
  {
    id: 7,
    name: 'Horror',
  },
  {
    id: 8,
    name: 'Thriller',
  },
  {
    id: 9,
    name: 'Paranormal',
  },
  {
    id: 10,
    name: 'Historical fiction',
  },
  {
    id: 11,
    name: 'Science Fiction',
  },
  {
    id: 12,
    name: 'Memoir',
  },
  {
    id: 13,
    name: 'Cooking',
  },
  {
    id: 14,
    name: 'Art',
  },
  {
    id: 15,
    name: 'Self-help / Personal',
  },
  {
    id: 16,
    name: 'Development',
  },
  {
    id: 17,
    name: 'Motivational',
  },
  {
    id: 18,
    name: 'Health',
  },
  {
    id: 19,
    name: 'History',
  },
  {
    id: 20,
    name: 'Travel',
  },
  {
    id: 21,
    name: 'Guide / How-to',
  },
  {
    id: 22,
    name: 'Families & Relationships',
  },
  {
    id: 23,
    name: 'Humor',
  },
  {
    id: 24,
    name: 'Children’s',
  },
  {
    id: 25,
    name: 'Drama',
  },
  {
    id: 26,
    name: 'Poem',
  },
];
const getQuantityShopInfo = (bookId: number | string): QuantityShopInfoI[] => [
  {
    bookId,
    shopId: 1,
    rests: 4,
  },
  {
    bookId,
    shopId: 2,
    rests: 43,
  },
  {
    bookId,
    shopId: 3,
    rests: 54,
  },
  {
    bookId,
    shopId: 4,
    rests: 24,
  },
  {
    bookId,
    shopId: 5,
    rests: 41,
  },
];
export const booksMock: BookI[] = [
  {
    id: 1,
    genres: [3],
    author: 4,
    name: 'Ruslan i Ludmila',
    quantityShopInfo: getQuantityShopInfo(1),
    isbn: '123456',
    coverImage:
      'https://i3.mybook.io/p/512x852/book_covers/fb/b0/fbb08231-7d97-4f74-ab70-49f67738a748.jpg?v2',
  },
  {
    id: 2,
    genres: [3],
    author: 4,
    name: 'Kavkazskiy plennik',
    quantityShopInfo: getQuantityShopInfo(2),
    isbn: '1234566',
  },
  {
    id: 3,
    genres: [3],
    author: 4,
    name: 'Gavriiliada',
    quantityShopInfo: getQuantityShopInfo(3),
    isbn: '1234567',
  },
  {
    id: 4,
    genres: [3],
    author: 4,
    name: 'Bakhchisarayskiy fontan',
    quantityShopInfo: [],
    isbn: '12345678',
  },
  {
    id: 5,
    genres: [6, 7, 8],
    author: 2,
    name: 'Evenings on a Farm Near Dikanka',
    quantityShopInfo: [],
    isbn: '1234569',
  },
  {
    id: 6,
    genres: [6, 7, 8],
    author: 2,
    name: 'Viy',
    quantityShopInfo: [],
    isbn: '123456000',
  },
  {
    id: 7,
    genres: [23],
    author: 2,
    name: 'The Nose',
    quantityShopInfo: [],
    isbn: '123456733',
  },
  {
    id: 11,
    genres: [19, 25],
    author: 1,
    name: 'War and Peace',
    quantityShopInfo: [],
    isbn: '12345672',
  },
  {
    id: 8,
    genres: [25],
    author: 1,
    name: 'Childhood',
    quantityShopInfo: [],
    isbn: '1234567222',
  },
  {
    id: 9,
    genres: [25],
    author: 1,
    name: 'Boyhood',
    quantityShopInfo: [],
    isbn: '12345675',
  },
  {
    id: 10,
    genres: [25],
    author: 1,
    name: 'Youth',
    quantityShopInfo: [],
    isbn: '123456755',
  },
  {
    id: 12,
    genres: [25],
    author: 3,
    name: 'Rudin',
    quantityShopInfo: [],
    isbn: '1234567555',
  },
  {
    id: 13,
    genres: [25],
    author: 3,
    name: 'Dvoryanskoye gnezdo',
    quantityShopInfo: [],
    isbn: '12345676565',
  },
  {
    id: 14,
    genres: [25],
    author: 3,
    name: 'Ottsy i deti',
    quantityShopInfo: [],
    isbn: '123456712',
  },
  {
    id: 15,
    genres: [25],
    author: 3,
    name: 'Asya',
    quantityShopInfo: [],
    isbn: '12345671212',
  },
  {
    id: 16,
    genres: [26],
    author: 5,
    name: 'Death of the Poet',
    quantityShopInfo: [],
    isbn: '1234567121212',
  },
  {
    id: 17,
    genres: [26],
    author: 5,
    name: 'Borodino',
    quantityShopInfo: [],
    isbn: '12345673232',
  },
  {
    id: 18,
    genres: [25],
    author: 5,
    name: 'A Hero of Our Time',
    quantityShopInfo: [],
    isbn: '123456732',
  },
];
export const shopsMock: ShopI[] = [
  {
    id: 1,
    name: 'SHOP 1',
  },
  {
    id: 2,
    name: 'SHOP 2',
  },
  {
    id: 3,
    name: 'SHOP 3',
  },
  {
    id: 4,
    name: 'SHOP 4',
  },
  {
    id: 5,
    name: 'SHOP 5',
  },
];

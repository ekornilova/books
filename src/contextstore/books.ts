import * as constants from './constants';
import { BookI } from '../utils/book';

export type ActionSetBooks = {
  type: constants.SETBOOKS;
  data: BookI[];
};

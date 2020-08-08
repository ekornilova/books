import React, { FC, useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { StoreI, DictionaryI } from '../../store/types';
import { headerSettings, getFieldSettings, sortSettings } from './tableSettings';
import TableDictionary from '../../Components/TableDictionary';
import { getBooks, BookI } from '../../utils/book';
import { booksMock } from '../../utils/dictionaries/mock';
import { SETBOOKS } from '../../store/constants';
import { useNotifications } from '../../Components/NotificationPopup/ProviderNotification';

const BooksPage: FC<{ dictionaries: DictionaryI | null }> = ({ dictionaries, books }) => {
  const [filterBooks, setFilterBooks] = useState<BookI[]>(books);
  const { handleAxiosError } = useNotifications();
  const getBooksFromServer = (items?: BookI[]) => {
    getBooks(items || booksMock)
      .then((newBooks) => {
        setFilterBooks(newBooks);
      })
      .catch(handleAxiosError);
  };
  useEffect(() => {
    getBooksFromServer();
  }, []);
  return useMemo(() => {
    return (
      <TableDictionary
        sortList={sortSettings}
        headList={headerSettings}
        bodyList={filterBooks}
        fieldSettings={getFieldSettings(dictionaries)}
      />
    );
  }, [dictionaries, filterBooks]);
};
const mapStateToProps = (state: StoreI) => {
  return {
    dictionaries: state.dictionaries,
    books: state.books,
  };
};
const mapDispatchToProps = (dispatch: any) => {
  return {
    setBooks: (data: BookI[]) =>
      dispatch({
        type: SETBOOKS,
        data,
      }),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(BooksPage);

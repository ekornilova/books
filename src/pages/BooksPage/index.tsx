import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { StoreI, DictionaryI } from '../../store/types';
import { headerSettings, getFieldSettings, sortSettings } from './tableSettings';
import TableDictionary from '../../Components/TableDictionary';
import { getBooks, BookI } from '../../utils/book';
import { booksMock } from '../../utils/dictionaries/mock';
import { SETBOOKS } from '../../store/constants';
import { useNotifications } from '../../Components/NotificationPopup/ProviderNotification';

const StyledCustomTableWrapper = styled.div`
  height: 450px;
  position: relative;
  > * {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
`;
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
  return (
    <StyledCustomTableWrapper>
      <TableDictionary
        sortList={sortSettings}
        headList={headerSettings}
        bodyList={filterBooks}
        fieldSettings={getFieldSettings(dictionaries)}
        deleteConfirmText="Do you really want to remove this book?"
      />
    </StyledCustomTableWrapper>
  );
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

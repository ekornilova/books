import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import { StoreI, DictionaryI } from '../../store/types';
import {
  headerSettings,
  getFieldSettings,
  sortSettings,
  headerSettingsInnerTable,
  sortSettingsInnerTable,
  getFieldSettingsInnerTable,
  DictionaryOptionI,
} from './tableSettings';
import TableDictionary from '../../Components/TableDictionary';
import { TextComponent } from '../../Components/BasicElements';
import { getBooks, BookI, deleteBook } from '../../utils/book';
import { booksMock } from '../../utils/dictionaries/mock';
import { SETBOOKS } from '../../store/constants';
import { useNotifications } from '../../Components/NotificationPopup/ProviderNotification';
import { getBooksWithCommonCount, getDictionaryOptions, getFilteredBooks } from './helpers';
import FilterForm, {
  defaultFilterSettings,
  getFilterFieldSettings,
  FilterSettingsI,
} from './FilterForm';

const StyledCustomTableWrapper = styled.div<{ isInner?: boolean; height?: number }>`
  height: ${({ height }) => height || '50'}px;
  position: relative;
  > * {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
  }
  ${({ isInner }) =>
    isInner
      ? `
  .MuiTableCell-stickyHeader {
    z-index: 1;
  }
  `
      : `
margin-top: 40px;
`}
`;
const getCollapseElementForTable = (dictionaries: DictionaryOptionI | null) => (item: BookI) => {
  const list = item.quantityShopInfo.map((info) => {
    return {
      ...info,
      id: info.shopId,
    };
  });

  return (
    <Box margin={1}>
      <TextComponent text="Shop Data" gutterBottom />
      <StyledCustomTableWrapper isInner height={list.length ? 150 : 50}>
        <TableDictionary
          bodyList={list}
          headList={headerSettingsInnerTable}
          sortList={sortSettingsInnerTable}
          fieldSettings={getFieldSettingsInnerTable(dictionaries)}
        />
      </StyledCustomTableWrapper>
    </Box>
  );
};

const BooksPage: FC<{
  dictionaries: DictionaryI | null;
  books: BookI[];
  setBooks: (val: BookI[]) => void;
}> = ({ dictionaries, books, setBooks }) => {
  const [filterBooks, setFilterBooks] = useState<BookI[]>(books);
  const [filterValues, setFilterValues] = useState<FilterSettingsI>(defaultFilterSettings);
  const { handleAxiosError } = useNotifications();
  const getBooksFromServer = (items?: BookI[]) => {
    getBooks(items || booksMock)
      .then((newBooks: BookI[]) => {
        setBooks(getBooksWithCommonCount(newBooks));
        // const bookValues: BookI[] = getFilteredBooks(getBooksWithCommonCount(newBooks), filterValues);
        // setFilterBooks(bookValues);
      })
      .catch(handleAxiosError);
  };
  useEffect(() => {
    const bookValues: BookI[] = getFilteredBooks(books, filterValues);
    setFilterBooks(bookValues);
  }, [filterValues, books]);
  useEffect(() => {
    getBooksFromServer();
  }, []);
  const dictionaryOptions = getDictionaryOptions(dictionaries);
  const onDeleteBook = (bookForDelete: BookI) => {
    const findIdx = books.findIndex((book) => book.id === bookForDelete.id);
    deleteBook((bookForDelete.id as string) || '', bookForDelete)
      .then(() => {
        const newBooks = [...books];
        newBooks.splice(findIdx, 1);
        getBooksFromServer(newBooks);
      })
      .catch(handleAxiosError);
  };
  return (
    <>
      <FilterForm
        value={filterValues}
        setValue={setFilterValues}
        fieldSettings={getFilterFieldSettings(dictionaryOptions)}
      />
      <StyledCustomTableWrapper height={filterBooks.length ? 400 : 70}>
        <TableDictionary
          sortList={sortSettings}
          headList={headerSettings}
          bodyList={filterBooks}
          fieldSettings={getFieldSettings(dictionaryOptions)}
          deleteConfirmText="Do you really want to remove this book?"
          isCollapsed
          getCollapseElement={getCollapseElementForTable(dictionaryOptions)}
          onDeleteRow={onDeleteBook}
          onEditRow={() => {}}
        />
      </StyledCustomTableWrapper>
    </>
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

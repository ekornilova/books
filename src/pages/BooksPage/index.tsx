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
import { getBooks, BookI, deleteBook, updateBook } from '../../utils/book';
import { QuantityShopInfoI } from '../../utils/dictionaries/interface';
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
const getCollapseElementForTable = (dictionaries: DictionaryOptionI | null) => (
  item: BookI,
  isEdit?: boolean,
  edited?: BookI,
  onChange?: any,
) => {
  const list = ((isEdit ? edited : item) || item).quantityShopInfo.map((info, idx) => {
    return {
      ...info,
      id: idx, // info.shopId,
    };
  });
  const onActionRow = (action: 'delete' | 'edit') => (row: QuantityShopInfoI) => {
    onChange((oldBook: BookI) => {
      const isDelete = action === 'delete';
      const findIdx = row.id;
      const newQuantityShopInfo = [...(oldBook.quantityShopInfo || [])];
      if (isDelete) {
        newQuantityShopInfo.splice(findIdx, 1);
      } else {
        // delete row.id;
        newQuantityShopInfo.splice(findIdx, 1, row);
      }
      return {
        ...oldBook,
        quantityShopInfo: newQuantityShopInfo,
      };
    });
  };
  const additionalProps = isEdit
    ? {
        onEditRow: onActionRow('edit'),
        onDeleteRow: onActionRow('delete'),
      }
    : {};
  return (
    <Box margin={1}>
      <TextComponent text="Shop Data" gutterBottom />
      <StyledCustomTableWrapper isInner height={list.length ? 150 : 50}>
        <TableDictionary
          bodyList={list}
          headList={headerSettingsInnerTable}
          sortList={sortSettingsInnerTable}
          fieldSettings={getFieldSettingsInnerTable(dictionaries)}
          {...additionalProps}
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
  const onActionBook = (action: 'delete' | 'edit') => (bookForAction: BookI) => {
    const findIdx = books.findIndex((book) => book.id === bookForAction.id);
    const isDelete = action === 'delete';
    const actionRequest = isDelete ? deleteBook : updateBook;
    actionRequest((bookForAction.id as string) || '', bookForAction)
      .then(() => {
        const newBooks = [...books];
        if (isDelete) {
          newBooks.splice(findIdx, 1);
        } else {
          newBooks.splice(findIdx, 1, bookForAction);
        }
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
      <StyledCustomTableWrapper height={filterBooks.length ? 500 : 70}>
        <TableDictionary
          sortList={sortSettings}
          headList={headerSettings}
          bodyList={filterBooks}
          fieldSettings={getFieldSettings(dictionaryOptions)}
          deleteConfirmText="Do you really want to remove this book?"
          isCollapsed
          getCollapseElement={getCollapseElementForTable(dictionaryOptions)}
          onDeleteRow={onActionBook('delete')}
          onEditRow={onActionBook('edit')}
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

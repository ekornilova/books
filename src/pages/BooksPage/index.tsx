import React, { FC, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import shortId from 'shortid';
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
  defaultBook,
  defaultQuantityShopInfo,
} from './tableSettings';
import TableDictionary, { ID_NEW_ITEM } from '../../Components/TableDictionary';
import { TextComponent } from '../../Components/BasicElements';
import { getBooks, BookI, deleteBook, updateBook, createBook } from '../../utils/book';
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

// height: ${({ height }) => height || '50'}px;
// position: relative;
// > * {
//   position: absolute;
//   top: 0;
//   right: 0;
//   left: 0;
//   bottom: 0;
// }
const StyledTableDictionary = styled(TableDictionary)<{ isInner?: boolean; height?: number }>`
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
      id: idx,
    };
  });
  const onActionRow = (action: 'delete' | 'edit' | 'add') => (row: QuantityShopInfoI) => {
    onChange((oldBook: BookI) => {
      const findIdx = row.id;
      const newQuantityShopInfo = [...(oldBook.quantityShopInfo || [])];
      const newRow: QuantityShopInfoI = {
        bookId: oldBook.id as string,
        rests: row.rests,
        shopId: row.shopId,
      };
      switch (action) {
        case 'add':
          newQuantityShopInfo.push(newRow);
          break;
        case 'edit':
          newQuantityShopInfo.splice(findIdx as number, 1, newRow);
          break;
        default:
          newQuantityShopInfo.splice(findIdx as number, 1);
          break;
      }
      return {
        ...oldBook,
        quantityShopInfo: newQuantityShopInfo,
      };
    });
  };
  const additionalProps =
    isEdit && edited && edited.id !== ID_NEW_ITEM
      ? {
          onEditRow: onActionRow('edit'),
          onDeleteRow: onActionRow('delete'),
          onAddRow: onActionRow('add'),
          defaultItem: defaultQuantityShopInfo,
        }
      : {};
  return (
    <Box margin={1}>
      <TextComponent text="Shop Data" gutterBottom />
      {/* <StyledCustomTableWrapper isInner height={list.length ? 150 : 50}> */}
      <StyledTableDictionary
        isInner
        height={150}
        bodyList={list}
        headList={headerSettingsInnerTable}
        sortList={sortSettingsInnerTable}
        fieldSettings={getFieldSettingsInnerTable(dictionaries)}
        {...additionalProps}
      />
      {/* </StyledCustomTableWrapper> */}
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
  const onActionBook = (action: 'delete' | 'edit' | 'add') => (bookForAction: BookI) => {
    const findIdx = books.findIndex((book) => book.id === bookForAction.id);
    const actionRequest = () => {
      switch (action) {
        case 'add':
          return createBook(bookForAction);
        case 'edit':
          return updateBook((bookForAction.id as string) || '', bookForAction);
        default:
          return deleteBook((bookForAction.id as string) || '', bookForAction);
      }
    };
    actionRequest()
      .then(() => {
        const newBooks = [...books];
        switch (action) {
          case 'add': {
            const newBook = {
              ...bookForAction,
              id: shortId.generate(),
            };
            newBooks.push(newBook);
            break;
          }
          case 'edit':
            newBooks.splice(findIdx, 1, bookForAction);
            break;
          default:
            newBooks.splice(findIdx, 1);
            break;
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
      {/* <StyledCustomTableWrapper height={filterBooks.length ? 500 : 70}> */}
      <StyledTableDictionary
        height={500}
        sortList={sortSettings}
        headList={headerSettings}
        bodyList={filterBooks}
        fieldSettings={getFieldSettings(dictionaryOptions)}
        deleteConfirmText="Do you really want to remove this book?"
        isCollapsed
        getCollapseElement={getCollapseElementForTable(dictionaryOptions)}
        onDeleteRow={onActionBook('delete')}
        onEditRow={onActionBook('edit')}
        addButtonText="+ ADD BOOK"
        defaultItem={defaultBook}
        onAddRow={onActionBook('add')}
      />
      {/* </StyledCustomTableWrapper> */}
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

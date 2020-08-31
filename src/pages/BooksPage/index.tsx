import React, { FC, useEffect, useState } from 'react';
// import { connect } from 'react-redux';
import styled from 'styled-components';
import shortId from 'shortid';
import Box from '@material-ui/core/Box';
// import { StoreI, DictionaryI } from '../../store/types';
// import { ActionI } from '../../store/actions';
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
// import { SETBOOKS } from '../../store/constants';
import { useStore } from '../../contextstore';
import { getBooksWithCommonCount, getDictionaryOptions, getFilteredBooks } from './helpers';
import FilterForm, {
  defaultFilterSettings,
  getFilterFieldSettings,
  FilterSettingsI,
} from './FilterForm';

const StyledBox = styled(Box)`
  padding-bottom: 40px;
`;
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
  onChange?: React.Dispatch<React.SetStateAction<BookI>>,
) => {
  const list = ((isEdit ? edited : item) || item).quantityShopInfo.map((info, idx) => {
    return {
      ...info,
      id: idx,
    };
  });
  const onActionRow = (action: 'delete' | 'edit' | 'add') => (row: QuantityShopInfoI) => {
    if (onChange) {
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
    }
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
    <StyledBox margin={1}>
      <TextComponent text="Shop Data" gutterBottom />
      <StyledTableDictionary
        isInner
        height={150}
        bodyList={list}
        headList={headerSettingsInnerTable}
        sortList={sortSettingsInnerTable}
        fieldSettings={getFieldSettingsInnerTable(dictionaries)}
        {...additionalProps}
      />
    </StyledBox>
  );
};

// <{
//   dictionaries: DictionaryI | null;
//   books: BookI[];
//   setBooks: (val: BookI[]) => void;
// }>
const BooksPage: FC = () => {
  const { handleAxiosError, handleAxiosSuccess, books, dictionaries, setBooks } = useStore();
  const [filterBooks, setFilterBooks] = useState<BookI[]>(books);
  const [filterValues, setFilterValues] = useState<FilterSettingsI>(defaultFilterSettings);
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
        let message = `Book "${bookForAction.name}"`;
        switch (action) {
          case 'add': {
            const newBook = {
              ...bookForAction,
              id: shortId.generate(),
            };
            newBooks.push(newBook);
            message = `${message} created!`;
            break;
          }
          case 'edit':
            newBooks.splice(findIdx, 1, bookForAction);
            message = `${message} edited!`;
            break;
          default:
            newBooks.splice(findIdx, 1);
            message = `${message} deleted!`;
            break;
        }
        handleAxiosSuccess(message);
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
    </>
  );
};
// const mapStateToProps = (state: StoreI) => {
//   return {
//     dictionaries: state.dictionaries,
//     books: state.books,
//   };
// };
// const mapDispatchToProps = (dispatch: Dispatch<ActionI>) => {
//   return {
//     setBooks: (data: BookI[]) =>
//       dispatch({
//         type: SETBOOKS,
//         data,
//       }),
//   };
// };
export default BooksPage;
// connect(mapStateToProps, mapDispatchToProps)(BooksPage);

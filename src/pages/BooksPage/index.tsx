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
} from './tableSettings';
import TableDictionary from '../../Components/TableDictionary';
import { TextComponent } from '../../Components/BasicElements';
import { getBooks, BookI } from '../../utils/book';
import { booksMock } from '../../utils/dictionaries/mock';
import { SETBOOKS } from '../../store/constants';
import { useNotifications } from '../../Components/NotificationPopup/ProviderNotification';
import { getBooksWithCommonCount } from './helpers';

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
    isInner &&
    `
  .MuiTableCell-stickyHeader {
    z-index: 1;
  }
  `}
`;
const getCollapseElementForTable = (dictionaries: DictionaryI | null) => (item: BookI) => {
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

const BooksPage: FC<{ dictionaries: DictionaryI | null }> = ({ dictionaries, books }) => {
  const [filterBooks, setFilterBooks] = useState<BookI[]>(books);
  const { handleAxiosError } = useNotifications();
  const getBooksFromServer = (items?: BookI[]) => {
    getBooks(items || booksMock)
      .then((newBooks: BookI[]) => {
        setFilterBooks(getBooksWithCommonCount(newBooks));
      })
      .catch(handleAxiosError);
  };
  useEffect(() => {
    getBooksFromServer();
  }, []);
  return (
    <StyledCustomTableWrapper height={filterBooks.length ? 400 : 70}>
      <TableDictionary
        sortList={sortSettings}
        headList={headerSettings}
        bodyList={filterBooks}
        fieldSettings={getFieldSettings(dictionaries)}
        deleteConfirmText="Do you really want to remove this book?"
        isCollapsed
        getCollapseElement={getCollapseElementForTable(dictionaries)}
        onDeleteRow={() => {}}
        onEditRow={() => {}}
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

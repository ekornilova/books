import React, { FC } from 'react';
import { connect } from 'react-redux';
import { StoreI, DictionaryI } from '../../store/types';

const BooksPage: FC<{ dictionaries: DictionaryI | null }> = ({ dictionaries }) => {
  return <div>{dictionaries ? JSON.stringify(dictionaries.shops) : 'Kornilova'}</div>;
};
const mapStateToProps = (state: StoreI) => {
  return {
    dictionaries: state.dictionaries,
  };
};
export default connect(mapStateToProps)(BooksPage);

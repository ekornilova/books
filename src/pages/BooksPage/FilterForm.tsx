import React, { FC } from 'react';
import styled from 'styled-components';
import Form from '../../Components/Form';
import { DictionaryOptionI } from './tableSettings';
import { FieldI } from '../../additional';
import { onlyNumberField } from './helpers';

export const defaultFilterSettings = {
  name: '',
  isbn: '',
};
export const getFilterFieldSettings = (
  dictionaries: DictionaryOptionI | null,
): FieldI<FilterSettingsI>[] => {
  return [
    {
      name: 'name',
      label: 'Book Name',
    },
    {
      type: 'select',
      label: 'Author Name',
      name: 'author',
      options: dictionaries ? dictionaries.authors : [],
    },
    {
      type: 'select',
      label: 'Genres',
      name: 'genres',
      options: dictionaries ? dictionaries.genres : [],
    },
    {
      name: 'isbn',
      label: 'ISBN',
      onChangeValue: onlyNumberField,
    },
    {
      name: 'commonCount_from',
      label: 'Min count',
      onChangeValue: onlyNumberField,
    },
    {
      name: 'commonCount_to',
      label: 'Max count',
      onChangeValue: onlyNumberField,
    },
  ];
};
export interface FilterSettingsI {
  name: string;
  author?: string | number;
  genres?: string | number;
  isbn: string;
  commonCount_from?: number;
  commonCount_to?: number;
}
interface FilterFormI {
  value: FilterSettingsI;
  setValue: any;
  fieldSettings: FieldI<FilterSettingsI>[];
}
const StForm = styled(Form)`
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  flex-wrap: wrap;
  justify-items: center;
  > * {
    width: 15%;
    display: flex;
    align-items: center;
  }
`;
const FilterForm: FC<FilterFormI> = ({ value, setValue, fieldSettings }) => {
  return <StForm value={value} onChange={setValue} fieldSettings={fieldSettings} />;
};

export default FilterForm;

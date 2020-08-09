import React, { FC } from 'react';
import styled from 'styled-components';
import Form from '../../Components/Form';
import { DictionaryOptionI } from './tableSettings';
import { FieldI } from '../../additional';

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
    },
    {
      name: 'commonCount_from',
      label: 'Min count',
    },
    {
      name: 'commonCount_to',
      label: 'Max count',
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
  //  (val: FilterSettingsI)=>FilterSettingsI,
  fieldSettings: FieldI<FilterSettingsI>[];
}
const StForm = styled(Form)`
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

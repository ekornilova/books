import React, { FC } from 'react';
import styled from 'styled-components';
import Form from '../../Components/Form';
import { DictionaryOptionI } from './tableSettings';
import { FieldI } from '../../additional';
import { onlyNumberField } from './helpers';
import { Button } from '../../Components/BasicElements';

export const defaultFilterSettings = {
  name: '',
  isbn: '',
  author: '',
  genres: '',
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
const FilterFormWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  width: 100%;
  align-items: center;
  align-content: center;
  justify-content: space-around;
  flex-wrap: wrap;
  justify-items: center;
`;
const StForm = styled(Form)`
  display: flex;
  width: 90%;
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
  const onClearFilterSettings = () => {
    setValue(defaultFilterSettings);
  };
  return (
    <FilterFormWrapper>
      <StForm value={value} onChange={setValue} fieldSettings={fieldSettings} />
      <Button onClick={onClearFilterSettings}>CLEAR</Button>
    </FilterFormWrapper>
  );
};

export default FilterForm;

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { FieldI, FieldType, AnyObject } from '../../additional';
import { Select, Input, TextComponent } from '../BasicElements';
import { FormI } from './index';

export interface EditFieldI<T extends AnyObject> extends Omit<FormI<T>, 'fieldSettings' | 'value'> {
  fieldSetting: FieldI<T>;
  value: T[keyof T];
}
export const StInput = styled((props) => <Input {...props} />)`
  padding-top: 10px;
  flex-grow: 1;
`;
export const EditFieldWrapper = styled.div`
  height: 73px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  justify-items: flex-start;
`;
export const StSelect = styled(Select)`
  .MuiTypography-body1 {
    line-height: unset;
  }
`;
const EditField = <T extends AnyObject>({
  fieldSetting,
  value: currentValue,
  onChange,
}: EditFieldI<T>): React.ReactElement => {
  const [localState, setLocalState] = useState<T[keyof T]>(currentValue);
  useEffect(() => {
    if (localState !== currentValue) {
      onChange((oldVals: T) => {
        const newVals = {
          ...oldVals,
          [fieldSetting.name]: localState,
        };
        return newVals;
      });
    }
  }, [localState]);
  useEffect(() => {
    if (localState !== currentValue) {
      setLocalState(currentValue);
    }
  }, [currentValue]);
  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    const fieldValue = event.target.value;
    setLocalState(
      fieldSetting.onChangeValue
        ? fieldSetting.onChangeValue(fieldValue as T[keyof T])
        : fieldValue,
    );
  };
  const errorMessage = fieldSetting.isNotValid ? fieldSetting.isNotValid(localState) : '';
  let ComponentField = null;
  switch (fieldSetting.type) {
    case FieldType.Select: {
      ComponentField = (
        <StSelect
          onChange={handleChangeValue}
          forForm
          labelText={fieldSetting.label}
          value={localState as string}
          values={fieldSetting.options || []}
        />
      );
      break;
    }
    default: {
      ComponentField = (
        <StInput
          labelText={fieldSetting.label}
          forForm
          isInput
          onChange={handleChangeValue}
          value={localState || ''}
        />
      );
      break;
    }
  }
  return (
    <EditFieldWrapper>
      {ComponentField}
      {errorMessage && <TextComponent color="secondary" text={errorMessage} />}
    </EditFieldWrapper>
  );
};
export default EditField;

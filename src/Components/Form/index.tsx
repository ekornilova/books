import React from 'react';
import styled from 'styled-components';
import { FieldI, FieldType, AnyObject } from '../../additional';
import { Select, Input, TextComponent } from '../BasicElements';

const Wrapper = styled.div``;

interface FormI<T extends AnyObject> {
  fieldSettings: FieldI<T>[];
  value: T;
  onChange: any;
}
interface EditFieldI<T extends AnyObject> {
  fieldSetting: FieldI<T>;
  value: T;
  onChange: any;
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
export const EditField = <T extends AnyObject>({
  fieldSetting,
  value,
  onChange,
}: EditFieldI<T>): React.ReactElement => {
  const handleChangeValue = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    onChange((oldVals: T) => {
      const fieldValue =
        typeof oldVals[field] === 'boolean' ? event.target.checked : event.target.value;
      const newVals = {
        ...oldVals,
        [field]: fieldSetting.onChangeValue
          ? fieldSetting.onChangeValue(fieldValue as T[keyof T])
          : fieldValue,
      };
      return newVals;
    });
  };
  const currentValue = value[fieldSetting.name];
  const errorMessage = fieldSetting.isNotValid ? fieldSetting.isNotValid(currentValue) : '';
  let ComponentField = null;
  switch (fieldSetting.type) {
    case FieldType.Select: {
      ComponentField = (
        <StSelect
          onChange={handleChangeValue(fieldSetting.name as string)}
          forForm
          labelText={fieldSetting.label}
          value={currentValue as string}
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
          onChange={handleChangeValue(fieldSetting.name as string)}
          value={currentValue || ''}
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
const StyledRowItem = styled.div`
  > * {
    width: 100%;
  }
`;
const Form = <T extends AnyObject>({
  fieldSettings,
  value,
  onChange,
  className,
}: FormI<T> & {
  className?: string;
}): React.ReactElement => {
  return (
    <Wrapper className={className}>
      {fieldSettings.map((fieldSetting) => {
        return (
          <StyledRowItem>
            <EditField fieldSetting={fieldSetting} onChange={onChange} value={value} />
          </StyledRowItem>
        );
      })}
    </Wrapper>
  );
};
export default Form;

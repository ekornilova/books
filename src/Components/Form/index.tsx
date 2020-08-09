import React from 'react';
import styled from 'styled-components';
import { FieldI, AnyObjectWithId } from '../../additional';
import { Select, Input } from '../BasicElements';

const Wrapper = styled.div``;

interface FormI<T extends AnyObjectWithId> {
  fieldSettings: FieldI<T>[];
  value: T;
  onChange: any;
  //  (newValue: T) => void;
}
interface EditFieldI<T extends AnyObjectWithId> {
  fieldSetting: FieldI<T>;
  value: T;
  onChange?: any;
}
export const StInput = styled((props) => <Input {...props} />)`
  padding-top: 10px;
  flex-grow: 1;
`;
export const EditField = <T extends AnyObjectWithId>({
  fieldSetting,
  value,
  onChange,
}: EditFieldI<T>) => {
  const handleChangeValue = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    onChange((oldVals: T) => {
      const newVals = {
        ...oldVals,
        [field]: typeof oldVals[field] === 'boolean' ? event.target.checked : event.target.value,
      };
      return newVals;
    });
  };
  switch (fieldSetting.type) {
    case 'select': {
      return (
        <Select
          onChange={handleChangeValue(fieldSetting.name as string)}
          forForm
          labelText={fieldSetting.label}
          value={value[fieldSetting.name] || fieldSetting.defaultValue}
          values={fieldSetting.options || []}
        />
      );
    }
    default: {
      return (
        <StInput
          labelText={fieldSetting.label}
          forForm
          isInput
          onChange={handleChangeValue(fieldSetting.name as string)}
          value={value[fieldSetting.name] || ''}
        />
      );
    }
  }
};
const StyledRowItem = styled.div`
  > * {
    width: 100%;
  }
`;
const Form = <T extends AnyObjectWithId>({
  fieldSettings,
  value,
  onChange,
  className,
}: FormI<T> & {
  className?: string;
}) => {
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

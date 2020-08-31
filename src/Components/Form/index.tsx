import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FieldI, AnyObject, FieldType } from '../../additional';
import EditField from './EditField';
import EditFieldForm from './EditFieldForm';

const Wrapper = styled.div``;

export interface FormI<T extends AnyObject> {
  fieldSettings: FieldI<T>[];
  value: T;
  onChange: React.Dispatch<React.SetStateAction<T>>;
}

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
        const currentValue = value[fieldSetting.name];
        const comp =
          FieldType.Custom === fieldSetting.type
            ? useMemo(() => {
                return (
                  <EditFieldForm
                    fieldSetting={fieldSetting}
                    onChange={onChange}
                    value={currentValue}
                  />
                );
              }, [fieldSettings])
            : useMemo(() => {
                return (
                  <EditField fieldSetting={fieldSetting} onChange={onChange} value={currentValue} />
                );
              }, [currentValue, fieldSettings]);
        return <StyledRowItem>{comp}</StyledRowItem>;
      })}
    </Wrapper>
  );
};
export default Form;

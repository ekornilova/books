import React, { useState, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import { AnyObject } from '../../additional';
import Form from './index';
import { EditFieldI, EditFieldWrapper } from './EditField';

const EditFieldForm = <T extends AnyObject>({
  fieldSetting,
  value: currentValue,
  onChange,
}: EditFieldI<T>): React.ReactElement => {
  // const currentValue = value[fieldSetting.name];
  const [stateValue, setStateValue] = useState(currentValue);
  const [forceUpdate, setForceUpdate] = useState(1);
  useEffect(() => {
    if (stateValue !== currentValue) {
      onChange((oldVals: T) => {
        return {
          ...oldVals,
          [fieldSetting.name as string]: stateValue,
        };
      });
    }
  }, [stateValue]);
  useEffect(() => {
    if (stateValue !== currentValue) {
      setStateValue(currentValue);
      setForceUpdate((oldVal) => oldVal + 1);
    }
  }, [currentValue]);
  const StForm = styled(Form)`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: space-around;
    flex-wrap: wrap;
    justify-items: center;
    > * {
      width: 45%;
      display: flex;
      align-items: center;
    }
  `;
  return (
    <EditFieldWrapper>
      {useMemo(() => {
        return (
          <StForm
            fieldSettings={fieldSetting.fieldSettings}
            onChange={setStateValue}
            value={stateValue}
          />
        );
      }, [forceUpdate])}
    </EditFieldWrapper>
  );
};
export default EditFieldForm;

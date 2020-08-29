import React, { ComponentType } from 'react';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import Select from './Select';
import { OptionI, SimpleType } from '../../../additional';
import FormElWraper from '../FormElWraper';

const SelectFullComponent: React.FC<{
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: SimpleType | null;
  values: OptionI[];
  className?: string;
  labelText?: string;
  forForm?: boolean;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  getAdditionalComps?: (itemValue: SimpleType) => React.ReactNode;
  Icon?: ComponentType<SvgIconProps>;
  open?: boolean;
  isMultiple?: boolean;
}> = ({
  onChange,
  value,
  values,
  className,
  forForm,
  labelText,
  Icon,
  getAdditionalComps,
  variant,
  open,
  isMultiple,
}) => {
  const selectComponent = (
    <Select
      values={values}
      value={value}
      getAdditionalComps={getAdditionalComps}
      onChange={onChange}
      className={className}
      variant={variant}
      Icon={Icon}
      open={open}
      isMultiple={isMultiple}
    />
  );
  return forForm ? (
    <FormElWraper className={className} labelText={labelText}>
      {selectComponent}
    </FormElWraper>
  ) : (
    selectComponent
  );
};

export default SelectFullComponent;

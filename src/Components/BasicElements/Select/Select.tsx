import React, { ComponentType, useEffect, useState } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { SvgIconProps } from '@material-ui/core/SvgIcon';
import { OptionI } from '../../../additional';
import TextComponent from '../TextComponent';

const SelectComponent: React.FC<{
  onChange: (
    event: React.ChangeEvent<HTMLInputElement>, // React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => // child: React.ReactNode,
  void;
  value: string | number | null;
  values: OptionI[];
  className?: string;
  getAdditionalComps?: (itemVal: string | number) => React.ReactNode;
  variant?: 'filled' | 'outlined' | 'standard' | undefined;
  Icon?: ComponentType<SvgIconProps>;
  open?: boolean;
  isMultiple?: boolean;
}> = ({
  onChange,
  value,
  values,
  className,
  getAdditionalComps,
  variant,
  Icon,
  open,
  isMultiple,
}) => {
  const [curValue, setCurValue] = useState<string | number | null>(value);
  useEffect(() => {
    setCurValue(value);
  }, [value]);
  const onSelectChange = (
    event: React.ChangeEvent<{ name?: string | undefined; value: unknown }>,
  ) => {
    onChange(event as React.ChangeEvent<HTMLInputElement>);
  };
  const isSelectMultiple = isMultiple || Array.isArray(curValue);
  return (
    <Select
      multiple={isSelectMultiple}
      value={curValue}
      onChange={onSelectChange}
      className={className}
      variant={variant}
      IconComponent={Icon}
      {...(isSelectMultiple
        ? {
            renderValue: (selected: (string | number)[]) => {
              const selectedValue = selected
                .map((item) => {
                  const findOption = values.find((val) => val.id === item);
                  return findOption ? findOption.value || findOption.id : '';
                })
                .join(', ');
              return <TextComponent text={selectedValue} />;
            },
          }
        : {})}
      {...(open !== undefined
        ? {
            open,
          }
        : {})}
    >
      {values &&
        values.map((item: OptionI) => (
          <MenuItem key={item.id} value={item.id}>
            {getAdditionalComps && getAdditionalComps(item.id)}
            {item.value || item.id}
          </MenuItem>
        ))}
    </Select>
  );
};

export default SelectComponent;

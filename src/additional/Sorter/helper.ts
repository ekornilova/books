import { AnyObject, OptionI, SimpleType } from '../index';

function getOptionValueById(options: OptionI[], id: SimpleType): SimpleType {
  const option = options.find((item) => item.id === (id || ''));
  return (option && option.value) || '';
}

export const sortableFn = <T extends AnyObject>(
  a: T,
  b: T,
  orderBy: keyof T,
  options?: OptionI[],
): {
  a: SimpleType;
  b: SimpleType;
} => {
  let aField = a[orderBy] as SimpleType;
  let bField = b[orderBy] as SimpleType;
  if (options) {
    aField = getOptionValueById(options, aField);
    bField = getOptionValueById(options, bField);
  }
  if (typeof aField === 'number' && typeof bField === 'number') {
    return {
      a: aField,
      b: bField,
    };
  }
  const aStr = aField || '';
  const bStr = bField || '';
  const aData: number = (bStr as string).localeCompare(aStr as string);
  const bData: number = (aStr as string).localeCompare(bStr as string);
  return {
    a: aData,
    b: bData,
  };
};

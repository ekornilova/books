import { AnyObjectWithId } from '../index';

export const sortableFn = <T extends AnyObjectWithId>(a: T, b: T, orderBy: keyof T) => {
  if (typeof a[orderBy] === 'number' && typeof b[orderBy] === 'number') {
    return {
      a: a[orderBy],
      b: b[orderBy],
    };
  }
  const aStr: string = a[orderBy] || '';
  const bStr: string = b[orderBy] || '';
  const aData: number = bStr.localeCompare(aStr);
  const bData: number = aStr.localeCompare(bStr);
  return {
    a: aData,
    b: bData,
  };
};

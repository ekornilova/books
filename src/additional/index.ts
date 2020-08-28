export function arrayMoveEnd(array: any[], i: number): void {
  const el: any = array[i];
  array.splice(i, 1);
  array.push(el);
}

export function toggleIcons(icons: JSX.Element[], toggler: boolean): JSX.Element {
  return toggler ? icons[0] : icons[1];
}

export type Alignment = 'left' | 'right' | 'center' | 'justify' | 'inherit';

// export type Order = 'desc' | 'asc';
export enum Order {
  Desc = 'desc',
  Asc = 'asc',
}
export const toggleOrder = (order: Order): Order => {
  return order === Order.Desc ? Order.Asc : Order.Desc;
};

export type AnyObjectWithId = {
  id?: string | number;
  [key: string]: any;
};
export type FieldType = 'input' | 'select' | 'image';
export interface OptionI {
  id: string | number;
  value?: string | number;
}
export interface FieldI<T extends AnyObjectWithId> {
  type?: FieldType;
  options?: OptionI[];
  defaultValue?: string | number;
  name: keyof T;
  label?: string;
  isNotValid?: (val: string | number) => string;
  onChangeValue?: (val: string | number) => string | number;
  isNotEdit?: boolean;
}

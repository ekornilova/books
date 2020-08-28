export function arrayMoveEnd(array: any[], i: number): void {
  const el: any = array[i];
  array.splice(i, 1);
  array.push(el);
}

export function toggleIcons(icons: JSX.Element[], toggler: boolean): JSX.Element {
  return toggler ? icons[0] : icons[1];
}

//  export type Alignment = 'left' | 'right' | 'center' | 'justify' | 'inherit';
export enum Alignment {
  Left = 'left',
  Right = 'right',
  Center = 'center',
  Justify = 'justify',
  Inherit = 'inherit',
}
export enum Order {
  Desc = 'desc',
  Asc = 'asc',
}
export const toggleOrder = (order: Order): Order => {
  return order === Order.Desc ? Order.Asc : Order.Desc;
};

export type AnyObject = Record<string, string | number | (string | number)[] | undefined>;

export enum FieldType {
  Input,
  Select,
  Image,
}
export interface OptionI {
  id: string | number;
  value?: string | number;
}
export interface FieldI<T extends AnyObject> {
  type?: FieldType;
  options?: OptionI[];
  defaultValue?: string | number;
  name: keyof T;
  label?: string;
  isNotValid?: (val: T[keyof T]) => string;
  onChangeValue?: (val: T[keyof T]) => string | number;
  isNotEdit?: boolean;
}

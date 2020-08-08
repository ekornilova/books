// import debounce from 'lodash/debounce';

export function arrayMoveEnd(array: any[], i: number): void {
  const el: any = array[i];
  array.splice(i, 1);
  array.push(el);
}

export function toggleIcons(icons: JSX.Element[], toggler: boolean): JSX.Element {
  return toggler ? icons[0] : icons[1];
}

export type Alignment = 'left' | 'right' | 'center' | 'justify' | 'inherit';

export type Order = 'desc' | 'asc';

// Функция для переключения order
export const toggleOrder = (order: Order): Order => {
  return order === 'desc' ? 'asc' : 'desc';
};

// export const debouncedUpdate = debounce((fn: Function) => {
//   fn();
// }, 100);

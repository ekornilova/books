import React from 'react';
import BooksPage from '../pages/BooksPage';

export interface RouteI {
  name: string;
  path: string;
  Component: any;
  routes?: RouteI[];
  redirect?: string;
  exact?: boolean;
}

export interface CustomSettingsI {
  Header?: React.FC;
}

export const routes: RouteI[] = [
  {
    name: 'Books',
    path: '/',
    Component: BooksPage,
    exact: true,
  },
];

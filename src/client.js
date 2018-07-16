/* eslint-disable react/jsx-filename-extension  */
import React from 'react';
import 'babel-polyfill';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { ensureReady, After } from '@jaredpalmer/after';
import routes from './app/routes';

const root = document.getElementById('root');

const a = new Map();
a.set(1, 'Hello from value 1');
a.set(2, 'Hello from value 2');
a.forEach(value => {
  console.log(value);
});

ensureReady(routes).then(data =>
  hydrate(
    <BrowserRouter>
      <After data={data} routes={routes} />
    </BrowserRouter>,
    root,
  ),
);

if (module.hot) {
  module.hot.accept();
}

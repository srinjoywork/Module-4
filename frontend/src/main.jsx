import React from 'react';
import { createRoot } from 'react-dom/client';
import { FluentProvider, webLightTheme } from '@fluentui/react-components';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import './index.css';

const root = createRoot(document.getElementById('root'));

root.render(
  <FluentProvider theme={webLightTheme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </FluentProvider>,
);

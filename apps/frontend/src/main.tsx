import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';

import { ApolloProvider } from '@apollo/client';

import { Router } from './app/Router';
import { gqlClient } from './app/services/apollo';

import { ToastContainer, cssTransition } from 'react-toastify';
import './styles.css';
import 'react-toastify/dist/ReactToastify.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const Zoom = cssTransition({
  enter: 'zoomIn',
  exit: 'zoomOut',
  appendPosition: false,
  collapse: true,
  collapseDuration: 300,
});

console.log(
  '%cLevi Math',
  'color: #8449db; -webkit-text-stroke-width: 2px; -webkit-text-stroke-color: black; font: small-caps bold 4em/1 sans-serif;'
);

root.render(
  <StrictMode>
    <ToastContainer
      position="bottom-center"
      theme="colored"
      transition={Zoom}
      autoClose={4000}
      hideProgressBar={true}
    />
    <ApolloProvider client={gqlClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  </StrictMode>
);

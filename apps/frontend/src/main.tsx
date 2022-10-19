import { StrictMode } from 'react';
import * as ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';
import { Router } from './app/Router';

import { ApolloProvider } from '@apollo/client';
import { gqlClient } from './app/services/apollo';

import './app/services/firebase';
import { AuthProvider } from '@levi-math/components';

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
      <AuthProvider>
        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </AuthProvider>
    </ApolloProvider>
  </StrictMode>
);

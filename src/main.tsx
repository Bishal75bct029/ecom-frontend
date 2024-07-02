import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.css';
// import { AppProvider } from '@/providers/AppProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
);

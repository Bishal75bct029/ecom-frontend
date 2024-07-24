import React from 'react';
import ReactDOM from 'react-dom/client';
import '@/index.scss';
// import { AppProvider } from '@/providers/AppProvider.tsx';
import { Provider } from 'react-redux';
import { store } from './store';
import { RouterProvider } from 'react-router-dom';
import router from '@/routes';
import { ToastContainer } from 'react-toastify';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <RouterProvider router={router} />
        <ToastContainer
          position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          autoClose={3000}
          closeOnClick={true}
          limit={3}
          rtl={false}
          draggable={false}
          pauseOnHover
          theme="light"
          icon={false}
        />
      </Provider>
    </React.Suspense>
  </React.StrictMode>,
);

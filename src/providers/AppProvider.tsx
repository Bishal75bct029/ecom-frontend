import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from './ThemeProvider';
import { ErrorBoundary } from 'react-error-boundary';
import { store } from '@/store';

function ErrorFallback() {
  return (
    <div role="alert">
      <h2>Ooops, something went wrong :( </h2>
      <p>Try refreshing the page :)</p>
    </div>
  );
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <React.Suspense fallback={<div>Loading...</div>}>
      <Provider store={store}>
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
          <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
        </ThemeProvider>
      </Provider>
    </React.Suspense>
  );
}

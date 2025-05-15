import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import router from './router';
import { RouterProvider } from 'react-router-dom';
// @ts-expect-error TS(2307): Cannot find module 'virtual:pwa-register' or its c... Remove this comment to see the full error message
import { registerSW } from 'virtual:pwa-register';


const root = ReactDOM.createRoot(document.getElementById('root')!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// Register the service worker with auto update behavior
registerSW({
  onNeedRefresh() {
    if (confirm('A new version is available. Refresh now?')) {
      window.location.reload();
    }
  },
  onOfflineReady() {
    console.log('App is ready to work offline.');
  },
});

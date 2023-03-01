import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import { ConfigProvider, theme } from 'antd';
import './styles/global.css';
import "@total-typescript/ts-reset";



ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ConfigProvider theme={{
      token: { colorPrimary: '#00b96b' },
      // algorithm: theme.darkAlgorithm,
    }}>
        <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>,
)

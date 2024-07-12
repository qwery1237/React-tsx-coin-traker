import React from 'react';
import ReactDOM from 'react-dom/client';
import './reset.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Coins from './routes/Coins';
import Coin from './routes/Coin';
import App from './App.tsx';
import Chart from './routes/Chart.tsx';
import Detail from './routes/Detail.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Coins />,
      },
      {
        path: ':coinId',
        element: <Coin />,
        children: [
          {
            path: 'chart',
            element: <Chart />,
          },
          {
            path: 'detail',
            element: <Detail />,
          },
        ],
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <RouterProvider router={router} />
      </RecoilRoot>
    </QueryClientProvider>
  </React.StrictMode>
);

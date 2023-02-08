import { ComponentType } from 'react';
import { createBrowserRouter, RouteObject, redirect } from 'react-router-dom';
import { authorize } from './auth';

import Home from './pages/Home';
import Index from './pages/Index/index';



const routes: RouteObject[] = [
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/home",
    loader: authorize,
    element: < Home />,
  }
];

export const router = createBrowserRouter(routes);


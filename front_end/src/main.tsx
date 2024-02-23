import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from "./routes/HomePage";
import ErrorPage from "./error-page";
import TicketsPage from './routes/TicketsPage';
import TicketPage from './routes/TicketPage';
import LoginPage from './routes/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    errorElement: <ErrorPage />,

  },
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path:'/tickets',
    element: <TicketsPage />,
    errorElement: <ErrorPage />,

  },
  {
    path:'/tickets/:id',
    element: <TicketPage />,
    errorElement: <ErrorPage />,

  }
 
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

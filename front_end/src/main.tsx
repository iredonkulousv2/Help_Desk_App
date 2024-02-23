import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter,RouterProvider} from "react-router-dom";
import HomePage from "./routes/HomePage";
import TicketsPage from './routes/TicketsPage';
import TicketPage from './routes/TicketPage';
import LoginPage from './routes/LoginPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path:'/login',
    element: <LoginPage />
  },
  {
    path:'/tickets',
    element: <TicketsPage />,
  },
  {
    path:'/tickets/:id',
    element: <TicketPage />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

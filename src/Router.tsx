import { useContext } from 'react'
import {
  createHashRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import ErrorPage from './routes/ErrorPage.tsx';
import Country from './routes/Country.tsx';
import { ThemeContext } from './context/ThemeContext.tsx';

export default function router() {

  const { theme } = useContext(ThemeContext);

  const router = createHashRouter([
    {
      path: '/',
      element: <App />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/countries/:countryName",
      element: <Country />,
      errorElement: <ErrorPage />
    }
  ]);

  return (
    <div className={theme}>
      <RouterProvider router={router} />
    </div>
  )
}

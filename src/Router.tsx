import { useContext } from 'react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from './App.tsx'
import ErrorPage from './routes/ErrorPage.tsx';
import Country from './routes/Country.tsx';
import { ThemeContext } from './context/ThemeContext.tsx';

export default function router() {

  const { theme } = useContext(ThemeContext);

  const router = createBrowserRouter([
    {
      path: '' || '/rest-countries-api',
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

import React from 'react'
import ReactDOM from 'react-dom/client'
import Router from './Router.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx';

const root = document.getElementById('root')!;

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </React.StrictMode>,
)




import React, { useEffect, createContext, useState } from 'react';

export const ThemeContext = createContext<any>({ theme: 'light', undefined });

export const ThemeProvider: React.FC<any> = ({children}) => {
  const [theme, setTheme] = useState('');
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {setTheme(savedTheme);}
    else {setTheme('light');}
  }, [])
  

  return <ThemeContext.Provider value={{ theme, setTheme }}>
    {children}
  </ThemeContext.Provider>
};
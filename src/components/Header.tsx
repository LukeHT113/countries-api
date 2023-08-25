import { useContext } from "react"
import { ThemeContext } from '../context/ThemeContext.tsx';
import { Link } from "react-router-dom";

export default function Header() {

  const { theme, setTheme } = useContext(ThemeContext);

  function changeTheme() {
    if (theme === 'light') {
      localStorage.setItem("theme", "dark")
    } else {
      localStorage.setItem("theme", "light")
    }
    setTheme(theme === 'light' ? 'dark' : 'light');
  }

  return (
    <header className="header">
      <Link to='/'><h1>Where in the world?</h1></Link>
      <button tabIndex={0} onClick={changeTheme} className="theme-button">{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
    </header>
  )
}

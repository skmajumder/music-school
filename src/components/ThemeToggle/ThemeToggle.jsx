import { useState, useEffect } from "react";
import { FaRegMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  useEffect(() => {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "dark") {
      setIsDarkTheme(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
    const newTheme = isDarkTheme ? "light" : "dark";
    localStorage.setItem("theme", newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  return (
    <button
      className="btn btn-sm"
      onClick={toggleTheme}
      aria-label="Toggle Theme"
    >
      {isDarkTheme ? <FaRegMoon /> : <FaSun />}
    </button>
  );
};

export default ThemeToggle;

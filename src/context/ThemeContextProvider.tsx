import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";
import {ThemeMode} from "../util/ThemeUtil";

const ThemeContextDefaultProvider = (props: any) => {
  const [userThemeMode, setUserThemeMode] = useState<ThemeMode>("light");

  useEffect(() => {
    let userColorScheme: ThemeMode = "light";

    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", (event) => {
        userColorScheme = event.matches ? "dark" : "light";
      });

     const themeValue= localStorage.getItem('openApiSculptorThemeValue');
     const colorScheme: ThemeMode = (themeValue === "dark" || themeValue === "light") 
                        ?  themeValue : userColorScheme;
                        
   localStorage.setItem('openApiSculptorThemeValue', colorScheme);
    setUserThemeMode(colorScheme);
  }, []);

  useEffect(() => {
    //shadcn theme changing
    if (userThemeMode === "dark") {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    toggleCSSVariables();
  }, [userThemeMode]);

  const lightThemeCSSVariables = [
    {
      name: "--custom-test-color",
      value: "#fdfdfd",
    }
  ];

  const darkThemeCSSVariables = [
    {
      name: "--custom-test-color",
      value: "#090909",
    }
  ];

  const toggleUserThemeMode = () => {
    let toggledThemeMode: ThemeMode = userThemeMode === "dark" ? "light" : "dark";
    localStorage.setItem('openApiSculptorThemeValue', toggledThemeMode);
    setUserThemeMode(toggledThemeMode);
  };

  const toggleCSSVariables = () => {
    const themeCSSVariables =
      userThemeMode === "light"
        ? lightThemeCSSVariables
        : darkThemeCSSVariables;
        
    themeCSSVariables.forEach((cssVar) => {
      document.documentElement.style.setProperty(cssVar.name, cssVar.value);
    });
  };

  return (
    <>
      <ThemeContext.Provider value={{
      themeMode:userThemeMode,
      toggleThemeMode: toggleUserThemeMode,
      }}>
        {props.children}
      </ThemeContext.Provider>
    </>
  );
}

export default ThemeContextDefaultProvider;

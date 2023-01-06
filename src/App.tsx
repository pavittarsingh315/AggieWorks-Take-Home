import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

   useEffect(() => {
      const savedThemeIsDark = JSON.parse(localStorage.getItem("isDarkModeEnabled") || "false") === "true";
      setIsDarkModeEnabled(savedThemeIsDark);
      document.body.style.backgroundColor = savedThemeIsDark ? "black" : "white";
   }, []);

   const toggleTheme = () => {
      localStorage.setItem("isDarkModeEnabled", JSON.stringify(!isDarkModeEnabled ? "true" : "false"));
      document.body.style.backgroundColor = !isDarkModeEnabled ? "black" : "white";
      setIsDarkModeEnabled(!isDarkModeEnabled);
   };

   return (
      <React.Fragment>
         <Navbar isDarkModeEnabled={isDarkModeEnabled} toggleTheme={toggleTheme} />;
      </React.Fragment>
   );
}

export default App;

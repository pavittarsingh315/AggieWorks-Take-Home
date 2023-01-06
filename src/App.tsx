import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";

function App() {
   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

   useEffect(() => {
      setIsDarkModeEnabled(JSON.parse(localStorage.getItem("isDarkModeEnabled") || "false") === "true");
   }, []);

   const toggleTheme = () => {
      localStorage.setItem("isDarkModeEnabled", JSON.stringify(!isDarkModeEnabled ? "true" : "false"));
      setIsDarkModeEnabled(!isDarkModeEnabled);
   };

   return (
      <React.Fragment>
         <Navbar isDarkModeEnabled={isDarkModeEnabled} toggleTheme={toggleTheme} />;
      </React.Fragment>
   );
}

export default App;

import { Container, IconButton, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import "./styles/Navbar.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import SearchBar from "./components/Searchbar";

function App() {
   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);

   useEffect(() => {
      setIsDarkModeEnabled(JSON.parse(localStorage.getItem("isDarkModeEnabled") || "false") === "true");
   }, []);

   var headerStyle = {
      boxShadow: "0px 6px 10px -9px rgba(128, 128, 128, 1)",
      zIndex: "1000",
      top: "0",
      width: "100%",
      background: isDarkModeEnabled ? "#000000" : "#FFFFFF",
   };

   const toggleTheme = () => {
      localStorage.setItem("isDarkModeEnabled", JSON.stringify(!isDarkModeEnabled ? "true" : "false"));
      setIsDarkModeEnabled(!isDarkModeEnabled);
   };

   return (
      <div style={headerStyle}>
         <Container>
            <div className="navbar">
               <div className="navbar__left">
                  <h1>AggieWorks</h1>
               </div>
               <div className="navbar__center">
                  <SearchBar />
               </div>
               <div className="navbar__right">
                  <Tooltip
                     title={isDarkModeEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
                     arrow
                     enterDelay={0}
                     leaveDelay={25}
                  >
                     <IconButton color="inherit" onClick={toggleTheme}>
                        {isDarkModeEnabled ? <LightModeRoundedIcon /> : <NightsStayRoundedIcon />}
                     </IconButton>
                  </Tooltip>
               </div>
            </div>
         </Container>
      </div>
   );
}

export default App;

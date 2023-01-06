import { Container, IconButton, Tooltip } from "@mui/material";
import "../styles/Navbar.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import SearchBar from "./Searchbar";

function Navbar({ isDarkModeEnabled, toggleTheme }: { isDarkModeEnabled: boolean; toggleTheme: () => void }) {
   var headerStyle = {
      boxShadow: "0px 6px 10px -9px rgba(128, 128, 128, 1)",
      zIndex: "1000",
      top: "0",
      width: "100%",
      background: isDarkModeEnabled ? "#000000" : "#FFFFFF",
   };

   return (
      <div style={headerStyle}>
         <Container>
            <div className="navbar" style={{ backgroundColor: isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>
               <div className="navbar__left">
                  <h1 style={{ color: !isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>AggieWorks</h1>
               </div>
               <div className="navbar__center" style={{ backgroundColor: "red" }}>
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
                        {isDarkModeEnabled ? (
                           <LightModeRoundedIcon style={{ color: "white" }} />
                        ) : (
                           <NightsStayRoundedIcon style={{ color: "black" }} />
                        )}
                     </IconButton>
                  </Tooltip>
               </div>
            </div>
         </Container>
      </div>
   );
}

export default Navbar;

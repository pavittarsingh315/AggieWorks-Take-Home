import { Container, IconButton, Tooltip } from "@mui/material";
import "../styles/Navbar.css";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import NightsStayRoundedIcon from "@mui/icons-material/NightsStayRounded";
import SearchBar from "./Searchbar";
import PersonInterface from "../interfaces/person";

function Navbar({
   isDarkModeEnabled,
   toggleTheme,
   addNewResults,
   setIsSearching,
}: {
   isDarkModeEnabled: boolean;
   toggleTheme: () => void;
   addNewResults: (newResults: PersonInterface[]) => void;
   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   return (
      <div
         style={{
            position: "fixed",
            boxShadow: "0px 6px 10px -9px rgba(111, 111, 111, 1)",
            zIndex: "1000",
            top: "0",
            width: "100%",
            background: isDarkModeEnabled ? "#000000" : "#FFFFFF",
         }}
      >
         <Container>
            <div className="navbar" style={{ backgroundColor: isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>
               <div className="navbar__left">
                  <h1 style={{ color: !isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>AggieWorks</h1>
               </div>
               <div className="navbar__center">
                  <SearchBar
                     isDarkModeEnabled={isDarkModeEnabled}
                     addNewResults={addNewResults}
                     setIsSearching={setIsSearching}
                  />
               </div>
               <div className="navbar__right">
                  <Tooltip
                     title={isDarkModeEnabled ? "Enable Light Mode" : "Enable Dark Mode"}
                     arrow
                     enterDelay={0}
                     leaveDelay={25}
                  >
                     <IconButton disableRipple color="inherit" onClick={toggleTheme}>
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

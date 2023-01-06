import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import { Container, Button } from "@mui/material";
import PersonInterface from "./interfaces/person";

function App() {
   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
   const [isSearching, setIsSearching] = useState(false);
   const [recentSearches, setRecentSearches] = useState<PersonInterface[]>([]);
   const [results, setResults] = useState<PersonInterface[]>([]);

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

   const addNewResults = (newResults: PersonInterface[]) => {
      setResults([...newResults, ...results]);
   };

   const addNewRecentSearch = (newSearch: PersonInterface) => {
      setRecentSearches([newSearch, ...recentSearches]);
   };

   return (
      <React.Fragment>
         <Navbar
            isDarkModeEnabled={isDarkModeEnabled}
            toggleTheme={toggleTheme}
            addNewResults={addNewResults}
            setIsSearching={setIsSearching}
         />
         ;
         <Container>
            {!isSearching ? (
               <div
                  style={{
                     display: "flex",
                     justifyContent: `${recentSearches.length === 0 ? "center" : "space-between"}`,
                  }}
               >
                  <h3 style={{ color: !isDarkModeEnabled ? "#000000" : "#FFFFFF", display: "inline-block" }}>
                     {recentSearches.length === 0 ? "No Recent Searches" : "Recent Searches"}
                  </h3>
                  {recentSearches.length !== 0 ? (
                     <Button style={{ display: "inline-block" }} variant="contained" color="error" size="small">
                        Clear
                     </Button>
                  ) : null}
               </div>
            ) : (
               // recentSearches.map(recentSearch => (a component))
               <div>
                  <h3
                     style={{
                        color: !isDarkModeEnabled ? "#000000" : "#FFFFFF",
                        textAlign: "center",
                     }}
                  >
                     {results.length === 0 ? "No such users exist" : "Results"}
                  </h3>
                  <h1 style={{ color: "white" }}>replace this with the map comment</h1>
               </div>
            )}
         </Container>
      </React.Fragment>
   );
}

export default App;

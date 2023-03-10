import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import PersonInterface from "./interfaces/person";

import { Container, Button, List, ListItem, Divider, Avatar, Stack } from "@mui/material";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import DetailView from "./components/DetailView";

function App() {
   const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
   const [isSearching, setIsSearching] = useState(false);
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [detailPerson, setDetailPerson] = useState<PersonInterface>();
   const [recentSearches, setRecentSearches] = useState<PersonInterface[]>([]);
   const [results, setResults] = useState<PersonInterface[]>([]);
   const [makeAPICall, setMakeAPICall] = useState(0);

   useEffect(() => {
      const savedThemeIsDark = JSON.parse(localStorage.getItem("isDarkModeEnabled") || "false") === "true";
      const searchHistory: PersonInterface[] = JSON.parse(localStorage.getItem("searchHistory") || "{}");
      setRecentSearches(searchHistory.length ? searchHistory : []);
      setIsDarkModeEnabled(savedThemeIsDark);
      document.body.style.backgroundColor = savedThemeIsDark ? "black" : "white";
   }, []);

   window.onscroll = () => {
      if (
         document.documentElement.scrollHeight - document.documentElement.scrollTop - 400 <=
         document.documentElement.clientHeight
      ) {
         setMakeAPICall(makeAPICall + 1);
      }
   };

   const toggleTheme = () => {
      localStorage.setItem("isDarkModeEnabled", JSON.stringify(!isDarkModeEnabled ? "true" : "false"));
      document.body.style.backgroundColor = !isDarkModeEnabled ? "black" : "white";
      setIsDarkModeEnabled(!isDarkModeEnabled);
   };

   const addNewResults = (newResults: PersonInterface[]) => {
      if (newResults[0].first_name === "reset" && newResults[0].last_name === "it") {
         // hackish way to reset the results hehehe
         setResults([]);
      } else {
         setResults([...results, ...newResults]);
      }
   };

   const addNewRecentSearch = (newSearch: PersonInterface) => {
      setRecentSearches([newSearch, ...recentSearches]);
      localStorage.setItem("searchHistory", JSON.stringify([newSearch, ...recentSearches]));
   };

   return (
      <React.Fragment>
         <Navbar
            isDarkModeEnabled={isDarkModeEnabled}
            toggleTheme={toggleTheme}
            addNewResults={addNewResults}
            setIsSearching={setIsSearching}
            makeAPICall={makeAPICall}
         />
         ;
         <Container style={{ marginTop: "60px" }}>
            {!isSearching ? (
               <div>
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
                        <Button
                           style={{ display: "inline-block" }}
                           variant="contained"
                           color="error"
                           size="small"
                           onClick={(e) => {
                              setRecentSearches([]);
                              localStorage.setItem("searchHistory", JSON.stringify([]));
                           }}
                        >
                           Clear
                        </Button>
                     ) : null}
                  </div>
                  <List>
                     {recentSearches.map((recentSearch, index) => (
                        <>
                           <ListItem key={index} style={{ cursor: "pointer" }}>
                              <div
                                 style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    width: "100%",
                                    alignItems: "center",
                                 }}
                              >
                                 <Stack
                                    direction="row"
                                    alignItems="center"
                                    spacing={2}
                                    width="100%"
                                    onClick={(e) => {
                                       var history = recentSearches;
                                       var removedObj = history.splice(index, 1);
                                       setRecentSearches([removedObj[0], ...history]);
                                       setDetailPerson(recentSearch);
                                       setIsModalOpen(true);
                                    }}
                                 >
                                    <Avatar src={recentSearch.avatar} sx={{ width: 56, height: 56 }} />
                                    <Stack direction="column">
                                       <Stack direction="row" alignItems="center" spacing={1}>
                                          <h3 style={{ color: !isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>
                                             {recentSearch.first_name} {recentSearch.last_name} -
                                          </h3>
                                          <h6 style={{ color: "grey", fontSize: "12px" }}>
                                             {recentSearch.city}, {recentSearch.country}
                                          </h6>
                                       </Stack>
                                       <h5 style={{ color: "grey" }}>@{recentSearch.username}</h5>
                                    </Stack>
                                 </Stack>
                                 <ClearRoundedIcon
                                    onClick={(e) => {
                                       var history = recentSearches;
                                       history.splice(index, 1);
                                       setRecentSearches([...history]);
                                       localStorage.setItem("searchHistory", JSON.stringify([...history]));
                                    }}
                                    style={{ color: isDarkModeEnabled ? "white" : "black" }}
                                 />
                              </div>
                           </ListItem>
                           <Divider color={isDarkModeEnabled ? "#212121" : "#f4f4f4"} />
                        </>
                     ))}
                  </List>
               </div>
            ) : (
               <div>
                  <h3
                     style={{
                        color: !isDarkModeEnabled ? "#000000" : "#FFFFFF",
                        textAlign: "center",
                     }}
                  >
                     {results.length === 0 ? "No such users exist" : ""}
                  </h3>
                  <List>
                     {results.map((result, index) => (
                        <>
                           <ListItem
                              key={index}
                              onClick={(e) => {
                                 addNewRecentSearch(result);
                                 setDetailPerson(result);
                                 setIsModalOpen(true);
                              }}
                              style={{ cursor: "pointer" }}
                           >
                              <Stack direction="row" alignItems="center" spacing={2}>
                                 <Avatar src={result.avatar} sx={{ width: 56, height: 56 }} />
                                 <Stack direction="column">
                                    <Stack direction="row" alignItems="center" spacing={1}>
                                       <h3 style={{ color: !isDarkModeEnabled ? "#000000" : "#FFFFFF" }}>
                                          {result.first_name} {result.last_name} -
                                       </h3>
                                       <h6 style={{ color: "grey", fontSize: "12px" }}>
                                          {result.city}, {result.country}
                                       </h6>
                                    </Stack>
                                    <h5 style={{ color: "grey" }}>@{result.username}</h5>
                                 </Stack>
                              </Stack>
                           </ListItem>
                           <Divider color={isDarkModeEnabled ? "#212121" : "#f4f4f4"} />
                        </>
                     ))}
                  </List>
               </div>
            )}
            <DetailView
               open={isModalOpen}
               handleClose={() => setIsModalOpen(false)}
               person={detailPerson}
               isDarkModeEnabled={isDarkModeEnabled}
            />
         </Container>
      </React.Fragment>
   );
}

export default App;

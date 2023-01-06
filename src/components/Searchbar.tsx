import { Container } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import "../styles/Searchbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PersonInterface from "../interfaces/person";

// https://randomuser.me/api/?page=1&results=10

function SearchBar({
   isDarkModeEnabled,
   addNewResults,
   setIsSearching,
}: {
   isDarkModeEnabled: boolean;
   addNewResults: (newResults: PersonInterface[]) => void;
   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
}) {
   const [search, setSearch] = useState("");
   const [isTyping, setIsTyping] = useState(true);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (search != "") {
            setIsSearching(true);
            // Make API call, parse data into PersonInterface[], call addNewResults
         } else {
            setIsSearching(false);
         }
      }, 250);

      return () => clearTimeout(delayDebounceFn);
   }, [search]);

   const resetState = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setSearch("");
      setIsTyping(false);
      setIsSearching(false);
   };

   return (
      <Container>
         <div className="searchbar" style={{ backgroundColor: isDarkModeEnabled ? "#212121" : "#f4f4f4" }}>
            <SearchRoundedIcon style={{ color: "grey", paddingRight: "6px" }} />
            <input
               autoComplete="off"
               id="search"
               value={search}
               onChange={(e) => setSearch(e.target.value)}
               type="text"
               placeholder="Search Users..."
               style={{ color: isDarkModeEnabled ? "white" : "black" }}
            />
            {search != "" ? (
               <ClearRoundedIcon
                  onClick={(e) => resetState(e)}
                  cursor="pointer"
                  style={{ color: "grey", paddingLeft: "6px" }}
               />
            ) : null}
         </div>
      </Container>
   );
}

export default SearchBar;

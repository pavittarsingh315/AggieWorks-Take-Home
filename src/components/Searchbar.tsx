import { Container } from "@mui/system";
import React, { useState, useEffect, useRef } from "react";
import "../styles/Searchbar.css";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import PersonInterface from "../interfaces/person";
import axios from "axios";

// https://randomuser.me/api/?page=1&results=10

function SearchBar({
   isDarkModeEnabled,
   addNewResults,
   setIsSearching,
   makeAPICall,
}: {
   isDarkModeEnabled: boolean;
   addNewResults: (newResults: PersonInterface[]) => void;
   setIsSearching: React.Dispatch<React.SetStateAction<boolean>>;
   makeAPICall: number;
}) {
   const [search, setSearch] = useState("");
   const [pageNumber, setPageNumber] = useState(1);

   useEffect(() => {
      const delayDebounceFn = setTimeout(() => {
         if (search != "") {
            setIsSearching(true);
            axios
               .get("https://randomuser.me/api/", {
                  params: {
                     page: pageNumber,
                     results: 30,
                     username: search,
                  },
               })
               .then((res) => {
                  setPageNumber(pageNumber + 1);
                  var newResults: PersonInterface[] = [];
                  res.data.results.map((result: any) => {
                     newResults.push({
                        age: result.dob.age,
                        avatar: result.picture.large,
                        city: result.location.city,
                        country: result.location.country,
                        email: result.email,
                        first_name: result.name.first,
                        last_name: result.name.last,
                        gender: result.gender,
                        username: result.login.username,
                        state: result.location.state,
                     });
                  });
                  addNewResults(newResults);
               })
               .catch((e) => {
                  console.log(e);
               });
         } else {
            setPageNumber(1);
            addNewResults([
               {
                  first_name: "reset",
                  last_name: "it",
                  age: "",
                  avatar: "",
                  city: "",
                  country: "",
                  email: "",
                  gender: "",
                  username: "",
                  state: "",
               },
            ]);
            setIsSearching(false);
         }
      }, 250);

      return () => clearTimeout(delayDebounceFn);
   }, [search]);

   // infinite scroll
   useEffect(() => {
      axios
         .get("https://randomuser.me/api/", {
            params: {
               page: pageNumber,
               results: 30,
               username: search,
            },
         })
         .then((res) => {
            setPageNumber(pageNumber + 1);
            var newResults: PersonInterface[] = [];
            res.data.results.map((result: any) => {
               newResults.push({
                  age: result.dob.age,
                  avatar: result.picture.large,
                  city: result.location.city,
                  country: result.location.country,
                  email: result.email,
                  first_name: result.name.first,
                  last_name: result.name.last,
                  gender: result.gender,
                  username: result.login.username,
                  state: result.location.state,
               });
            });
            addNewResults(newResults);
         })
         .catch((e) => {
            console.log(e);
         });
   }, [makeAPICall]);

   const resetState = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
      setSearch("");
      setPageNumber(1);
      addNewResults([
         {
            first_name: "reset",
            last_name: "it",
            age: "",
            avatar: "",
            city: "",
            country: "",
            email: "",
            gender: "",
            username: "",
            state: "",
         },
      ]);
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

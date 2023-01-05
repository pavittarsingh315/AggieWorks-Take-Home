import { useState, useEffect, useRef } from "react";

// https://randomuser.me/api/?page=1&results=10

function SearchBar() {
   const [search, setSearch] = useState("");
   const [isTyping, setIsTyping] = useState(true);
   const [pageNumber, setPageNumber] = useState(1);

   return <h1>Sup</h1>;
}

export default SearchBar;

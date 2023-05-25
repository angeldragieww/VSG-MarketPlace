import {  TextField } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onSearchInputChange: (e: React.FormEvent) => void;
  searchQuery: string
};

const SearchBar = ({ children, onSearchInputChange, searchQuery }: Props) => {

  return (
    <div id="search-container">
      <div className="input-div">
        <a id="searchIconAnchor">
          <svg
            id="searchIcon"
            width={20}
            height={20}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5.55176 8.17578C6.28092 8.17578 6.90072 7.92057 7.41113 7.41016C7.92155 6.89974 8.17676 6.27995 8.17676 5.55078C8.17676 4.82161 7.92155 4.20182 7.41113 3.69141C6.90072 3.18099 6.28092 2.92578 5.55176 2.92578C4.82259 2.92578 4.2028 3.18099 3.69238 3.69141C3.18197 4.20182 2.92676 4.82161 2.92676 5.55078C2.92676 6.27995 3.18197 6.89974 3.69238 7.41016C4.2028 7.92057 4.82259 8.17578 5.55176 8.17578ZM9.05176 8.17578L11.9502 11.0742L11.0752 11.9492L8.17676 9.05078V8.58594L8.0127 8.42188C7.31999 9.02344 6.49967 9.32422 5.55176 9.32422C4.49447 9.32422 3.59668 8.95964 2.8584 8.23047C2.12012 7.5013 1.75098 6.60807 1.75098 5.55078C1.75098 4.49349 2.12012 3.5957 2.8584 2.85742C3.59668 2.11914 4.49447 1.75 5.55176 1.75C6.60905 1.75 7.50228 2.11914 8.23145 2.85742C8.96061 3.5957 9.32519 4.49349 9.32519 5.55078C9.32519 5.93359 9.23405 6.36654 9.05176 6.84961C8.86947 7.33268 8.65983 7.72005 8.42285 8.01172L8.58691 8.17578H9.05176Z"
              fill="black"
            />
          </svg>
        </a>
        <TextField
                id="search"
                label="Search..."
                className="inputField"
                variant="standard"
                value={searchQuery}
                InputLabelProps={{ style: { color: "#9A9A9A" } }}
                onInput={onSearchInputChange}
              />
      </div>
      {children}
    </div>
  );
};
export default SearchBar;

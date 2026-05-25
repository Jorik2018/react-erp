//import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { Wrapper } from "./SearchBox.styles";

const SearchBox = ({
  searchValue,
  setSearchValue,
  handleSearch,
  staticInformation,
  setInformation,
  searchTerm,
  placeHolder,
}): {
  searchValue: string,
  setSearchValue: string,
  handleSearch:(e, staticInformation:string, setInformation:(information:string)=>void, earchTerm:string)=>void,
  staticInformation: string,
  setInformation: (information: string) => void,
  searchTerm: string,
  placeHolder: string,
} => (
    <Wrapper>
      <TextField
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        size="small"
        sx={{
          width: 380,
          boxShadow: "rgba(0, 0, 0, 0.16) 0px 1px 4px",
        }}
        label="جستجو"
        placeholder={placeHolder}
        value={searchValue}
        onChange={(e) => {
          setSearchValue(e.target.value);
          handleSearch(e, staticInformation, setInformation, searchTerm);
        }}
        type="text"
      />
    </Wrapper>
  );

export default SearchBox;

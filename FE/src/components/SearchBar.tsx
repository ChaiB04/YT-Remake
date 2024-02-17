import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [searchString, setSearchString] = useState('');
    const navigate = useNavigate();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchString(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate('results', { state: { searchString: searchString } })
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                id="search-bar"
                className="text"
                variant="outlined"
                placeholder="Search..."
                size="small"
                onChange={handleInputChange}
            />
            <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "white" }} />
            </IconButton>
        </form>
    );
}

export default SearchBar;
import React from "react";

const SearchBar = ({search, setSearch}) => {
    return (
        <div className = "search-bar">
            <input className = "search-input" type="text" placeholder="Поиск по названию..." value = {search} onChange = {(e)=> setSearch(e.target.value)} />
        </div>
    )
}

export default SearchBar;
import React from 'react';
import './searchBar.scss';

export default function SearchBar(props)
{
    return (
        <input 
            className="search"
            key="search-bar-dog"
            value={props.value}
            placeholder="Type Dog Breed"
            onChange={(e) => props.setValue(e.target.value)}
        />
    );
}
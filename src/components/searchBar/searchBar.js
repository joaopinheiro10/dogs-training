import React from 'react';
import './searchBar.scss';

export default function SearchBar(props)
{
    return (
        <input 
            className="search"
            key="search-bar-dog"
            value={props.value}
            placeholder="Enter your dog breed here"
            data-testid="search-bar"
            onChange={(e) => props.setValue(e.target.value)}
        />
    );
}
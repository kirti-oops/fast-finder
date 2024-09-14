import React, { useRef, useState } from 'react';
import { ReactComponent as Magnifier } from '../../assets/magnifier.svg';
import { data } from '../../data';
import './finder.css';

const Finder = () => {
    const [searchInput, setSearchInput] = useState('');
    const [suggestions, setSuggestions] = useState([]);
	const [isFocused, setIsFocused] = useState(false);
	const inputRef = useRef(null);


    // Handle input change and filter data
    const handleInputChange = (e) => {
        const value = e.target.value.toLowerCase();
        setSearchInput(value);

        if (value.length === 0) {
            setSuggestions([]);
            return;
        }

        const filteredSuggestions = data.filter(
            (item) =>
                item.country.toLowerCase().includes(value) ||
                item.capital.toLowerCase().includes(value)
        );
        setSuggestions(filteredSuggestions);
    };

    // Handle click on suggestion (you can modify this to navigate to a detail page or display more data)
    const handleSuggestionClick = (country) => {
        setSearchInput(country);
        setSuggestions([]);
    };

    return (
        <div style={{ width: '100%', maxWidth: 600, margin: '0 auto', padding: '2rem' }}>
            <div className={`input-wrapper ${isFocused ? 'focused' : ''}`}>
                <Magnifier />
                <input
                    className='input'
                    placeholder="Search by country or capital"
                    value={searchInput}
                    onChange={handleInputChange}
                    onClick={() => inputRef.current?.focus()}
                    onFocus={() => {
                        setIsFocused(true);
                    }}
                    onBlur={() => setIsFocused(false)}
                />
            </div>
            {suggestions.length > 0 && (
                <div className='suggestion-wrapper'>
                    {suggestions.map((item, index) => (
                        <div
                            button
                            key={index}
                            onClick={() => handleSuggestionClick(item.country)}
                        >
                            <div className='list' key={`${item.country} - ${item.capital}`} >
                                {`${item.country} - ${item.capital}`}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Finder;

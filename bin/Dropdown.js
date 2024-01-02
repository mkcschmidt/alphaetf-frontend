// src/Dropdown.js
import React from 'react';

const Dropdown = ({ label, options, onSelect }) => {
    return (
        <div className="dropdown">
            <label>{label}</label>
            <select onChange={(e) => onSelect(e.target.value)}>
                {options.map((option, index) => (
                    <option key={index} value={option}>{option}</option>
                ))}
            </select>
        </div>
    );
};

export default Dropdown;

// Add CSS for `.dropdown`, `label`, and `select` to match the design

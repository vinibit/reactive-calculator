import "./Button.css";
import React from 'react';

const Button = ({ onClick, label }) => {
    return (
        <button className="button" onClick={onClick}>
            { label }
        </button>
    );
};

export default Button;
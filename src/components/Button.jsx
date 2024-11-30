import "./Button.css";
import React from 'react';

const Button = ({ click, label, operation, double, triple }) => {   

    return (
        <button 
            className={`
                button
                ${operation ? "operation" : ""}
                ${double ? "double" : ""}
                ${triple ? "triple" : ""}                
            `} 
        onClick={() => click && click(label)}>
            { label }
        </button>
    );
};

export default Button;
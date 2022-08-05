// tools
import React from "react";
import PulseLoader from "react-spinners/PulseLoader";

// styles
import styles from "./styles.sass";



export const Button = (props) => {
    return (
        <button
            type={props.type || 'button'}
            className={`${styles.button} ${props.className == 'text' ? styles.text : styles.filled}`}
            style={props.style || {}}
            disabled={props.disabled || props.loader || false}
            onClick={props.onClick}
        >                
            {
                props.loading ? <PulseLoader color={'#fff'} size={7}/> :
                props.children || props.value || props.title
            }                
        </button>
    )
}



export const Input = (props) => {
    return (
        <div className={`${styles.inputBox} ${props.value ? styles.active : ''} ${props.error ? styles.error : ''}`}>
            <input
                type={props.type || 'text'}
                value={props.value || ''}
                disabled={props.disabled}
                required={props.required}
                onClick={props.onClick}
                onFocus={props.onFocus}
                onChange={(event) => props.onChange(event.target.value)}
                onPaste={(event) => props.onPaste(event.target.value)}
                onBlur={(event) => props.onBlur(event.target.value)}
            />
            <label>{props.label}</label>
        </div>
    )
}

export default Button;
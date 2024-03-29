import React, { forwardRef } from "react"
import PropTypes from "prop-types"

const TextArea = forwardRef(({ 
    autoFocus,
    className, 
    defaultValue, 
    placeholder, 
    value, 
    name, 
    handleChange,
    handleBlur,
    handleFocus
}, ref) => {
    return (
        <textarea
            autoFocus={autoFocus}
            className={className}
            defaultValue={defaultValue}
            name={name}
            ref={ref}
            value={value}
            placeholder={placeholder}
            onChange={handleChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
        />
    )
})

TextArea.propTypes = {
    autoFocus: PropTypes.bool,
    className: PropTypes.string,
    name: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    handleChange: PropTypes.func,
    handleBlur: PropTypes.func,
    handleFocus: PropTypes.func
}

export default TextArea
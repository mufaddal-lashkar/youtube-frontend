import React from "react"

const InputField = ({
    type = "text",
    placeholder = "Enter value here",
    value = "",
    onChange,
    disabled = false,
    required = false
}) => {

    return (
        <>
            <input className="outline-none bg-[#fafafa] w-[60%] h-[30px] rounded-md border-[1px] border-[#ccc] px-2 py-5"
                type={type} 
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                required={required}
            />
        </>
    )
}

export default InputField
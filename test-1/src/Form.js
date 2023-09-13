import { useState } from "react";

const Form = ({ text, setText, onSubmit }) => {
    return (
        <form onSubmit={onSubmit} className="form">
            <input placeholder="Enter task ..."
                value={text}
                onChange={(e) => {
                    setText(e.target.value)
                }}
            />
            <button type="submit" >Submit</button>
        </form>
    );
};

export default Form;

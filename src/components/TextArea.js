import React, { useState } from 'react'
//{useState} --> hooks :it is useful for creating states variables

export default function TextArea(props) {
    let handleUpperCaseClick = () => {
        // console.log("Handle upperCase click");
        let newText = text.toUpperCase();
        setText(newText);
        props.showAlert('Text is converted in to UpperCase!', 'success');
    }
    let handleLowerCaseClick = () => {
        let newText = text.toLowerCase();
        setText(newText);
        props.showAlert('Text is converted in to LowerCase!', 'success');
    }
    let handleClear = () => {
        let newText = '';
        setText(newText);
        props.showAlert('Text is Cleared!', 'success');
    }
    let handleCopy = () => {
        navigator.clipboard.writeText(text);
        props.showAlert('Copied to clipboard!', 'success');
    }
    let handleRemoveExtraSpace = () => {
        let newText = text.split(/[ ]+/);
        setText(newText.join(" "));
        props.showAlert('Text is free from extra space!', 'success');
    }
    let handleOnChange = (event) => {
        // console.log("On change");
        setText(event.target.value);
    }
    //hooks ---> const [text,setText] = userState('string');
    const [text, setText] = useState('');

    return (
        <div className="container" style={{ color: props.mode === 'dark' ? 'white' : '#042743' }}>
            <h1 className='mb-4'>{props.heading}</h1>
            <div className="mb-3">
                <textarea className="form-control" id="myBox" placeholder="Enter Text here..." value={text} onChange={handleOnChange} style={{ backgroundColor: props.mode === 'dark' ? '#13466e' : 'white', color: props.mode === 'dark' ? 'white' : '#042743' }} rows="10"></textarea>
            </div>
            <div className="container-btn">
                <button className="btn btn-primary mx-1" onClick={handleUpperCaseClick}>Convert to UpperCase</button>
                <button className="btn btn-primary mx-1" onClick={handleLowerCaseClick}>Convert to LowerCase</button>
                <button className="btn btn-primary mx-1" onClick={handleClear}>To Clear Text</button>
                <button className="btn btn-primary mx-1" onClick={handleCopy}>To Copy Text</button>
                <button className="btn btn-primary mx-1" onClick={handleRemoveExtraSpace}>To Remove Extra Space</button>
            </div>
            <style jsx="true">{`
                @media (max-width: 480px) {
                .btn {
                    width: 100%;
                    margin: 2px 3px 2px 3px;
                }
            }
            `}</style>
        </div>
    );
}

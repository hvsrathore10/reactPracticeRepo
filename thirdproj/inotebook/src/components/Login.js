import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API Calls : 
        const response = await fetch('http://localhost:2500/api/auth/login', {
            method: "POST", // *like : GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate('/');
            props.showAlert("Login Successfully","success");
        } else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-5'>
            <h1 className='text-center' style={{fontFamily: 'Copperplate, Papyrus, fantasy'}}>iNotebook Login</h1>
            <form onSubmit={handleSubmit} className='container w-50'>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password'/>
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    )
}

export default Login

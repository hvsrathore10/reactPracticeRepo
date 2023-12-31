import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

function Signup(props) {
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: ""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        //API Calls : 
        const response = await fetch('http://localhost:2500/api/auth/createuser', {
            method: "POST", // *like : GET, POST, PUT, DELETE, etc.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password }) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if(json.success){
            localStorage.setItem('token',json.authToken)
            navigate('/');
            props.showAlert('Account Created Successfully',"success");
        } else{
            props.showAlert("Invalid Credentials","danger");
        }
    }
    const onChange = (e)=>{
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    return (
        <div className='container mt-5'>
            <h1 className='text-center' style={{fontFamily: 'Copperplate, Papyrus, fantasy'}}>iNotebook Create Account</h1>
            <form onSubmit={handleSubmit} className='container w-50'>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">User Name</label>
                    <input type="text" className="form-control" id="name" value={credentials.name} onChange={onChange} name='name' required />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" value={credentials.email} onChange={onChange} name='email' aria-describedby="emailHelp" required/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' required minLength={5}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Conform Password</label>
                    <input type="password" className="form-control" id="cpassword" value={credentials.cpassword} onChange={onChange} name='cpassword' required minLength={5}/>
                </div>
                <button type="submit" className="btn btn-primary">Signup</button>
            </form>
        </div>
    )
}

export default Signup

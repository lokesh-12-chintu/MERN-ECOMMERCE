import React, { useState } from 'react';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import "./index.css"

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch();

    const userSignin = (e) => {

        e.preventDefault();

        const user = {
            email, password
        }

        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Redirect to={`/`} />
    }

    return (
        <div className = "container">
            <div className = "sub-container">
            <form className = "form-container" onSubmit = {userSignin} >
                <p className = "signin-para">SIGN IN</p>
                <div>
                    <label htmlFor = "input-1">Email address</label><br/>
                    <input className = "form-control" type = "email" id = "input-1" placeholder = "Enter Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/><br/>
                    <label htmlFor = "input-2">Password</label><br/>
                    <input className = "form-control" type = "password" id = "input-2" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)} /><br/>
                </div>
                <input className = "submit-input" type = "submit" />
            </form>
            </div>
       </div>
    )

}

export default Signin
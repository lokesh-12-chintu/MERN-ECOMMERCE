import "./index.css"
import {login} from "../../actions"
import {useDispatch,useSelector} from "react-redux"
import {useState} from 'react'
import {Navigate} from "react-router-dom"


const Signin = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('  ')
    const [error,setError] = useState('')
    const auth = useSelector(state => state.auth)
    
    const dispatch = useDispatch()

    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email,password
        }
        dispatch(login(user));
    }

    if(auth.authenticate){
        return <Navigate to = {'/'}/>
    }

    return(
        <div>
            <form className = "form-container" onSubmit = {userLogin}>
                    <p className = "signin-para">SIGN IN</p>
                    <div>
                        <label htmlFor = "input-1">Email address</label><br/>
                        <input className = "input" type = "email" id = "input-1" value = {email} onChange = {(e) => setEmail(e.target.value)} placeholder = "Enter Email"/><br/><br/>
                        <label htmlFor = "input-2">Password</label><br/>
                        <input className = "input" type = "password" id = "input-2" value = {password} placeholder = "Password" onChange = {(e) => setPassword(e.target.value)}/><br/><br/>
                     </div>
                    <input className = "submit-input" type = "submit" />
            </form> 
        </div>
    ) 
}

export default Signin
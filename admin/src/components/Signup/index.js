import "./index.css"
import {Navigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {useState} from "react"
import {signup} from "../../actions"

const Signup = () => {

    const auth = useSelector(state => state.auth)
    const [email,setEmail] = useState('') 
    const [password,setPassword] = useState('')
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const user = useSelector(state => state.user)
    const dispatch = useDispatch()

    const userSignup = (e) => {
        e.preventDefault()
        const user = {
            firstName,lastName,email,password
        }
        dispatch(signup(user))
    }

    if(auth.authenticate){
        return <Navigate to = {'/'}/>
    } 

    if(user.loading){
        return <p>Loading...!</p>
    }
 
    return(
        <div>
            {user.message}
            <form className = "form-container" onSubmit = {userSignup} >
                    <p className = "signin-para">SIGN UP</p>
                    <div>
                        <label htmlFor = "input-1">First Name</label><br/>
                        <input className = "input"  id = "input-1" placeholder = "First Name" value = {firstName} onChange = {(e) => setFirstName(e.target.value)}/><br/><br/>
                        <label htmlFor = "input-2">Last Name</label><br/>
                        <input className = "input" id = "input-2" placeholder = "Last Name" value = {lastName} onChange = {(e) => setLastName(e.target.value)}/><br/><br/>
                        <label htmlFor = "input-3">Email address</label><br/>
                        <input className = "input" type = "email" id = "input-3" placeholder = "Enter Email" value = {email} onChange = {(e) => setEmail(e.target.value)}/><br/><br/>
                        <label htmlFor = "input-4">Password</label><br/>
                        <input className = "input" type = "password" id = "input-4" placeholder = "Password" value = {password} onChange = {(e) => setPassword(e.target.value)}/><br/><br/>
                    </div>
                    <input className = "submit-input" type = "submit" />
            </form>
        </div> 
    )
}

export default Signup
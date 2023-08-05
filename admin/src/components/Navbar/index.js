
import "./index.css"
import {Link} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {signout} from "../../actions"

const Navbar = () => {


    const auth = useSelector(state => state.auth); 
    const dispatch = useDispatch()

    const logout = () => {
        dispatch(signout())
    }

    const renderNonLoggedInLinks = () => {
        return( 
            <div className="sub-header">
                <Link to="/signup" className="para">
                    Signup
                </Link>
                <Link to="/signin" className="para">
                    Signin 
                </Link>
            </div>
        )
    }

    const renderLoggedInLinks = () => {
    return(
        <span  className="para" onClick = {logout}>
            Signout
        </span>
    )}

    return(
        <div className = "main-header">
            <ul className = "header">
                <Link className="heading" to="/">
                    <h5>ADMIN DASHBOARD</h5>
                </Link>
                {auth.authenticate ? renderLoggedInLinks():renderNonLoggedInLinks()}
            </ul>
        </div>
    )
}

export default Navbar
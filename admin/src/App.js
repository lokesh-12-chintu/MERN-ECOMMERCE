import './App.css';
import {Route,Routes} from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
// import PrivateRoute from './components/HOC/PrivateRoute';
import {useDispatch,useSelector} from "react-redux"
import {useEffect} from "react"
import {isUserLoggedIn} from "./actions"


const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
  },[])

  return(
    <div>     
      <Navbar/>
      <Routes>
        <Route path = "/" element = {<Home/>}/>
        <Route path = "/signin" element = {<Signin/>}/> 
         <Route path = "/signup" element = {<Signup/>}/> 
      </Routes>
    </div>
  )
}

export default App;

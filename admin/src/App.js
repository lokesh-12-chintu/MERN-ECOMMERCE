import './App.css';
import { useEffect } from 'react';
import {Route,Switch} from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"
import {isUserLoggedIn, getAllCategory,getInitialData} from "./actions"

import Navbar from "./components/Navbar"
import Home from "./components/Home"
import Signin from "./components/Signin"
import Signup from "./components/Signup"
import PrivateRoute from './components/HOC/PrivateRoute';
import Products from './components/Products';
import Orders from './components/Orders';
import Page from './components/Page';
import Category from './components/Category';

const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {
    if(!auth.authenticate){
      dispatch(isUserLoggedIn())
    }
    if(auth.authenticate){
      dispatch(getInitialData());
    }

  },[auth.authenticate])

  return(
    <div>     
      <Navbar/>
      <Switch>
        <PrivateRoute path = "/" exact component = {Home}/>
        <PrivateRoute path = "/page" component = {Page}/>
        <PrivateRoute path="/category" component ={Category} />
        <PrivateRoute path="/products" component ={Products} />
        <PrivateRoute path="/orders" component ={Orders} />
    
        <Route path = "/signin" component = {Signin}/> 
        <Route path = "/signup" component = {Signup}/> 
      </Switch>
    </div>
  )
}

export default App;

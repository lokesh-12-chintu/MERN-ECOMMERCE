import {Switch,Route} from 'react-router-dom'
import HomePage from "./containers/HomePage"
import CartPage from "./containers/CartPage"
import ProductListPage from "./containers/ProductListPage"
import ProductDetailsPage from "./containers/ProductDetailsPage"
import CheckoutPage from './containers/CheckoutPage'
import OrderPage from "./containers/OrderPage";
import OrderDetailsPage from "./containers/OrderDetailsPage";
import {useDispatch,useSelector} from 'react-redux'; 
import {isUserLoggedIn,updateCart} from './actions'
import {useEffect} from 'react'

const App = () => {

  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)

  useEffect(() => {

    if(!auth.authenticate){ 
      dispatch(isUserLoggedIn())
    }
  },[auth.authenticate])


  useEffect(() => { 
    dispatch(updateCart())
  },[auth.authenticate])

  return(
    <div>
     <Switch>
        <Route path = "/" exact component = {HomePage}/>
        <Route path = "/cart" component = {CartPage}/>
        <Route path = '/checkout' component = {CheckoutPage}/>
        <Route path="/account/orders" component={OrderPage} />
        <Route path="/order_details/:orderId" component={OrderDetailsPage} />
        <Route path = "/:productSlug/:productId/p" component = {ProductDetailsPage}/>
        <Route path = "/:slug" component = {ProductListPage}/>
     </Switch> 
   </div>
  )
}

export default App 

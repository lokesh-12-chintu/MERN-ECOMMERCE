import {legacy_createStore as createStore,applyMiddleware} from "redux"
import {composeWithDevTools} from 'redux-devtools-extension'
import rootReducer from "../reducers"
import thunk from "redux-thunk"


const Store = createStore(rootReducer,composeWithDevTools(
    applyMiddleware(thunk)
))


export default Store
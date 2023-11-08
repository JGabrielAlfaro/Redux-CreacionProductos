import { applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit'
import reducer from './reducers'
 
const store = configureStore(
    { reducer },
    compose(applyMiddleware(thunk),
    typeof window === 'object' &&
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
         window.__REDUX_DEVTOOLS_EXTENSION__() : f => f

    )
)

export default store;



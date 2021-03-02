import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';
import rootReducer from "./reducers";

export default function configureStore(initialState?: any) {
  const middlewares = [immutableStateInvariantMiddleware(), thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, initialState, composedEnhancers)

  return store
}
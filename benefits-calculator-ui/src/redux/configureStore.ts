import { applyMiddleware, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import immutableStateInvariantMiddleware from 'redux-immutable-state-invariant';

export default function configureStore(initialState?: any) {
  const middlewares = [immutableStateInvariantMiddleware(), thunkMiddleware]
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(state => state, initialState, composedEnhancers)

  return store
}
import { createStore, combineReducers, applyMiddleware, compose, Middleware, Reducer } from 'redux';
import reduxThunk from 'redux-thunk';
import userReducer, { UserState } from "./modules/user"

export interface IAction<T> {
  type: string,
  payload: T
}

export interface IStoreState {
  user: UserState
}

const reducers: Reducer<IStoreState, IAction<any>> = combineReducers<IStoreState>({
  user: userReducer
})

const middleware: Middleware[] = [reduxThunk];

function createMyStore() {
  // @ts-ignore
  const store = window.__REDUX_DEVTOOLS_EXTENSION__
    ? createStore(
      reducers,
      // @ts-ignore
      compose(applyMiddleware(...middleware), window.__REDUX_DEVTOOLS_EXTENSION__({})),
    )
    : createStore(reducers, applyMiddleware(...middleware));

  return store;
}

const store = createMyStore();

export default store;

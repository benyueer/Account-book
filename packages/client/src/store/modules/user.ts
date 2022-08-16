import { Reducer } from "redux"
import { IAction } from ".."
import LocalStore from "../../utils/store"

const SET_USER_INFO = 'SET USER INFO'

export interface UserState {
  token: String
  id: Number
}

const defaultUser: UserState = {
  token: LocalStore.getVal('token')!,
  id: 0
}

export const setUserInfo: (user: UserState) => IAction<UserState> = (user: UserState) => ({
  type: SET_USER_INFO,
  payload: user,
});

const userReducer: Reducer<UserState, IAction<any>> = (
  state = defaultUser,
  action: IAction<any>
) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_INFO:
      LocalStore.setVal('token', payload.token)
      return {
        ...payload
      }
    default:
      return state

  }
}

export default userReducer
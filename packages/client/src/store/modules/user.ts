import { Reducer } from "redux"
import { IAction } from ".."
import LocalStore from "../../utils/store"

const SET_USER_INFO = 'SET USER INFO'
const USER_LOGOUT = 'USER LOGOUT'

export interface UserState {
  token: String
  id: number
  familyId: number
  name: string
  avatar: string
}

const localUser = LocalStore.getVal<UserState>('USER_INFO')

const defaultUser: UserState = {
  token: LocalStore.getVal('token')!,
  id: 0,
  name: '',
  familyId: 0,
  avatar: '',
  ...localUser
}

export const setUserInfo: (user: Partial<UserState>) => IAction<Partial<UserState>> = (user: Partial<UserState>) => ({
  type: SET_USER_INFO,
  payload: user,
});

export const userLogout = () => ({
  type: USER_LOGOUT,
  payload: null
})

const userReducer: Reducer<UserState, IAction<any>> = (
  state = defaultUser,
  action: IAction<any>
) => {
  const { type, payload } = action

  switch (type) {
    case SET_USER_INFO:
      LocalStore.setVal('USER_INFO', payload)
      return {
        ...payload
      }
    case USER_LOGOUT:
      LocalStore.removeVal('USER_INFO')
      window.location.href = `${window.location.origin}`
      return {
        ...defaultUser
      }
    default:
      return state

  }
}

export default userReducer
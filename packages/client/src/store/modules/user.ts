import { Reducer } from "redux"
import { IAction } from ".."
import { createAction } from 'redux-actions'
import LocalStore from "../../utils/store"
import { client } from "../../utils/apolloClient"
import { GetFamilyMembersDocument, GetFamilyMembersQuery, GetFamilyMembersQueryVariables } from "../../service/graphql/operations/family.generated"

const SET_USER_INFO = 'SET USER INFO'
const USER_LOGOUT = 'USER LOGOUT'
const SET_MEMBERS = 'SET_MEMBERS'

export type Member = Pick<UserState, 'id' | 'name'>
export interface UserState {
  token: String
  id: number
  familyId: number
  name: string
  avatar: string
  members?: Member[]
}

const localUser = LocalStore.getVal<UserState>('USER_INFO')

const defaultUser: UserState = {
  token: LocalStore.getVal('token')!,
  id: 0,
  name: '',
  familyId: 0,
  avatar: '',
  members: [],
  ...localUser
}

export const setMembers = createAction(SET_MEMBERS, async (familyId: number) => {
  const res = await client.query<GetFamilyMembersQuery, GetFamilyMembersQueryVariables>({
    query: GetFamilyMembersDocument,
    variables: { id: familyId }
  })

  return res.data.getFamilyMembers
})

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
    case SET_MEMBERS:
      return {
        ...state,
        members: payload
      }
    default:
      return state

  }
}

export default userReducer
import { Reducer } from "redux"
import { createAction } from 'redux-actions'
import * as Apollo from '@apollo/client'
import { IAction } from ".."
import { IconNames } from "../../components/iconfont"
import { Account, ConsumptionTypeItem } from "../../service/graphql/generated/models"
import { GetConsumptionTypeDocument, GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables } from "../../service/graphql/operations/category.generated"
import { buildCategoryTree } from "../../utils/category"
import { client } from "../../utils/apolloClient"
import { QueryAccountListByUserIdDocument, QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables } from "../../service/graphql/operations/account.generated"

const TIGGER_MAINTABMENU = 'TIGGER_MAINTABMENU'
const SET_CATEGORY = 'SET_CATEGORY'
const SET_ACCOUNT = 'SET_ACCOUNT'

export interface Category extends ConsumptionTypeItem {
  children: Category[]
  icon: IconNames
}

export interface SystemState {
  showMainTabMenu: boolean
  categoryIn: Category[]
  categoryOut: Category[]
  accountList: Account[]
}

const defaultSystemState: SystemState = {
  showMainTabMenu: true,
  categoryIn: [],
  categoryOut: [],
  accountList: []
}

export const tiggerMainTabMenu = (showMainTabMenu: SystemState["showMainTabMenu"]) => ({
  type: TIGGER_MAINTABMENU,
  payload: showMainTabMenu
})



export const setCategory = createAction(SET_CATEGORY, async (familyId: number) => {
  const res = await client.query<GetConsumptionTypeQuery, GetConsumptionTypeQueryVariables>({
    query: GetConsumptionTypeDocument,
    variables: { familyId }
  })

  const data = res.data?.getConsumptionType?.map(({ name, id, pid, baseType, icon }) => ({
    name, id, pid, baseType, children: [], icon
  }))
  return buildCategoryTree(data as any)
})

export const setAccount = createAction(SET_ACCOUNT, async (userId: number) => {
  const res = await client.query<QueryAccountListByUserIdQuery, QueryAccountListByUserIdQueryVariables>({
    query: QueryAccountListByUserIdDocument,
    variables: {
      userId
    }
  })
  return res.data?.queryAccountListByUserId
})

const systemReducer: Reducer<SystemState, IAction<any>> = (
  state = defaultSystemState,
  action: IAction<any>
) => {
  const { type, payload } = action
  switch (type) {
    case TIGGER_MAINTABMENU:
      return {
        ...state,
        showMainTabMenu: payload
      }
    case SET_CATEGORY:
      return {
        ...state,
        ...payload
      }
    case SET_ACCOUNT:
      return {
        ...state,
        accountList: payload
      }
    default:
      return state
  }
}

export default systemReducer
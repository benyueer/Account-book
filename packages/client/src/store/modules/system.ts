import { Reducer } from "redux"
import { IAction } from ".."
import { ConsumptionTypeItem } from "../../service/graphql/generated/models"

const TIGGER_MAINTABMENU = 'TIGGER_MAINTABMENU'
const SET_CATEGORY = 'SET_CATEGORY'

export interface Category extends ConsumptionTypeItem {
  children: Category[]
}

export interface SystemState {
  showMainTabMenu: boolean
  categoryIn: Category[]
  categoryOut: Category[]
}

const defaultSystemState: SystemState = {
  showMainTabMenu: true,
  categoryIn: [],
  categoryOut: []
}

export const tiggerMainTabMenu = (showMainTabMenu: SystemState["showMainTabMenu"]) => ({
  type: TIGGER_MAINTABMENU,
  payload: showMainTabMenu
})

export const setCategory = (categorys: Pick<SystemState, 'categoryIn'|'categoryOut'>) => ({
  type: SET_CATEGORY,
  payload: categorys
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
    default:
      return state
  }
}

export default systemReducer
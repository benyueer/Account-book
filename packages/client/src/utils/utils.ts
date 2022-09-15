import { UserState } from "../store/modules/user"
import LocalStore from "./store"

export const getToken = () => {
  return LocalStore.getVal<UserState>('USER_INFO')?.token
}

export const getUserId = () => {
  return Number(localStorage.getItem('id'))
}

export function arrToTree<T extends {
  children?: T[] | undefined
  id: number | string, [_: string]: any
}>(arr: T[], tag: string) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = i; j < arr.length; j++) {
      if (arr[i].id === arr[j][tag]) {
        if (!arr[i].children) {
          arr[i].children = []
        }
        arr[i].children?.push(arr[j])
      }
    }
  }

  return arr.filter(item => !item.pid)
}
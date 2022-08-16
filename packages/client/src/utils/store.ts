interface ILocalStore {
  setVal(key: string, val: any): ILocalStore
  getVal(key: string): string | null
  removeVal(key: string): ILocalStore
}

function stringify(val: any) {
  return JSON.stringify(val)
}

function parse(val: string) {
  try {
    return JSON.parse(val)
  } catch (e) {
    return null
  }
}

const LocalStore: ILocalStore = {
  setVal(key: string, val: any) {
    localStorage.setItem(key, stringify(val))
    return this
  },
  getVal(key: string) {
    const val = localStorage.getItem(key)
    if (!val) return null
    return parse(val)
  },
  removeVal(key: string) {
    localStorage.removeItem(key)
    return this
  },
}

export default LocalStore
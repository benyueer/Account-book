const mountedVarKeys: string[] = []

export function themeMaster(styleVars: Record<string, string>) {
  mountedVarKeys.forEach(key => document.documentElement.style.removeProperty(key))
  mountedVarKeys.length = 0

  Object.entries(styleVars).forEach(([key, value]) => {
    document.documentElement.style.setProperty(key, value)
    mountedVarKeys.push(key)
  })
}
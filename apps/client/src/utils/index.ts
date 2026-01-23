export function isSuccessReq(code: number) {
  return code === 200 || code === 201 || code === 204 || code === 205 || code === 0
}

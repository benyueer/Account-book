import React from 'react'
import { useLoginMutation, useQueryUserByNameLazyQuery } from '../service/graphql/operations/auth.generated'

export default function Test() {

  const [fetch, result] = useLoginMutation();
  const [queryUser, { loading, data, error, refetch }] = useQueryUserByNameLazyQuery();

  const logout = () => {
    localStorage.removeItem('token')
  }

  const login = async () => {
    const res = await fetch({ variables: { name: 'ads', password: 'qwe' } });
    if (res.data?.login.access_token) {
      localStorage.setItem('token', result.data?.login.access_token as string);
    }
  }

  return (
    <div>
      <button onClick={() => login()}>fetch</button>
      {
        result.data?.login.access_token
      }

      <button onClick={() => refetch({ name: 'ads' } )}>queryUser</button>
      {
        data?.queryUserByName.name
      }
      <button onClick={() => logout()}>logout</button>
    </div>
  )
}

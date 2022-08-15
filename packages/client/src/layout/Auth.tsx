import React from 'react'
import { useLoginMutation } from '../service/graphql/operations/auth.generated';
import { getToken } from '../utils/utils'

export default function Auth(props: { children: any }) {
  const [fetch, result] = useLoginMutation();

  const login = async () => {
    const res = await fetch({ variables: { name: 'ads', password: 'qwe' } });
    console.log(res)
    if (res.data?.login.access_token) {
      console.log(result.data?.login.access_token)
      localStorage.setItem('token', res.data?.login.access_token as string);
    }
  }

  if (getToken()) {
    return props.children
  } else {
    return (
      <>
        <button onClick={() => login()}>fetch</button>

      </>
    )
  }
}

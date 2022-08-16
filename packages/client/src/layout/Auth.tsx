import React from 'react'
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { IRoute } from '../router/config';
import { baseRouters } from '../router/utils';
import { useLoginMutation } from '../service/graphql/operations/auth.generated';
import { getToken } from '../utils/utils'

interface AuthProps extends RouteComponentProps{
  route: IRoute;
  children: Function;
}

export default function Auth(props: AuthProps) {
  console.log(props)


  if (!getToken()) {
    return (
      <Redirect to="/system/login"></Redirect>
    )
  }

  if (props.route.redirect) {
    return (
      <Redirect to={props.route.redirect} push ></Redirect>
    )
  }

  return (
    <>{props.children(props)}</>
  )

}

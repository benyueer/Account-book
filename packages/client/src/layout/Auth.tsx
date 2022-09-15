import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Redirect, Route, RouteComponentProps, Switch } from 'react-router-dom';
import { IRoute } from '../router/config';
import { useQueryByIdLazyQuery } from '../service/graphql/operations/auth.generated';
import { IAction, IStoreState } from '../store';
import { UserState } from '../store/modules/user';
import { getToken, getUserId } from '../utils/utils'

interface AuthProps extends RouteComponentProps {
  route: IRoute;
  children: Function;
  userId: number
}

function Auth(props: AuthProps) {
  const token = getToken();
  if (!token) {
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

export default connect(
  ({ user }: IStoreState) => ({ userId: user.id }),
  { }
)(Auth)

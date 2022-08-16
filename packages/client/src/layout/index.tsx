import React from 'react'
import { Redirect, Route, RouteComponentProps, Router, Switch } from 'react-router-dom'
import Menu from '../components/menu'
import { baseRouters } from '../router/utils'
import Auth from './Auth'
import MenuLayout from './MenuLayout'

export default function Layout(props: RouteComponentProps) {
  return (
    <>
      <Route>
        <Switch>
          {
            baseRouters.map(route => {
              const { path, component: Component } = route
              return <Route
                exact
                path={path}
                key={path}
                render={(rprops: RouteComponentProps) =>
                  <Auth {...rprops} route={route}>
                    {
                      (props: JSX.IntrinsicAttributes) => <MenuLayout {...rprops}><Component {...props}></Component></MenuLayout>
                    }
                  </Auth>
                }
              ></Route>
            })
          }
          <Redirect to="/main/record"></Redirect>
        </Switch>
      </Route>
    </>
  )
}

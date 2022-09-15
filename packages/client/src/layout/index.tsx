import React, { Suspense, useEffect } from 'react'
import { connect } from 'react-redux'
import { Redirect, Route, RouteComponentProps, Router, Switch } from 'react-router-dom'
import Menu from '../components/menu'
import { baseRouters } from '../router/utils'
import Auth from './Auth'
import MenuLayout from './MenuLayout'

export default function Layout(props: RouteComponentProps) {

  return (
    <>
      <MenuLayout {...props}>
        <Suspense fallback={<p>lo</p>}>
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
                          (props: JSX.IntrinsicAttributes) => <Component {...props}></Component>
                        }
                      </Auth>
                    }
                  ></Route>
                })
              }
              <Redirect to="/main/record"></Redirect>
            </Switch>
          </Route>
        </Suspense>
      </MenuLayout>
    </>
  )
}


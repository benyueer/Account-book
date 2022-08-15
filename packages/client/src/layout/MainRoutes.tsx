import React, { Suspense, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'
import { systemRouters } from '../router/utils'

export default function MainRoutes() {
  console.log('ma')
  const routeList = useMemo(() => renderRouterList(), [])

  return (
    <>
      <Suspense fallback={<p>loading</p>}>
        <Switch>
          {
            routeList
          }
        </Switch>
      </Suspense>
    </>
  )
}
function renderRouterList() {
  return systemRouters.map(route => {
    const { path, component: Component } = route;
    // return <Route exact path={path} component={component} key={path}></Route>
    return <Route exact path={path} render={() => <Component></Component>} key={path}></Route>
  })
}


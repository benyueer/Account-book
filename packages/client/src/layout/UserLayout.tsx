import React, { Suspense, useEffect, useMemo } from 'react'
import { Route, Switch } from 'react-router-dom'
import { systemRouters } from '../router/utils'
import MainRoutes from './MainRoutes';


function renderRouterList() {
  return systemRouters.map(route => {
    const { path, component: Component } = route;
    // return <Route exact path={path} component={component} key={path}></Route>
    return <Route exact path={path} render={() => <Component></Component>} key={path}></Route>
  })
}

function UserLayout() {
  console.log('lay', systemRouters[0].path)
  useEffect(() => {
    console.log('er')
  }, [])

  const routeList = useMemo(() => renderRouterList(), [])


  return (
    <>
      <Suspense fallback={<p>loading</p>}>
        <Switch>
          <MainRoutes></MainRoutes>
        </Switch>
      </Suspense>
    </>
  )
}

export default React.memo(UserLayout)


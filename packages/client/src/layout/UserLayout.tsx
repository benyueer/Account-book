import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { systemRouters } from '../router/utils'


function UserLayout() {
  console.log('lay')

  return (
    <>
      <Suspense fallback={<p>loading</p>}>
        <Switch>
          {
            systemRouters.map(route => {
              const { path, component } = route
              console.log(component)
              return <Route
                key={path}
                path={path}
                component={component}
                exact
              ></Route>
            })
          }
        </Switch>
      </Suspense>
    </>
  )
}

export default React.memo(UserLayout)


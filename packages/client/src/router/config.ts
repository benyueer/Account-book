import React from "react"
import Login from "../views/system/Login"

export interface RouteBase {
  path: string
  component?: any
  redirect?: string
  meta: RouteMeta
  auth?: boolean
}

export interface RouteMeta {
  title?: string
  icon?: string
}

export interface IRoute extends RouteBase {
  children?: IRoute[]
}

export const routes: IRoute[] = [
  {
    path: '/system',
    component: React.lazy(() => import('../layout/UserLayout')),
    meta: {},
    redirect: '/system/login',
    children: [
      {
        path: '/system/login',
        component: React.lazy(() => import('../views/system/Login')),
        // component: Login,
        meta: {
          title: 'login'
        }
      }
    ]
  },
]
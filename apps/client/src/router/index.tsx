import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from '../components/AuthGuard'
import { Layout } from '../components/Layout'
import Detail from '../pages/Detail'
import Home from '../pages/Home'
import ImportRecords from '../pages/ImportRecords'
import Login from '../pages/Login'
import Profile from '../pages/Profile'
import Statistics from '../pages/Statistics'

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    element: <AuthGuard />,
    children: [
      {
        path: '/',
        element: <Layout />,
        children: [
          {
            path: '',
            element: <Home />,
            children: [
              {
                path: 'detail/:id',
                element: <Detail />,
              },
            ],
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'import-records',
                element: <ImportRecords />,
              },
            ],
          },
        ],
      },
    ],
  },
])

import { createBrowserRouter } from 'react-router-dom'
import { AuthGuard } from '../components/AuthGuard'
import { Layout } from '../components/Layout'
import Cards from '../pages/Cards'
import Detail from '../components/Home/Detail'
import Home from '../pages/Home'
import ImportRecords from '../pages/ImportRecords'
import Ledgers from '../pages/Ledgers'
import LedgerDetail from '../pages/Ledgers/Detail'
import LedgerTransactions from '../pages/Ledgers/Transactions'
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
          },
          {
            path: 'statistics',
            element: <Statistics />,
          },
          {
            path: 'ledgers',
            children: [
              { path: '', element: <Ledgers /> },
              { path: ':id', element: <LedgerDetail /> },
              { path: ':id/transactions', element: <LedgerTransactions /> },
            ],
          },
          {
            path: 'profile',
            element: <Profile />,
            children: [
              {
                path: 'import-records',
                element: <ImportRecords />,
              },
              {
                path: 'cards',
                element: <Cards />,
              },
            ],
          },
        ],
      },
    ],
  },
])

import React from 'react'
import { RouteComponentProps, useLocation, useRouteMatch } from 'react-router-dom'
import { Badge, TabBar } from 'antd-mobile'
import styles from './styles.module.less'
import {
  EditSOutline,
  HistogramOutline,
  ContentOutline,
  UserOutline,
} from 'antd-mobile-icons'

export default function Menu(props: RouteComponentProps) {
  const { pathname } = useLocation()

  const tabs = [
    {
      key: '/main/record',
      title: '记录',
      icon: <EditSOutline />,
      badge: Badge.dot,
    },
    {
      key: '/main/details',
      title: '详情',
      icon: <ContentOutline />,
      badge: '5',
    },
    {
      key: '/main/statistics',
      title: '统计',
      icon: <HistogramOutline />,
      badge: '99+',
    },
    {
      key: '/main/user',
      title: '我的',
      icon: <UserOutline />,
    },
  ]

  const setRouteActive = (value: string) => {
    props.history.push(value)
  }

  return (
    <div className={styles.main}>
      <TabBar activeKey={pathname} onChange={(val: string) => setRouteActive(val)} >
        {
          tabs.map(tab => (
            <TabBar.Item key={tab.key} icon={tab.icon} title={tab.title}></TabBar.Item>
          ))
        }
      </TabBar>
    </div>
  )
}

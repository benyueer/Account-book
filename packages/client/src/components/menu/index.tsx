import React from 'react'
import { RouteComponentProps, useRouteMatch } from 'react-router-dom'
import styles from './styles.module.less'

export default function Menu(props: RouteComponentProps) {
  const { url } = useRouteMatch()

  const goto = (path: string) => {
    if (url === path) return
    props.history.push(path)
  }

  return (
    <div className={styles.main}>
      <div className={styles.meunItem} onClick={() => goto('/main/record')}>记录</div>
      <div className={styles.meunItem} onClick={() => goto('/main/details')}>详情</div>
      <div className={styles.meunItem} onClick={() => goto('/main/statistics')}>统计</div>
      <div className={styles.meunItem} onClick={() => goto('/main/user')}>我的</div>
    </div>
  )
}

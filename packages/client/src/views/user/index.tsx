import { Avatar, Button, Popover } from 'antd-mobile'
import React from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../../store'
import { tiggerMainTabMenu } from '../../store/modules/system'
import { userLogout, UserState } from '../../store/modules/user'
import { SetOutline } from 'antd-mobile-icons'
import styles from './styles.module.less'
import { Action } from 'antd-mobile/es/components/popover'

interface UserProps {
  showMainTabMenu: boolean,
  tiggerMainTabMenu: (showMainTabMenu: boolean) => void
  userLogout: () => void
  user: UserState
}

const actions: Action[] = [
  { key: 'logout', text: '退出登录' }
]

function User(props: UserProps) {

  const settingAction = (item: Action) => {
    switch (item.key) {
      case 'logout':
        return props.userLogout()
    }
  }

  return (
    <div className={styles.main}>
      <div className={styles.headerBox}>
        <div className={styles.infoBox}>
          <div className={styles.userInfoBox}>
            <Avatar src='' className={styles.avatar}></Avatar>
            <span className={styles.userName}>{props.user.name}</span>
          </div>
          <div className={styles.setting}>
          <Popover.Menu
            actions={actions}
            placement='bottom-end'
            onAction={settingAction}
            trigger="click"
          >
            <SetOutline />
          </Popover.Menu>
          </div>
        </div>
        <div className={styles.dataBox}>

        </div>
      </div>
    </div>
  )
}

export default connect(
  ({ system, user }: IStoreState) => ({ showMainTabMenu: system.showMainTabMenu, user }),
  { tiggerMainTabMenu, userLogout }
)(User)
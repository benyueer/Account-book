import React, { useState } from 'react'
import Tabs from '../../components/tab'
import TabPane from '../../components/tab/tabPane'
import Flow from './components/flow'
import styles from './styles.module.less'



export default function Detail() {

  const [state, setState] = useState({
    activeKey: 'flow'
  })

  const onActiveKeyChnage = (key: React.Key | null) => {
    setState(() => ({
      activeKey: key as string
    }))
  }

  return (
    <div className={styles.main}>
      <div className={styles.tabWrap}>
        <Tabs activeKey={state.activeKey} onChange={onActiveKeyChnage}>
          <TabPane label="流水" key="flow">
            <Flow></Flow>
          </TabPane>
          <TabPane label="账户" key="account"><input></input></TabPane>
          <TabPane label="成员" key="member">gtrh</TabPane>
        </Tabs>
      </div>

    </div>
  )
}

import React, { useCallback, useMemo } from 'react'
import styles from './tab.module.less'

interface TabProps {
  activeKey: string
  children: JSX.Element[]
  onChange: (key: React.Key | null) => void
}

export default function Tabs(props: TabProps) {
  console.log(props)

  const tabPanes = props.children.map(tabPane => ({
    label: tabPane.props.label,
    key: tabPane.key,
    content: tabPane.props.children
  }))

  const tabClickHandler = (key: React.Key | null) => {
    if (key === props.activeKey) return
    props.onChange(key)
  }

  const targetIndex = tabPanes.findIndex(tabPane => tabPane.key === props.activeKey)

  return (
    <div className={styles.main}>
      <div className={styles.tabNav}>
        {
          tabPanes.map(tabPane => <div
            key={tabPane.key}
            onClick={() =>
              tabClickHandler(tabPane.key)
            }
            className={`${styles.tabItem} ${props.activeKey === tabPane.key ? styles.activeTab : ''}`}
          >{tabPane.label}</div>)
        }
      </div>
      <div className={styles.tabContent} style={{ marginLeft: `-${100 * targetIndex}%` }}>
        {
          tabPanes.map((tabPane, index) => React.createElement('div', {
            className: styles.paneItem,
            key: tabPane.key
          },
            tabPane.content
          ))
        }
      </div>
    </div>
  )
}

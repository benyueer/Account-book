import React from 'react'

interface TabPaneProps {
  label: string
  // tabKey: string
  children?: any
}

export default function TabPane(props: TabPaneProps) {
  console.log('pane')
  return (
    <div>TabPane</div>
  )
}

import React from 'react'
import { RouteComponentProps } from 'react-router-dom'
import Menu from '../components/menu'
interface MenuLayoutProps extends RouteComponentProps {
  children: any
}

export default function MenuLayout(props: MenuLayoutProps) {
  return (
    <>
      <Menu {...props}></Menu>
      {props.children}
    </>
  )
}

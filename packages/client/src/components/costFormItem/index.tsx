import React, { Fragment, ReactElement, ReactNode } from 'react'
import IconFont, { IconNames } from '../iconfont'
import styles from './styles.module.less'

export interface CostFormItemProps {
  icon: IconNames
  label: string
  children: ReactElement
  value?: any
  onChange?: (val: any) => void
}

export default function CostFormItem(props: CostFormItemProps) {
  console.log(props.children?.props)
  const childProps = Object.assign({}, props.children.props)
  childProps.value = props.value
  childProps.onChange = props.onChange

  return (
    <div className={styles.main}>
      <div className={styles.iconBox}>
        <IconFont name={props.icon}></IconFont>
      </div>
      <div className={styles.labelBox}>{props.label}</div>
      <div className={styles.mainContext}>
        {React.cloneElement(props.children, childProps)}
      </div>
    </div>
  )
}

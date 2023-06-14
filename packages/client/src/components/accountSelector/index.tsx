import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Account } from '../../service/graphql/generated/models'
import { IStoreState } from '../../store'
import { setAccount } from '../../store/modules/system'
import BasePopup, { BasePopupRef } from '../basePopup'
import IconFont from '../iconfont'
import styles from './styles.module.less'
import { CheckOutline } from 'antd-mobile-icons'

interface AccountSelectorProps {
  accountId?: number
  accountList: Account[]
  setAccount: typeof setAccount
  userId: number
  onChange?: (id: number) => void
}

function AccountSelector(props: AccountSelectorProps) {

  const [state, setState] = useState({
    accountId: 0,
    accountName: ''
  })

  useEffect(() => {
    if (!props.accountList.length) {
      props.setAccount(props.userId)
      return
    }

    const curAccount = props.accountList.filter(account => account.id === props.accountId)[0] || props.accountList[0]
    const { id, name } = curAccount
    setState({
      accountId: id,
      accountName: name
    })

  }, [props.accountId, props.accountList])

  const ref = useRef<BasePopupRef>(null)

  const changeCurAccount = (account: Account) => {
    const { id, name } = account
    setState({
      accountId: id,
      accountName: name
    })

    props.onChange?.(id)
  }

  return (
    <BasePopup ref={ref}>
      {{
        base: <span onClick={() => ref.current?.open()}>{state.accountName}</span>,
        popupContent: <div className={styles.main}>
          {
            props.accountList.map(account =>
              <div className={styles.accountItem} key={account.id} onClick={() => changeCurAccount(account)}>
                <IconFont name="chongwu" size={30} className={styles.iconBox}></IconFont>
                <div className={styles.accountInfo}>
                  <span className={styles.accountName}>{account.name}</span>
                  <span className={styles.accountOverag}>{account.overage}</span>
                </div>
                <div className={styles.selectWrap}>
                  {
                    state.accountId === account.id && <CheckOutline color='var(--adm-color-danger)' />
                  }
                </div>
              </div>
            )
          }
        </div>
      }}
    </BasePopup>
  )
}

export default connect(
  ({ system, user }: IStoreState) => ({
    accountList: system.accountList,
    userId: user.id
  }),
  {
    setAccount
  }
)(AccountSelector)

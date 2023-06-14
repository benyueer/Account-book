import React, { useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { IStoreState } from '../../store'
import { Member, setMembers, UserState } from '../../store/modules/user'
import BasePopup, { BasePopupRef } from '../basePopup'
import { CheckOutline } from 'antd-mobile-icons'
import styles from './styles.module.less'
import { Space, Tag } from 'antd-mobile'

interface MemberSelectorProps {
  members?: Member[]
  familyId: number
  curUserId: number
  setMembers: typeof setMembers
  onChange?: (val: number[]) => void
}

function MemberSelector(props: MemberSelectorProps) {
  const [members, setMembers] = useState<number[]>([])

  useEffect(() => {
    if (!props.members?.length) {
      props.setMembers(props.familyId)
      return
    }
  }, [props.members])

  const ref = useRef<BasePopupRef>(null)

  const triggerMember = (member: Member) => {
    const ind = members.indexOf(member.id)
    let newMembers = []
    if (ind !== -1) {
      members.splice(ind, 1)
      newMembers = [...members]
    } else {
      newMembers = [...members, member.id]
    }
    setMembers([...newMembers])
    props.onChange?.(newMembers)
  }

  return (
    <BasePopup ref={ref}>
      {{
        base: <Space className={styles.memberWrap} onClick={ref.current?.open}>
          {
            !!members.length ?
              members.map(member => <Tag color="primary" fill='outline' className={styles.barItem} key={member}>
                {
                  member === props.curUserId ? '我' : props.members?.filter(mem => mem.id === member)[0].name
                }
              </Tag>)
              :
              '无成员'
          }
        </Space>,
        popupContent: <div className={styles.main}>
          {
            props.members?.map(member => <div className={styles.memberItem} onClick={() => triggerMember(member)} key={member.id}>
              <div className={styles.memberName}>
                {
                  member.id === props.curUserId ?
                    '我' : member.name
                }
              </div>
              <div className={styles.memberSelect}>
                {
                  members.includes(member.id) && <CheckOutline color='var(--adm-color-danger)' />
                }
              </div>
            </div>)
          }
        </div>
      }}
    </BasePopup>
  )
}

export default connect(
  ({ user }: IStoreState) => ({
    members: user.members,
    familyId: user.familyId,
    curUserId: user.id
  }),
  {
    setMembers
  }
)(MemberSelector)

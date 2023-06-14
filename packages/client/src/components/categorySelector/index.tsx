import { Popup } from 'antd-mobile'
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Base_Type } from '../../service/graphql/generated/models'
import { IStoreState } from '../../store'
import { setCategory, SystemState } from '../../store/modules/system'
import { findTreeNodeById } from '../../utils/category'
import BasePopup, { BasePopupRef } from '../basePopup'
import IconFont from '../iconfont'
import styles from './styles.module.less'

interface CategorySelectorProps extends Omit<SystemState, 'showMainTabMenu'|'accountList'> {
  defaultCateGoryId?: number
  categoryBaseType?: Base_Type
  setCategory: (familyId: number) => any
  familyId: number
  onChange?: (id: number) => void
}

function CategorySelector(props: CategorySelectorProps) {

  console.log('CategorySelector')

  const [state, setState] = useState({
    firstName: '',
    secondName: '',
    categoryId: 0,
  })

  const setText = (categoryId: number) => {
    const res = findTreeNodeById(props.categoryBaseType === Base_Type.In ? props.categoryIn : props.categoryOut, categoryId)
    if (res.length) {
      setState((state) => ({
        ...state,
        firstName: res[0].name,
        secondName: res[1].name
      }))
    }
  }

  useEffect(() => {
    async function init() {
      if (!props.categoryIn.length || !props.categoryOut.length) {
        props.setCategory(props.familyId)
        return
      }

      if (props.defaultCateGoryId) {
        setState({
          ...state,
          categoryId: props.defaultCateGoryId
        })
        setText(props.defaultCateGoryId)
      }
    }
    init()
  }, [props.defaultCateGoryId, props.categoryIn, props.categoryOut])

  const usedTree = useMemo(() => {
    return props.categoryBaseType === Base_Type.In ? props.categoryIn : props.categoryOut
  }, [props.categoryBaseType, props.categoryIn, props.categoryOut])


  const childNodeClick = (categoryId: number, e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    setState({
      ...state,
      categoryId
    });

    props.onChange?.(categoryId)
    setText(categoryId)
  }

  const popupRef = useRef<BasePopupRef>(null)

  const baseLabelClickHandler = useCallback(() => {
    popupRef.current?.open()
  }, [popupRef])



  return (
    <BasePopup ref={popupRef}>
      {{
        base: <span onClick={baseLabelClickHandler}>{state.firstName} - {state.secondName}</span>,
        popupContent: <div className={styles.popupContext}>
          {
            usedTree.map(fatherNode => {
              return <div key={fatherNode.id} className={styles.fatherCategoryWrap}>
                <span className={styles.fatherCategoryTitle}>{fatherNode.name}</span>
                <div className={styles.fatherCategoryContext}>
                  {
                    fatherNode.children.map(childNode => {
                      return <span
                        key={childNode.id}
                        className={`${styles.childNode} ${state.categoryId === childNode.id ? styles.childNodeActive : ''}`}
                        onClick={(e) => childNodeClick(childNode.id, e)}
                      >
                        <div className={styles.childNodeWrap}>
                          <div className={styles.childIcon}>
                            <IconFont name={childNode.icon} size={25} className={styles.icon}></IconFont>
                          </div>
                          <div className={styles.childTitle}>{childNode.name}</div>
                        </div>
                      </span>
                    })
                  }
                </div>
              </div>
            })
          }
        </div>
      }}
    </BasePopup>
  )
}

export default connect(
  ({ system, user }: IStoreState) => ({
    categoryIn: system.categoryIn,
    categoryOut: system.categoryOut,
    familyId: user.familyId
  }),
  {
    setCategory
  }
)(memo(CategorySelector))
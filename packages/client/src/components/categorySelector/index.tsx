import { Popup } from 'antd-mobile'
import React, { useEffect, useMemo, useState } from 'react'
import { connect } from 'react-redux'
import { Base_Type } from '../../service/graphql/generated/models'
import { useGetConsumptionTypeLazyQuery } from '../../service/graphql/operations/category.generated'
import { IStoreState } from '../../store'
import { setCategory, SystemState } from '../../store/modules/system'
import { buildCategoryTree, findTreeNodeById } from '../../utils/category'
import IconFont from '../iconfont'
import styles from './styles.module.less'

interface CategorySelectorProps extends Omit<SystemState, 'showMainTabMenu'> {
  defaultCateGoryId: number
  categoryBaseType: Base_Type
  setCategory: typeof setCategory
  familyId: number
}

function CategorySelector(props: CategorySelectorProps) {

  console.log('CategorySelector')

  const [queryCategorys, { data, loading, error }] = useGetConsumptionTypeLazyQuery()

  const initCategory = async () => {
    const res = await queryCategorys({ variables: { familyId: props.familyId } })
    const data = res.data?.getConsumptionType?.map(({ name, id, pid, baseType }) => ({
      name, id, pid, baseType, children: []
    }))
    const trees = buildCategoryTree(data as any)
    props.setCategory(trees)
  }

  useEffect(() => {
    async function init() {
      if (!props.categoryIn.length || !props.categoryOut.length) {
        await initCategory()
      }

      if (props.defaultCateGoryId) {
        const res = findTreeNodeById(props.categoryBaseType === Base_Type.In ? props.categoryIn : props.categoryOut, props.defaultCateGoryId)
        if (res.length) {
          setState({
            ...state,
            firstName: res[0].name,
            secondName: res[1].name
          })
        }
      }
    }
    init()
  }, [props.defaultCateGoryId, props.categoryIn, props.categoryOut])

  const usedTree = useMemo(() => {
    return props.categoryBaseType === Base_Type.In ? props.categoryIn : props.categoryOut
  }, [props.categoryBaseType, props.categoryIn, props.categoryOut])

  const [state, setState] = useState({
    firstName: '',
    secondName: '',
    categoryId: props.defaultCateGoryId || 0,
    visible: false
  })
  return (
    <div className={styles.main} onClick={() => {
      setState({
        ...state,
        visible: true
      })
    }}>
      <span>{state.firstName} - {state.secondName}</span>
      <Popup
        visible={state.visible}
        onMaskClick={() => {
          setState({
            ...state,
            visible: false
          })
        }}
      >
        <div className={styles.popupContext}>
          {
            usedTree.map(fatherNode => {
              return <div key={fatherNode.id} className={styles.fatherCategoryWrap}>
                <span className={styles.fatherCategoryTitle}>{fatherNode.name}</span>
                <div className={styles.fatherCategoryContext}>
                  {
                    fatherNode.children.map(childNode => {
                      return <span key={childNode.id} className={`${styles.childNode} ${state.categoryId === childNode.id ? styles.childNodeActive : ''}`}>
                        <div className={styles.childNodeWrap}>
                          <div className={styles.childIcon}>
                            <IconFont name='baozhi' size={25} className={styles.icon}></IconFont>
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
      </Popup>
    </div>
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
)(CategorySelector)
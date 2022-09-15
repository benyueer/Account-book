import React from 'react'
import { Button, Form, Input, Tabs } from 'antd-mobile'
import styles from './styles.module.less'
import { IconBaozhi } from '../../components/iconfont'
import CategorySelector from '../../components/categorySelector'
import { Base_Type } from '../../service/graphql/generated/models'

const tabList = [
  { title: '支出', key: 'out' },
  { title: '收入', key: 'in' },
  // { title: '', key: '' },
  // { title: '', key: '' },
]

export default function Base() {
  const [form] = Form.useForm()
  form.setFields([{name: 'img', value: ''}])

  return (
    <div className={styles.main}>
      <p className={styles.pageTitle}>记一记</p>
      <div className={styles.tabWrap}>
        <Tabs>
          {
            tabList.map(tab => <Tabs.Tab {...tab} />)
          }
        </Tabs>
      </div>
      <div className={styles.formWrap}>
        <Form
          form={form}
          initialValues={{
            cost: 0
          }}
        >
          <Form.Item
            name="cost"
          >
            <Input 
              type="number" 
              min={0}
              step={0.01}
              className={styles.costInput}
            ></Input>
          </Form.Item>
          <CategorySelector
            categoryBaseType={Base_Type.Out}
            defaultCateGoryId={33}
          ></CategorySelector>
        </Form>

      </div>
    </div>
  )
}

import React, { memo, RefObject, useState } from 'react'
import { Button, DatePicker, Form, Input, Tabs, TextArea } from 'antd-mobile'
import styles from './styles.module.less'
import dayjs from 'dayjs'
import { CheckOutline } from 'antd-mobile-icons'
import { IconBaozhi } from '../../components/iconfont'
import CategorySelector from '../../components/categorySelector'
import { Base_Type } from '../../service/graphql/generated/models'
import CostFormItem from '../../components/costFormItem'
import AccountSelector from '../../components/accountSelector'
import MemberSelector from '../../components/memberSelector'
import { DatePickerRef } from 'antd-mobile/es/components/date-picker'

const tabList = [
  { title: '支出', key: 'out' },
  { title: '收入', key: 'in' },
  // { title: '', key: '' },
  // { title: '', key: '' },
]

function Base() {
  console.log(111111)
  const [form] = Form.useForm()
  form.setFields([
    { name: 'img', value: '' },
    { name: 'cost', value: 33 },
    { name: 'categoryId', value: 33 },
    { name: 'accountId', value: 0 },
    { name: 'members', value: [] },
    { name: 'date', value: new Date() },
    { name: 'remark', value: '' },
  ])

  const [curType, setType] = useState(Base_Type.Out)

  const submit = async () => {
    try {
      await form.validateFields()
      const formData = form.getFieldsValue()
      console.log(formData)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <div className={styles.main}>
      <p className={styles.pageTitle}>记一记</p>
      <Button 
        color='warning' 
        className={styles.submitBtn} 
        size='small' 
        shape='rounded'
        onClick={submit}
      ><CheckOutline /></Button>
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
          <Form.Item
            name="categoryId"
          >
            <CostFormItem
              icon="shou"
              label='分类'
            >
              <CategorySelector
                categoryBaseType={curType}
                defaultCateGoryId={form.getFieldValue('categoryId')}
              ></CategorySelector>
            </CostFormItem>
          </Form.Item>
          <Form.Item
            name="accountId"
          >
            <CostFormItem
              icon="zhanghu"
              label="账户"
            >
              <AccountSelector></AccountSelector>
            </CostFormItem>
          </Form.Item>
          <Form.Item
            name="date"
            trigger='onConfirm'
            arrow={false}
            onClick={(e, datePickerRef: RefObject<DatePickerRef>) => {
              datePickerRef.current?.open()
            }}
          >
            <DatePicker>
              {value =>
                <CostFormItem
                  icon="shijian"
                  label='时间'
                >
                  <div>
                    {
                      value ? dayjs(value).format('YYYY-MM-DD') : 'Please select'
                    }
                  </div>
                </CostFormItem>
              }
            </DatePicker>
          </Form.Item>
          <Form.Item
            name="members"
            rules={[{required: true, message: '请选择成员'}]}
          >
            <CostFormItem
              icon="chengyuan"
              label="成员"
            >
              <MemberSelector></MemberSelector>
            </CostFormItem>
          </Form.Item>
          <Form.Item
            name="remark"
          >
            <CostFormItem
              icon="beizhu"
              label="备注"
            >
              <Input placeholder='...'></Input>
            </CostFormItem>
          </Form.Item>
        </Form>
      </div>
    </div >
  )
}

export default memo(Base)
import React, { useState } from 'react'
import { connect } from 'react-redux';
import styles from './login.module.less'
import { Button, Form, Input, Toast } from 'antd-mobile'
import { useLoginMutation } from '../../service/graphql/operations/auth.generated'
import { setUserInfo, UserState } from '../../store/modules/user';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { getToken } from '../../utils/utils';

interface LoginProps extends RouteComponentProps {
  setUserInfo: (userInfo: UserState) => void;
}


function Login(props: LoginProps) {
  console.log('login')

  const [form] = Form.useForm()

  const onSubmit = async () => {
    try {

      const data = await form.validateFields()
      console.log(data)
      const res = await loginFetch({variables: data})
      if (res.data?.login.access_token) {
        Toast.show({
          icon: 'success',
          content: '登录成功',
        })
        const {id, access_token, familyId, name, avatar} = res.data.login
        props.setUserInfo({
          id: id as number, token: access_token, familyId: familyId as number,
          name: name as string,
          avatar: avatar as string
        })
        props.history.push('/')
      } else {
        Toast.show({
          icon: 'fail',
          content: '密码错误',
        })
      }

    } catch (e) {
      console.log(e)
    }
  }

  const [loginFetch, { data, error, loading }] = useLoginMutation()

  if (getToken()) {
    return (
      <Redirect to="/main"></Redirect>
    )
  }

  return (
    <div className={styles.main}>
      <Form
        form={form}
        layout='vertical'
        mode='card'
        footer={
          <Button block type='submit' color='primary' size='large' onClick={onSubmit} loading={loading}>登录</Button>
        }
      >
        <Form.Header><span className={styles.title}>登录</span></Form.Header>
        <Form.Item
          name="name"
          label="姓名"
          rules={[{ required: true, message: '请输入姓名' }]}
        >
          <Input></Input>
        </Form.Item>
        <Form.Item
          name="password"
          label="密码"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input></Input>
        </Form.Item>
      </Form>
    </div>
  )
}

export default connect(() => ({}), {
  setUserInfo
})(Login)
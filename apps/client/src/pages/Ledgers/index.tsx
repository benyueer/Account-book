import type { Ledger } from '@account-book/types'
import { Form, Input, Modal, PullToRefresh, Toast } from 'antd-mobile'
import { motion } from 'framer-motion'
import { Book, ChevronRight, Plus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ledgerApi } from '../../api/ledger'

export default function Ledgers() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [createVisible, setCreateVisible] = useState(false)
  const [form] = Form.useForm()

  const { data: ledgers, isLoading, refetch } = useQuery({
    queryKey: ['ledgers'],
    queryFn: ledgerApi.findAll,
  })

  const { mutate: createLedger, isPending } = useMutation({
    mutationFn: ledgerApi.create,
    onSuccess: () => {
      Toast.show({ icon: 'success', content: '创建成功' })
      setCreateVisible(false)
      form.resetFields()
      queryClient.invalidateQueries({ queryKey: ['ledgers'] })
    },
    onError: () => {
      Toast.show({ icon: 'fail', content: '创建失败' })
    },
  })

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="h-screen overflow-y-auto p-4 bg-slate-50/50"
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl text-slate-800 font-bold">我的账本</h1>
        <div
          onClick={() => setCreateVisible(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-500 rounded-full shadow-sm text-sm font-medium text-white active:scale-95 transition-transform cursor-pointer"
        >
          <Plus size={16} />
          <span>新建账本</span>
        </div>
      </div>

      <PullToRefresh onRefresh={async () => { await refetch() }}>
        {ledgers && ledgers.length > 0 ? (
          <div className="flex flex-col gap-4">
            {ledgers.map((ledger: Ledger) => (
              <motion.div
                key={ledger.id}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate(`/ledgers/${ledger.id}`)}
                className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4 cursor-pointer hover:border-indigo-200 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-500">
                  <Book size={24} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-slate-800 font-bold text-lg truncate">{ledger.name}</div>
                  <div className="text-slate-400 text-sm truncate">{ledger.description || '暂无描述'}</div>
                </div>
                <ChevronRight size={20} className="text-slate-300" />
              </motion.div>
            ))}
            <div className="h-32" />
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-400">
               <Book size={64} className="mb-4 opacity-20" />
               <p>还没有账本，创建一个吧</p>
            </div>
          )
        )}

        {isLoading && (
          <div className="flex flex-col gap-4">
             {[1, 2, 3].map(i => (
               <div key={i} className="h-20 bg-white rounded-2xl animate-pulse" />
             ))}
          </div>
        )}
      </PullToRefresh>

      <Modal
        visible={createVisible}
        title="新建账本"
        content={
          <Form form={form} layout="vertical">
            <Form.Item label="名称" name="name" rules={[{ required: true, message: '请输入账本名称' }]}>
              <Input placeholder="例如: 装修账本" />
            </Form.Item>
            <Form.Item label="描述" name="description">
              <Input placeholder="可选" />
            </Form.Item>
          </Form>
        }
        actions={[
          { key: 'cancel', text: '取消', onClick: () => setCreateVisible(false) },
          { key: 'confirm', text: '创建', primary: true, disabled: isPending },
        ]}
        onAction={(action) => {
          if (action.key === 'confirm') {
            form.validateFields().then(values => {
              createLedger(values)
            })
          }
        }}
        onClose={() => setCreateVisible(false)}
      />
    </motion.div>
  )
}

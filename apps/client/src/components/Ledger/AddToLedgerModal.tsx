import { Button, CheckList, Modal, Toast } from 'antd-mobile'
import { useState, useCallback } from 'react'
import { useQuery } from '@tanstack/react-query'
import { ledgerApi } from '../../api/ledger'

interface AddToLedgerModalProps {
  visible: boolean
  onClose: () => void
  transactionIds: string[]
  onSuccess?: () => void
}

export function AddToLedgerModal({ visible, onClose, transactionIds, onSuccess }: AddToLedgerModalProps) {
  const [selectedLedgerId, setSelectedLedgerId] = useState<string>('')
  const [submitting, setSubmitting] = useState(false)

  const { data: ledgers, isLoading } = useQuery({
    queryKey: ['ledgers'],
    queryFn: ledgerApi.findAll,
    enabled: visible,
  })

  const handleAdd = useCallback(async () => {
    if (!selectedLedgerId) {
      Toast.show({ content: '请选择一个账本', position: 'bottom' })
      return
    }

    setSubmitting(true)
    try {
      const res = await ledgerApi.addTransactions(selectedLedgerId, { transactionIds })
      Toast.show({
        content: `成功添加 ${res.added} 条记录${res.skipped > 0 ? `，跳过 ${res.skipped} 条重复记录` : ''}`,
        icon: 'success',
      })
      onSuccess?.()
      onClose()
    }
    catch (error) {
      Toast.show({ content: '添加失败，请稍后重试', icon: 'fail' })
    }
    finally {
      setSubmitting(false)
    }
  }, [selectedLedgerId, transactionIds, onSuccess, onClose]);

  return (
    <Modal
      visible={visible}
      content={
        <div className="py-4">
          <div className="text-lg font-bold text-slate-800 mb-4 flex items-center justify-between">
            <span>加入账本</span>
            <span className="text-xs font-normal text-slate-400">已选 {transactionIds.length} 条</span>
          </div>
          
          <div className="max-h-[300px] overflow-y-auto">
            {isLoading ? (
              <div className="flex justify-center py-10 text-slate-400 text-sm">加载账本中...</div>
            ) : ledgers && ledgers.length > 0 ? (
              <CheckList
                value={[selectedLedgerId]}
                onChange={v => setSelectedLedgerId(v[0] as string)}
              >
                {ledgers.map(l => (
                  <CheckList.Item key={l.id} value={l.id}>
                    <div className="flex items-center gap-2">
                      <div className="text-sm font-medium">{l.name}</div>
                    </div>
                  </CheckList.Item>
                ))}
              </CheckList>
            ) : (
              <div className="flex flex-col items-center justify-center py-10 text-slate-400">
                <p className="text-sm">暂无账本</p>
                <Button size="mini" color="primary" className="mt-2" onClick={() => {/* TODO: Jump to create ledger */}}>
                  去创建
                </Button>
              </div>
            )}
          </div>
        </div>
      }
      closeOnAction
      actions={[
        {
          key: 'cancel',
          text: '取消',
          onClick: onClose,
        },
        {
          key: 'confirm',
          text: '确认加入',
          primary: true,
          disabled: !selectedLedgerId || submitting,
          onClick: handleAdd,
        },
      ]}
    />
  )
}

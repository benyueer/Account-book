import { Button, DatePicker, Form, Input, Modal, Selector, Space, Toast } from 'antd-mobile'
import dayjs from 'dayjs'
import { useState } from 'react'
import { ledgerApi } from '../../api/ledger'
import { useTags } from '../../hooks/api/useTags'

interface QuickAddModalProps {
  visible: boolean
  onClose: () => void
  ledgerId: string
  onSuccess?: () => void
}

export function QuickAddModal({ visible, onClose, ledgerId, onSuccess }: QuickAddModalProps) {
  const [form] = Form.useForm()
  const [submitting, setSubmitting] = useState(false)
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [pickerType, setPickerType] = useState<'start' | 'end' | null>(null)

  const { data: tags } = useTags()

  const handleSubmit = async () => {
    const values = form.getFieldsValue()
    if (!values.merchantNames && (!values.tagIds || values.tagIds.length === 0) && !dateRange[0] && !dateRange[1]) {
      Toast.show('请至少输入一个筛选条件')
      return
    }

    setSubmitting(true)
    try {
      const res = await ledgerApi.quickAdd(ledgerId, {
        merchantNames: values.merchantNames ? values.merchantNames.split(/[,，\n]/).filter(Boolean).map((s: string) => s.trim()) : undefined,
        tagIds: values.tagIds,
        startDate: dateRange[0]?.toISOString(),
        endDate: dateRange[1]?.toISOString(),
      })
      Toast.show({
        content: `成功添加 ${res.added} 条记录${res.skipped > 0 ? `，跳过 ${res.skipped} 条重复记录` : ''}`,
        icon: 'success',
      })
      onSuccess?.()
      onClose()
    }
    catch (error) {
      Toast.show({ content: '添加失败', icon: 'fail' })
    }
    finally {
      setSubmitting(false)
    }
  }

  const tagOptions = tags?.map(t => ({ label: t.name, value: t.id })) || []

  return (
    <>
      <Modal
        visible={visible}
        title="快捷加入记录"
        content={
          <Form form={form} layout="vertical">
            <Form.Item label="商户名称 (多个用逗号隔开)" name="merchantNames">
              <Input placeholder="例如: 充电, 电费" clearable />
            </Form.Item>
            <Form.Item label="选择标签" name="tagIds">
              <Selector
                options={tagOptions}
                multiple
                className="text-xs"
              />
            </Form.Item>
            <Form.Item label="时间范围">
              <div className="flex items-center justify-between">
                <Space>
                  <Button size="mini" onClick={() => setPickerType('start')}>
                    {dateRange[0] ? dayjs(dateRange[0]).format('YYYY-MM-DD') : '开始时间'}
                  </Button>
                  <span className="text-slate-300">-</span>
                  <Button size="mini" onClick={() => setPickerType('end')}>
                    {dateRange[1] ? dayjs(dateRange[1]).format('YYYY-MM-DD') : '结束时间'}
                  </Button>
                </Space>
                {(dateRange[0] || dateRange[1]) && (
                  <Button 
                    size="mini" 
                    fill="none" 
                    onClick={() => setDateRange([null, null])}
                    className="text-slate-400 hover:text-indigo-500 transition-colors ml-4"
                  >
                    <div className="i-mdi-rotate-left text-lg" />
                  </Button>
                )}
              </div>
            </Form.Item>
          </Form>
        }
        actions={[
          { key: 'cancel', text: '取消', onClick: onClose },
          { key: 'confirm', text: '开始执行', primary: true, disabled: submitting, onClick: handleSubmit },
        ]}
      />

      <DatePicker
        visible={!!pickerType}
        onClose={() => setPickerType(null)}
        onConfirm={(val) => {
          if (pickerType === 'start') setDateRange([val, dateRange[1]])
          else setDateRange([dateRange[0], val])
          setPickerType(null)
        }}
        value={(pickerType === 'start' ? dateRange[0] : dateRange[1]) || new Date()}
      />
    </>
  )
}

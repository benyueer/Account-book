import { Button, Card, Checkbox, DotLoading, ErrorBlock, List, NavBar, Popup, Tag, TextArea, Toast } from 'antd-mobile'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useCreateTag, useTags } from '../hooks/api/useTags'
import { useTransaction, useUpdateTransaction, useUpdateTransactionTags } from '../hooks/api/useTransactions'
import { useSystemStore } from '../stores/system.store'

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hideTabBar, showTabBar } = useSystemStore()

  const { data: transaction, isLoading, error } = useTransaction(id || '')
  const updateTransaction = useUpdateTransaction()
  const updateTransactionTags = useUpdateTransactionTags()
  const { data: allTags = [] } = useTags()
  const createTag = useCreateTag()

  // 备注编辑状态
  const [isEditingNotes, setIsEditingNotes] = useState(false)
  const [notesValue, setNotesValue] = useState('')

  // 标签弹窗状态
  const [tagsPopupVisible, setTagsPopupVisible] = useState(false)
  const [selectedTagIds, setSelectedTagIds] = useState<string[]>([])
  const [applyToAll, setApplyToAll] = useState(false)
  
  // 新建标签状态
  const [newTagName, setNewTagName] = useState('')

  useEffect(() => {
    hideTabBar()
    return () => {
      showTabBar()
    }
  }, [hideTabBar, showTabBar])

  useEffect(() => {
    if (transaction) {
      setNotesValue(transaction.notes || '')
    }
  }, [transaction])

  const handleSaveNotes = async () => {
    if (!id) return
    try {
      await updateTransaction.mutateAsync({ id, data: { notes: notesValue } })
      setIsEditingNotes(false)
      Toast.show({ icon: 'success', content: '备注已更新' })
    } catch {
      Toast.show({ icon: 'fail', content: '更新备注失败' })
    }
  }

  const handleOpenTagsPopup = () => {
    if (!transaction) return
    setSelectedTagIds(transaction.tags?.map(t => t.id) || [])
    setApplyToAll(false)
    setTagsPopupVisible(true)
  }

  const handleSaveTags = async () => {
    if (!id) return
    try {
      await updateTransactionTags.mutateAsync({
        id,
        tagIds: selectedTagIds,
        applyToAllSameCounterparty: applyToAll,
      })
      setTagsPopupVisible(false)
      Toast.show({ icon: 'success', content: '标签已更新' })
    } catch {
      Toast.show({ icon: 'fail', content: '更新标签失败' })
    }
  }

  const handleCreateTag = async () => {
    if (!newTagName.trim()) return
    try {
      const tag = await createTag.mutateAsync(newTagName.trim())
      setSelectedTagIds(prev => [...prev, tag.id])
      setNewTagName('')
    } catch {
      Toast.show({ icon: 'fail', content: '创建标签失败' })
    }
  }

  const toggleTagSelection = (tagId: string) => {
    setSelectedTagIds(prev =>
      prev.includes(tagId) ? prev.filter(id => id !== tagId) : [...prev, tagId],
    )
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <DotLoading color="primary" />
          <span className="mt-2 text-xs text-slate-400">加载中...</span>
        </div>
      )
    }

    if (error) {
      return (
        <div className="p-4">
          <ErrorBlock
            status="disconnected"
            title="查询失败"
            description={(error as any)?.response?.data?.message || error.message || '无法加载交易详情'}
          />
        </div>
      )
    }

    if (!transaction) {
      return (
        <div className="p-4">
          <ErrorBlock status="empty" title="未找到交易" description="该笔交易记录可能已被删除" />
        </div>
      )
    }

    return (
      <div className="p-4 space-y-4">
        {/* 全局金额显示区 */}
        <div className="flex flex-col items-center border border-slate-50 rounded-2xl bg-white py-6 shadow-sm">
          <span className="mb-1 text-xs text-slate-400">
            {transaction.transactionType === 'income' ? '收入金额' : '支出金额'}
          </span>
          <span
            className={`text-3xl font-bold ${transaction.transactionType === 'income' ? 'text-green-500' : 'text-slate-900'}`}
          >
            {transaction.transactionType === 'income' ? '+' : '-'}
            ¥
            {Number(transaction.amount).toFixed(2)}
          </span>
        </div>

        {/* 标签显示区（新增在基础信息上方） */}
        <Card title="标签" className="rounded-2xl border-none shadow-sm pb-2">
          <div className="px-3 flex flex-wrap gap-2 items-center">
            {transaction.tags?.map(tag => (
              <Tag color="primary" fill="outline" key={tag.id}>
                {tag.name}
              </Tag>
            ))}
            <Tag color="default" fill="outline" onClick={handleOpenTagsPopup}>
              + 添加标签
            </Tag>
          </div>
        </Card>

        {/* 基础信息区 */}
        <Card title="基础信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item extra={transaction.transactionType === 'income' ? '收入' : '支出'}>交易类型</List.Item>
            <List.Item extra={new Date(transaction.transactionTime).toLocaleString()}>交易时间</List.Item>
            {transaction.transactionCategory && (
              <List.Item extra={transaction.transactionCategory}>分类</List.Item>
            )}
            {transaction.paymentMethod && <List.Item extra={transaction.paymentMethod}>支付方式</List.Item>}
            {transaction.source && <List.Item extra={transaction.source}>账单来源</List.Item>}
            {transaction.transactionStatus && <List.Item extra={transaction.transactionStatus}>交易状态</List.Item>}
          </List>
        </Card>

        {/* 对方信息区 */}
        <Card title="对方信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item extra={transaction.counterparty || '无'}>交易对方</List.Item>
            {transaction.counterpartyAccount && <List.Item extra={transaction.counterpartyAccount}>对方账号</List.Item>}
            {transaction.productDescription && <List.Item extra={transaction.productDescription}>商品说明</List.Item>}
          </List>
        </Card>

        {/* 流水单号 */}
        <Card title="订单流水" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm font-mono">
            {transaction.transactionOrderNumber && <List.Item extra={transaction.transactionOrderNumber}>交易单号</List.Item>}
            {transaction.merchantOrderNumber && <List.Item extra={transaction.merchantOrderNumber}>商家单号</List.Item>}
            {transaction.sourceCard && <List.Item extra={transaction.sourceCard}>来源账户</List.Item>}
          </List>
        </Card>

        {/* 备注（支持点击编辑） */}
        <Card 
          title="备注" 
          extra={
            !isEditingNotes && (
              <span className="text-primary text-sm" onClick={() => setIsEditingNotes(true)}>
                编辑
              </span>
            )
          } 
          className="rounded-2xl border-none pb-2 shadow-sm"
        >
          <div className="px-3">
            {isEditingNotes ? (
              <div className="flex flex-col gap-2">
                <TextArea
                  placeholder="请输入备注"
                  value={notesValue}
                  onChange={setNotesValue}
                  autoSize={{ minRows: 2, maxRows: 5 }}
                  className="bg-slate-50 p-2 rounded"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button size="small" onClick={() => {
                    setIsEditingNotes(false)
                    setNotesValue(transaction.notes || '')
                  }}>取消</Button>
                  <Button size="small" color="primary" loading={updateTransaction.isPending} onClick={handleSaveNotes}>
                    保存
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="text-sm text-slate-600 min-h-[1.5rem]" 
                onClick={() => setIsEditingNotes(true)}
              >
                {transaction.notes || <span className="text-slate-300">暂无备注，点击添加</span>}
              </div>
            )}
          </div>
        </Card>
        
        <div className="h-20"></div>

        {/* 选择标签的弹窗 */}
        <Popup
          visible={tagsPopupVisible}
          onMaskClick={() => setTagsPopupVisible(false)}
          bodyStyle={{ height: '60vh', borderTopLeftRadius: '12px', borderTopRightRadius: '12px' }}
        >
          <div className="flex flex-col h-full bg-slate-50">
            <div className="flex items-center justify-between p-4 bg-white border-b border-slate-100 flex-shrink-0">
              <span className="text-slate-500" onClick={() => setTagsPopupVisible(false)}>取消</span>
              <span className="font-bold">设置标签</span>
              <span className="text-primary font-bold" onClick={handleSaveTags}>保存</span>
            </div>
            
            <div className="flex-1 overflow-y-auto p-4 space-y-6">
              <div>
                <div className="text-sm text-slate-500 mb-3">所有标签</div>
                <div className="flex flex-wrap gap-2">
                  {allTags.map(tag => {
                    const isSelected = selectedTagIds.includes(tag.id)
                    return (
                      <Tag
                        key={tag.id}
                        color={isSelected ? 'primary' : 'default'}
                        fill={isSelected ? 'solid' : 'outline'}
                        onClick={() => toggleTagSelection(tag.id)}
                        className="px-3 py-1.5 text-sm"
                      >
                        {tag.name}
                      </Tag>
                    )
                  })}
                  {allTags.length === 0 && <span className="text-sm text-slate-400">暂无标签</span>}
                </div>
              </div>
              
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100">
                <div className="text-sm font-bold mb-2">新建标签</div>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newTagName}
                    onChange={e => setNewTagName(e.target.value)}
                    placeholder="输入新标签名"
                    className="flex-1 border border-slate-200 rounded px-2 py-1 outline-none text-sm"
                  />
                  <Button size="small" color="primary" fill="outline" onClick={handleCreateTag}>
                    新建
                  </Button>
                </div>
              </div>
              
              {transaction.counterparty && (
                <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-100 mt-4">
                  <Checkbox 
                    checked={applyToAll} 
                    onChange={setApplyToAll}
                    className="text-sm"
                  >
                    为该商户所有记录（{transaction.counterparty}）应用上述选中标签
                  </Checkbox>
                  <div className="text-xs text-slate-400 mt-1 ml-6">勾选后，选中的标签将同步应用到所有同名商户的账单中。</div>
                </div>
              )}
            </div>
          </div>
        </Popup>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed inset-0 z-50 flex flex-col bg-slate-50"
    >
      <NavBar onBack={async () => navigate(-1)} className="flex-shrink-0 border-b border-slate-100 bg-white">
        交易详情
      </NavBar>
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </motion.div>
  )
}

export default Detail


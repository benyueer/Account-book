import type { Transaction } from '@account-book/types'
import { Button, DotLoading, Empty, Modal, PullToRefresh, Toast } from 'antd-mobile'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronLeft, Plus, Trash2 } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { ledgerApi } from '../../api/ledger'
import { TransactionList } from '../../components/Home/TransactionList'
import { QuickAddModal } from '../../components/Ledger/QuickAddModal'

export default function LedgerTransactions() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const [quickAddVisible, setQuickAddVisible] = useState(false)
  const [selectionMode, setSelectionMode] = useState(false)
  const [selectedIds, setSelectedIds] = useState<string[]>([])

  const { data: ledger } = useQuery({
    queryKey: ['ledger', id],
    queryFn: () => ledgerApi.findOne(id!),
    enabled: !!id,
  })

  const { data: transactions, isLoading, refetch } = useQuery({
    queryKey: ['ledger-transactions', id],
    queryFn: () => ledgerApi.getTransactions(id!),
    enabled: !!id,
  })

  const { mutate: removeTransactions, isPending: removing } = useMutation({
    mutationFn: (transactionIds: string[]) => ledgerApi.removeTransactions(id!, { transactionIds }),
    onSuccess: () => {
      Toast.show({ icon: 'success', content: '已移除' })
      setSelectionMode(false)
      setSelectedIds([])
      queryClient.invalidateQueries({ queryKey: ['ledger-transactions', id] })
    },
  })

  const processedData = useMemo(() => {
    if (!transactions) return []

    const groupMap = transactions.reduce((pre, item) => {
      const date = new Date(item.transactionTime)
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
      if (!pre.has(dayKey)) pre.set(dayKey, [])
      pre.get(dayKey)?.push(item)
      return pre
    }, new Map<string, Transaction[]>())

    return [...groupMap.entries()]
      .map(([date, ts]) => ({
        date,
        totalIncome: ts.reduce((acc, t) => acc + (t.transactionType === 'income' ? Number(t.amount) : 0), 0),
        totalExpense: ts.reduce((acc, t) => acc + (t.transactionType === 'expense' ? Number(t.amount) : 0), 0),
        transactions: ts,
      }))
      .sort((a, b) => b.date.localeCompare(a.date))
  }, [transactions])

  const toggleSelectionMode = () => {
    setSelectionMode(!selectionMode)
    setSelectedIds([])
  }

  const handleSelect = (tid: string, selected: boolean) => {
    if (selected) setSelectedIds(prev => [...prev, tid])
    else setSelectedIds(prev => prev.filter(i => i !== tid))
  }

  const handleSelectAll = () => {
    if (!transactions) return
    if (selectedIds.length === transactions.length) setSelectedIds([])
    else setSelectedIds(transactions.map(t => t.id))
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="h-screen overflow-y-auto bg-slate-50 text-slate-900"
    >
      <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-md p-4 flex items-center gap-3 border-b border-slate-100">
        <div 
          onClick={() => navigate(-1)}
          className="p-1.5 bg-slate-100 rounded-full text-slate-600 active:scale-95 transition-transform"
        >
          <ChevronLeft size={20} />
        </div>
        <div className="flex-1">
          <h1 className="text-lg font-bold truncate">{ledger?.name} - 明细</h1>
          <p className="text-xs text-slate-400">共 {transactions?.length || 0} 条记录</p>
        </div>
        <div className="flex items-center gap-2">
          {transactions && transactions.length > 0 && (
            <Button size="mini" fill="none" className="text-indigo-500" onClick={toggleSelectionMode}>
              {selectionMode ? '取消' : '批量操作'}
            </Button>
          )}
          <Button 
            size="mini" 
            color="primary" 
            fill="outline" 
            className="rounded-full px-2"
            onClick={() => setQuickAddVisible(true)}
          >
            <Plus size={14} />
          </Button>
        </div>
      </div>

      <PullToRefresh onRefresh={async () => { await refetch() }}>
        <div className="min-h-[calc(100vh-80px)] p-4">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20">
                <DotLoading color="primary" />
                <span className="mt-2 text-xs text-slate-400">正在加载明细...</span>
              </div>
            ) : processedData.length === 0 ? (
              <Empty description="该账本下暂无记录" />
            ) : (
              <TransactionList
                groups={processedData}
                isLoading={false}
                hasMore={false}
                loadMore={async () => {}}
                selectionMode={selectionMode}
                selectedIds={selectedIds}
                onSelect={handleSelect}
              />
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>

      <QuickAddModal
        visible={quickAddVisible}
        onClose={() => setQuickAddVisible(false)}
        ledgerId={id!}
        onSuccess={refetch}
      />

      {/* 批量操作条 */}
      <AnimatePresence>
        {selectionMode && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 p-4 pb-8 flex items-center justify-between shadow-lg"
          >
            <div className="flex items-center gap-4">
              <div onClick={handleSelectAll} className="flex items-center gap-2 text-sm text-slate-600">
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedIds.length > 0 && selectedIds.length === (transactions?.length || 0) ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300'}`}>
                  {selectedIds.length > 0 && selectedIds.length === (transactions?.length || 0) && <Check size={12} />}
                </div>
                全选
              </div>
              <span className="text-xs text-slate-400">已选 {selectedIds.length} 条</span>
            </div>
            
            <Button
              color="danger"
              shape="rounded"
              size="small"
              disabled={selectedIds.length === 0 || removing}
              onClick={() => {
                Modal.confirm({
                  content: `确定从账本中移除这 ${selectedIds.length} 条记录吗？`,
                  onConfirm: () => removeTransactions(selectedIds),
                })
              }}
            >
              <div className="flex items-center gap-1">
                <Trash2 size={14} />
                <span>从账本移除</span>
              </div>
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

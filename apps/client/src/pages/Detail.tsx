import { Card, DotLoading, ErrorBlock, List, NavBar } from 'antd-mobile'
import { motion } from 'framer-motion'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useTransaction } from '../hooks/api/useTransactions'
import { useSystemStore } from '../stores/system.store'

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { hideTabBar, showTabBar } = useSystemStore()

  const { data: transaction, isLoading, error } = useTransaction(id || '')

  useEffect(() => {
    hideTabBar()
    return () => {
      showTabBar()
    }
  }, [hideTabBar, showTabBar])

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
            description={
              (error as any)?.response?.data?.message
              || error.message
              || '无法加载交易详情'
            }
          />
        </div>
      )
    }

    if (!transaction) {
      return (
        <div className="p-4">
          <ErrorBlock
            status="empty"
            title="未找到交易"
            description="该笔交易记录可能已被删除"
          />
        </div>
      )
    }

    return (
      <div className="p-4 space-y-4">
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

        <Card title="基础信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item
              extra={transaction.transactionType === 'income' ? '收入' : '支出'}
            >
              交易类型
            </List.Item>
            <List.Item
              extra={new Date(transaction.transactionTime).toLocaleString()}
            >
              交易时间
            </List.Item>
            {transaction.transactionCategory && (
              <List.Item extra={transaction.transactionCategory}>
                分类
              </List.Item>
            )}
            {transaction.paymentMethod && (
              <List.Item extra={transaction.paymentMethod}>支付方式</List.Item>
            )}
            {transaction.transactionStatus && (
              <List.Item extra={transaction.transactionStatus}>
                交易状态
              </List.Item>
            )}
          </List>
        </Card>

        <Card title="对方信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item extra={transaction.counterparty || '无'}>
              交易对方
            </List.Item>
            {transaction.counterpartyAccount && (
              <List.Item extra={transaction.counterpartyAccount}>
                对方账号
              </List.Item>
            )}
            {transaction.productDescription && (
              <List.Item extra={transaction.productDescription}>
                商品说明
              </List.Item>
            )}
          </List>
        </Card>

        <Card title="订单流水" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm font-mono">
            {transaction.transactionOrderNumber && (
              <List.Item extra={transaction.transactionOrderNumber}>
                交易单号
              </List.Item>
            )}
            {transaction.merchantOrderNumber && (
              <List.Item extra={transaction.merchantOrderNumber}>
                商家单号
              </List.Item>
            )}
            {transaction.sourceCard && (
              <List.Item extra={transaction.sourceCard}>来源账户</List.Item>
            )}
          </List>
        </Card>

        {transaction.notes && (
          <Card title="备注" className="rounded-2xl border-none pb-2 shadow-sm">
            <div className="px-3 text-sm text-slate-600">
              {transaction.notes}
            </div>
          </Card>
        )}
        <div className="h-20"></div>
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
      <NavBar
        onBack={async () => navigate(-1)}
        className="flex-shrink-0 border-b border-slate-100 bg-white"
      >
        交易详情
      </NavBar>
      <div className="flex-1 overflow-y-auto">{renderContent()}</div>
    </motion.div>
  )
}

export default Detail

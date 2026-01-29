import type { Transaction } from '../../types/transaction'
import { TransactionType } from '@account-book/types'
import { useNavigate } from 'react-router-dom'

interface TransactionItemProps {
  transaction: Transaction
}

export function TransactionItem({ transaction }: TransactionItemProps) {
  const navigate = useNavigate()
  const { id, amount, counterparty, icon, transactionTime, transactionType }
    = transaction

  const getAmountColor = () => {
    if (transactionType === TransactionType.INCOME)
      return 'text-emerald-500'
    return 'text-slate-900'
  }

  const getAmountPrefix = () => {
    if (transactionType === TransactionType.INCOME)
      return '+'
    return ''
  }

  const timeString = new Date(transactionTime).toLocaleTimeString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return (
    <div
      className="flex cursor-pointer items-center justify-between px-4 py-3 transition-colors active:bg-gray-50"
      onClick={async () => navigate(`/detail/${id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600">
          <div className={icon} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-slate-900 font-medium">
            {counterparty || '未知商家'}
          </span>
          <span className="text-xs text-slate-400">{timeString}</span>
        </div>
      </div>
      <div className={`font-semibold ${getAmountColor()}`}>
        {getAmountPrefix()}
        ¥
        {Math.abs(amount).toFixed(2)}
      </div>
    </div>
  )
}

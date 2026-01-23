import type { GroupedTransactions } from '../../types/transaction'
import { InfiniteScroll } from 'antd-mobile'
import { TransactionItem } from './TransactionItem'

interface TransactionListProps {
  groups: GroupedTransactions[]
  isLoading?: boolean
  hasMore: boolean
  loadMore: (options?: any) => Promise<any>
}

export function TransactionList({
  groups,
  isLoading,
  hasMore,
  loadMore,
}: TransactionListProps) {
  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map(i => (
          <div
            key={i}
            className="flex animate-pulse items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-24 rounded bg-gray-200" />
                <div className="h-3 w-16 rounded bg-gray-200" />
              </div>
            </div>
            <div className="h-4 w-16 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div
      className="h-[calc(100vh-80px)] overflow-y-auto pb-24"
    >
      {groups.map(group => (
        <div key={group.month}>
          {/* Sticky Header */}
          <div className="sticky top-0 z-40 flex items-center justify-between border-y border-gray-100 bg-gray-50/95 px-4 py-2 text-xs text-slate-500 backdrop-blur-sm">
            <span>{group.month}</span>
            <div className="flex gap-2">
              <span>
                支 ¥
                {Math.abs(group.totalExpense).toFixed(2)}
              </span>
              <span>
                收 ¥
                {group.totalIncome.toFixed(2)}
              </span>
            </div>
          </div>

          {/* List Items */}
          <div className="bg-white divide-y divide-gray-50">
            {group.transactions.map(transaction => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  )
}

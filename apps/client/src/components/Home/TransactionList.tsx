import { InfiniteScroll } from "antd-mobile";
import type { GroupedTransactions } from "../../types/transaction";
import { TransactionItem } from "./TransactionItem";

interface TransactionListProps {
  groups: GroupedTransactions[];
  isLoading?: boolean;
  hasMore: boolean;
  loadMore: (options?: any) => Promise<any>;
}

export const TransactionList = ({
  groups,
  isLoading,
  hasMore,
  loadMore,
}: TransactionListProps) => {

  if (isLoading) {
    return (
      <div className="p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="animate-pulse flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200" />
              <div className="space-y-2">
                <div className="h-4 w-24 bg-gray-200 rounded" />
                <div className="h-3 w-16 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="pb-24 overflow-y-auto h-[calc(100vh-80px)]"
    >
      {groups.map((group) => (
        <div key={group.month}>
          {/* Sticky Header */}
          <div className="sticky top-0 z-40 bg-gray-50/95 backdrop-blur-sm px-4 py-2 border-y border-gray-100 flex items-center justify-between text-xs text-slate-500">
            <span>{group.month}</span>
            <div className="flex gap-2">
              <span>支 ¥{Math.abs(group.totalExpense).toFixed(2)}</span>
              <span>收 ¥{group.totalIncome.toFixed(2)}</span>
            </div>
          </div>

          {/* List Items */}
          <div className="divide-y divide-gray-50 bg-white">
            {group.transactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>
      ))}
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
};

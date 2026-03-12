import type { GroupedTransactions, Transaction } from '@account-book/types'
import { TransactionType } from '@account-book/types'

/**
 * Groups an array of transactions by date (YYYY-MM-DD format).
 * Each group contains the date, total income, total expense, and the transactions for that day.
 * Results are sorted by date in descending order (newest first).
 */
export function groupTransactions(
  transactions: Transaction[],
): GroupedTransactions[] {
  if (!transactions || transactions.length === 0) {
    return []
  }

  const groupMap = transactions.reduce((pre, item) => {
    const date = new Date(item.transactionTime)
    const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`
    if (!pre.has(dayKey)) {
      pre.set(dayKey, [])
    }
    pre.get(dayKey)?.push(item)
    return pre
  }, new Map<string, Transaction[]>())

  return [...groupMap.entries()]
    .map(([date, txs]) => ({
      date,
      totalIncome: txs.reduce(
        (acc, t) =>
          acc
          + (t.transactionType === TransactionType.INCOME ? Number(t.amount) : 0),
        0,
      ),
      totalExpense: txs.reduce(
        (acc, t) =>
          acc
          + (t.transactionType === TransactionType.EXPENSE
            ? Number(t.amount)
            : 0),
        0,
      ),
      transactions: txs,
    }))
    .sort((a, b) => b.date.localeCompare(a.date))
}

/**
 * Extracts all transaction IDs from a grouped transactions array.
 */
export function getAllTransactionIds(groups: GroupedTransactions[]): string[] {
  return groups.flatMap(g => g.transactions.map(t => t.id))
}

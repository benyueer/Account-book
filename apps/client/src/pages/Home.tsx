import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PullToRefresh, Empty, DotLoading } from "antd-mobile";
import { FilterBar } from "../components/Home/FilterBar";
import { TransactionList } from "../components/Home/TransactionList";
import { transactionService } from "../api/transactions";
import type { GroupedTransactions, Transaction } from "@account-book/types";

export default function Home() {
  const [data, setData] = useState<GroupedTransactions[]>([]);
  const [totals, setTotals] = useState({ income: 0, expense: 0 });
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  const loadingRef = useRef(false);

  const buildGroups = (items: Transaction[]) => {
    return items.reduce((pre, item) => {
      const date = new Date(item.transactionTime);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;

      if (!pre.has(monthKey)) {
        pre.set(monthKey, []);
      }
      pre.get(monthKey)?.push(item);
      return pre;
    }, new Map<string, Transaction[]>());
  };

  // Effect for filter changes - reset everything
  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
    setIsInitialLoading(true);
    // The loadMore will be triggered by scroll or manually here if empty
    loadMore(true);
  }, [currentDate, filterType]);

  const loadMore = async (isReset = false) => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    const currentPage = isReset ? 1 : page;

    try {
      const params: any = {
        page: currentPage,
        limit: 15,
        type: filterType,
      };

      if (currentDate) {
        params.startDate = currentDate.toISOString();
        params.endDate = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + 1,
          0,
          23,
          59,
          59,
        ).toISOString();
      }

      const response = await transactionService.findAll(params);

      if (response.items.length > 0) {
        setData((prev) => {
          const oldItems = isReset
            ? []
            : prev.map((p) => p.transactions).flat();
          const allItems = [...oldItems, ...response.items];
          const uniqueItems = Array.from(
            new Map(allItems.map((item) => [item.id, item])).values(),
          );

          const groups = buildGroups(uniqueItems);
          return [...groups.entries()]
            .map(([month, transactions]) => ({
              month,
              totalIncome: transactions.reduce(
                (acc: number, t: Transaction) =>
                  acc + (t.transactionType === "income" ? Number(t.amount) : 0),
                0,
              ),
              totalExpense: transactions.reduce(
                (acc: number, t: Transaction) =>
                  acc +
                  (t.transactionType === "expense" ? Number(t.amount) : 0),
                0,
              ),
              transactions,
            }))
            .sort((a, b) => b.month.localeCompare(a.month));
        });

        setTotals({
          income: response.totalIncome || 0,
          expense: response.totalExpense || 0,
        });

        setPage(currentPage + 1);
        setHasMore(currentPage < response.totalPages);
      } else {
        if (isReset) setData([]);
        setHasMore(false);
      }
    } catch (e) {
      console.error(e);
      setHasMore(false);
    } finally {
      loadingRef.current = false;
      setIsInitialLoading(false);
    }
  };

  const handleRefresh = async () => {
    setCurrentDate(currentDate); // Re-trigger initial load logic
  };

  const handleFilterChange = (year: number, month: number) => {
    setCurrentDate(new Date(year, month));
  };

  const handleTypeChange = (type?: string) => {
    setFilterType(type);
  };

  const handleReset = () => {
    setCurrentDate(null);
    setFilterType(undefined);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-full bg-slate-50 text-slate-900"
    >
      <FilterBar
        year={currentDate?.getFullYear()}
        month={currentDate?.getMonth()}
        type={filterType}
        onFilterChange={handleFilterChange}
        onTypeChange={handleTypeChange}
        onReset={handleReset}
        totalIncome={totals.income}
        totalExpense={totals.expense}
      />

      <PullToRefresh onRefresh={handleRefresh}>
        <div className="min-h-[calc(100vh-140px)]">
          <AnimatePresence mode="wait">
            {isInitialLoading && data.length === 0 ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <DotLoading color="primary" />
                <span className="text-xs text-slate-400 mt-2">
                  正在加载交易记录...
                </span>
              </motion.div>
            ) : data.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20"
              >
                <Empty
                  image={
                    <div className="i-mdi-text-box-search-outline text-6xl text-slate-200 mx-auto" />
                  }
                  description={
                    <div className="flex flex-col items-center gap-1">
                      <span className="text-slate-500 font-medium">
                        暂无交易记录
                      </span>
                      <span className="text-xs text-slate-400">
                        试试调整筛选条件吧
                      </span>
                    </div>
                  }
                />
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <TransactionList
                  groups={data}
                  hasMore={hasMore}
                  loadMore={() => loadMore(false)}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>
    </motion.div>
  );
}

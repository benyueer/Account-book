import type { Transaction } from "@account-book/types";
import { DotLoading, Empty, PullToRefresh } from "antd-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { FilterBar } from "../components/Home/FilterBar";
import { TransactionList } from "../components/Home/TransactionList";
import { useTransactions } from "../hooks/api/useTransactions";

export default function Home() {
  const [currentDate, setCurrentDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);

  const filters = useMemo(() => {
    const params: any = { type: filterType };
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
    return params;
  }, [currentDate, filterType]);

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useTransactions(filters);

  const processedData = useMemo(() => {
    if (!data) return [];

    // 平铺所有页的数据
    const allTransactions = data.pages.flatMap((page) => page.items);

    // 分组逻辑
    const groupMap = allTransactions.reduce((pre, item) => {
      const date = new Date(item.transactionTime);
      const dayKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
      if (!pre.has(dayKey)) pre.set(dayKey, []);
      pre.get(dayKey)?.push(item);
      return pre;
    }, new Map<string, Transaction[]>());

    return [...groupMap.entries()]
      .map(([date, transactions]) => ({
        date,
        totalIncome: transactions.reduce(
          (acc, t) =>
            acc + (t.transactionType === "income" ? Number(t.amount) : 0),
          0,
        ),
        totalExpense: transactions.reduce(
          (acc, t) =>
            acc + (t.transactionType === "expense" ? Number(t.amount) : 0),
          0,
        ),
        transactions,
      }))
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [data]);

  const totals = useMemo(() => {
    if (!data?.pages[0]) return { income: 0, expense: 0 };
    // 后端返回的最后一次统计数据（通常后端第一页返回总计）
    const firstPage = data.pages[0];
    return {
      income: firstPage.totalIncome || 0,
      expense: firstPage.totalExpense || 0,
    };
  }, [data]);

  const handleRefresh = async () => {
    await refetch();
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
            {isLoading && processedData.length === 0 ? (
              <motion.div
                key="loading"
                initial={{ opacity: 1 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center py-20"
              >
                <DotLoading color="primary" />
                <span className="mt-2 text-xs text-slate-400">
                  正在加载交易记录...
                </span>
              </motion.div>
            ) : processedData.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="py-20"
              >
                <Empty
                  image={
                    <div className="i-mdi-text-box-search-outline mx-auto text-6xl text-slate-200" />
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
                  groups={processedData}
                  isLoading={isLoading}
                  hasMore={!!hasNextPage}
                  loadMore={fetchNextPage}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>
      <Outlet />
    </motion.div>
  );
}

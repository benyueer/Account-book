import type { Transaction } from "@account-book/types";
import { DotLoading, Empty, PullToRefresh } from "antd-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { Outlet } from "react-router-dom";
import { FilterBar } from "../components/Home/FilterBar";
import { TransactionList } from "../components/Home/TransactionList";
import { useTransactions } from "../hooks/api/useTransactions";
import { AddToLedgerModal } from "../components/Ledger/AddToLedgerModal";
import { useSystemStore } from "../stores/system.store";
import { Button } from "antd-mobile";
import { Check } from "lucide-react";

export default function Home() {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [filterType, setFilterType] = useState<string | undefined>(undefined);
  const [counterparty, setCounterparty] = useState<string | undefined>(undefined);
  const [tagIds, setTagIds] = useState<string[]>([]);
  const [minAmount, setMinAmount] = useState<number | undefined>(undefined);
  const [maxAmount, setMaxAmount] = useState<number | undefined>(undefined);
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { showTabBar, hideTabBar } = useSystemStore();

  const filters = useMemo(() => {
    const params: any = { 
      type: filterType,
      counterparty,
      tagIds: tagIds.length > 0 ? tagIds.join(',') : undefined,
      minAmount,
      maxAmount,
    };
    if (startDate) {
      params.startDate = startDate.toISOString();
    }
    if (endDate) {
      params.endDate = endDate.toISOString();
    }
    return params;
  }, [startDate, endDate, filterType, counterparty, tagIds, minAmount, maxAmount]);

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

  const handleTypeChange = (type?: string) => {
    setFilterType(type);
  };

  const handleReset = () => {
    setStartDate(null);
    setEndDate(null);
    setFilterType(undefined);
    setCounterparty(undefined);
    setTagIds([]);
    setMinAmount(undefined);
    setMaxAmount(undefined);
  };

  const toggleSelectionMode = () => {
    const nextMode = !selectionMode;
    setSelectionMode(nextMode);
    setSelectedIds([]);
    if (nextMode) hideTabBar();
    else showTabBar();
  };

  const handleSelect = (id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds(prev => [...prev, id]);
    } else {
      setSelectedIds(prev => prev.filter(i => i !== id));
    }
  };

  const handleSelectAll = () => {
    if (!processedData) return;
    const allIds = processedData.flatMap(g => g.transactions.map(t => t.id));
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-full bg-slate-50 text-slate-900"
    >
      <FilterBar
        startDate={startDate || undefined}
        endDate={endDate || undefined}
        type={filterType}
        counterparty={counterparty}
        tagIds={tagIds}
        minAmount={minAmount}
        maxAmount={maxAmount}
        onDateRangeChange={(start?: Date, end?: Date) => {
          setStartDate(start || null);
          setEndDate(end || null);
        }}
        onTypeChange={handleTypeChange}
        onCounterpartyChange={setCounterparty}
        onTagsChange={setTagIds}
        onAmountRangeChange={(min?: number, max?: number) => {
          setMinAmount(min);
          setMaxAmount(max);
        }}
        onReset={handleReset}
        totalIncome={totals.income}
        totalExpense={totals.expense}
        selectionMode={selectionMode}
        onSelectionModeToggle={toggleSelectionMode}
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
                  selectionMode={selectionMode}
                  selectedIds={selectedIds}
                  onSelect={handleSelect}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </PullToRefresh>

      {/* 底部操作条 */}
      <AnimatePresence>
        {selectionMode && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-slate-100 p-4 pb-8 flex items-center justify-between shadow-[0_-4px_16px_rgba(0,0,0,0.05)]"
          >
            <div className="flex items-center gap-4">
              <div 
                onClick={handleSelectAll}
                className="flex items-center gap-2 text-sm text-slate-600"
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedIds.length > 0 && selectedIds.length === processedData.flatMap(g => g.transactions).length ? 'bg-indigo-500 border-indigo-500 text-white' : 'border-slate-300'}`}>
                  {selectedIds.length > 0 && selectedIds.length === processedData.flatMap(g => g.transactions).length && <Check size={12} />}
                </div>
                全选
              </div>
              <span className="text-xs text-slate-400">已选 {selectedIds.length} 条</span>
            </div>
            
            <Button
              color="primary"
              shape="rounded"
              size="small"
              disabled={selectedIds.length === 0}
              onClick={() => setModalVisible(true)}
            >
              加入账本
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <AddToLedgerModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        transactionIds={selectedIds}
        onSuccess={() => {
          setSelectionMode(false);
          showTabBar();
          setSelectedIds([]);
        }}
      />
      <Outlet />
    </motion.div>
  );
}

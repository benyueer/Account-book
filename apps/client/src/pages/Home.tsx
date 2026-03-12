import { DotLoading, Empty, PullToRefresh } from "antd-mobile";
import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState, useCallback } from "react";
import { Outlet } from "react-router-dom";
import { FilterBar } from "../components/Home/FilterBar";
import { TransactionList } from "../components/Home/TransactionList";
import { useTransactions } from "../hooks/api/useTransactions";
import { useTransactionFilter } from "../hooks/useTransactionFilter";
import { AddToLedgerModal } from "../components/Ledger/AddToLedgerModal";
import { useSystemStore } from "../stores/system.store";
import { Button } from "antd-mobile";
import { Check } from "lucide-react";
import { groupTransactions, getAllTransactionIds } from "../utils/transaction";

export default function Home() {
  const [selectionMode, setSelectionMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const { showTabBar, hideTabBar } = useSystemStore();

  const {
    startDate,
    endDate,
    filterType,
    counterparty,
    tagIds,
    minAmount,
    maxAmount,
    handleDateRangeChange,
    handleTypeChange,
    handleCounterpartyChange,
    handleTagsChange,
    handleAmountRangeChange,
    reset,
    filters,
  } = useTransactionFilter();

  const { data, fetchNextPage, hasNextPage, isLoading, refetch } =
    useTransactions(filters);

  const processedData = useMemo(() => {
    if (!data) return [];

    // Flatten all pages of data
    const allTransactions = data.pages.flatMap((page) => page.items);

    // Group by date
    return groupTransactions(allTransactions);
  }, [data]);

  const totals = useMemo(() => {
    if (!data?.pages[0]) return { income: 0, expense: 0 };
    // Backend returns summary data on the first page (usually)
    const firstPage = data.pages[0];
    return {
      income: firstPage.totalIncome || 0,
      expense: firstPage.totalExpense || 0,
    };
  }, [data]);

  const handleRefresh = useCallback(async () => {
    await refetch();
  }, [refetch]);

  const toggleSelectionMode = useCallback(() => {
    const nextMode = !selectionMode;
    setSelectionMode(nextMode);
    setSelectedIds([]);
    if (nextMode) hideTabBar();
    else showTabBar();
  }, [selectionMode, hideTabBar, showTabBar]);

  const handleSelect = useCallback((id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  }, []);

  const handleSelectAll = useCallback(() => {
    if (!processedData) return;
    const allIds = getAllTransactionIds(processedData);
    if (selectedIds.length === allIds.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  }, [processedData, selectedIds]);

  const allTransactionCount = useMemo(() => {
    return processedData ? getAllTransactionIds(processedData).length : 0;
  }, [processedData]);

  const isAllSelected =
    selectedIds.length > 0 && selectedIds.length === allTransactionCount;

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
        onDateRangeChange={handleDateRangeChange}
        onTypeChange={handleTypeChange}
        onCounterpartyChange={handleCounterpartyChange}
        onTagsChange={handleTagsChange}
        onAmountRangeChange={handleAmountRangeChange}
        onReset={reset}
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

      {/* Bottom action bar */}
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
                <div
                  className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                    isAllSelected
                      ? "bg-indigo-500 border-indigo-500 text-white"
                      : "border-slate-300"
                  }`}
                >
                  {isAllSelected && <Check size={12} />}
                </div>
                全选
              </div>
              <span className="text-xs text-slate-400">
                已选 {selectedIds.length} 条
              </span>
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

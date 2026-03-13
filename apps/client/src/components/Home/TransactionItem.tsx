import { memo, useCallback, useMemo, useState } from "react";
import type { Transaction } from "../../types/transaction";
import { TransactionType } from "@account-book/types";
import { useNavigate } from "react-router-dom";
import Detail from "./Detail";

interface TransactionItemProps {
  transaction: Transaction;
  selectionMode?: boolean;
  selected?: boolean;
  onSelect?: (id: string, selected: boolean) => void;
}

export const TransactionItem = memo(function TransactionItem({
  transaction,
  selectionMode,
  selected,
  onSelect,
}: TransactionItemProps) {
  const navigate = useNavigate();
  const [activeItemId, setActiveItemId] = useState<string | null>(null);
  const { id, amount, counterparty, icon, transactionTime, transactionType } =
    transaction;

  const isIncome = transactionType === TransactionType.INCOME;
  const amountColor = isIncome ? "text-emerald-500" : "text-slate-900";
  const amountPrefix = isIncome ? "+" : "";

  const timeString = useMemo(
    () =>
      new Date(transactionTime).toLocaleTimeString("zh-CN", {
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }),
    [transactionTime],
  );

  const handleClick = useCallback(() => {
    if (selectionMode) {
      onSelect?.(id, !selected);
    } else {
      setActiveItemId(id);
    }
  }, [selectionMode, id, selected, onSelect, navigate]);

  const backgroundColor = selected ? "bg-indigo-50/50" : "";

  return (
    <>
      <div
      className={`flex cursor-pointer items-center justify-between px-4 py-3 transition-colors active:bg-gray-50 ${backgroundColor}`}
      onClick={handleClick}
    >
      <div className="flex items-center gap-3">
        {selectionMode && (
          <div
            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
              selected ? "bg-indigo-500 border-indigo-500" : "border-slate-300"
            }`}
          >
            {selected && <div className="i-mdi-check text-white text-xs" />}
          </div>
        )}
        <div className="h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-xl text-gray-600">
          {icon ? (
            <div className={icon} />
          ) : (
            <div
              className={`w-full h-full rounded-full ${
                isIncome ? "bg-emerald-200" : "bg-red-200"
              }`}
            />
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-slate-900 font-medium">
            {counterparty || "未知商家"}
          </span>
          <span className="text-xs text-slate-400">{timeString}</span>
        </div>
      </div>
      <div className={`font-semibold ${amountColor}`}>
        {amountPrefix}¥{Math.abs(amount).toFixed(2)}
      </div>
      </div>
      { activeItemId && (
        <Detail
          id={activeItemId}
          onClose={() => setActiveItemId(null)}
        />
      )}
    </>
  );
});

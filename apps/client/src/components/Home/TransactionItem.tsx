import { useNavigate } from "react-router-dom";
import { TransactionType } from "@account-book/types";
import type { Transaction } from "../../types/transaction";

interface TransactionItemProps {
  transaction: Transaction;
}

export const TransactionItem = ({ transaction }: TransactionItemProps) => {
  const navigate = useNavigate();
  const { id, amount, counterparty, icon, transactionTime, transactionType } =
    transaction;

  const getAmountColor = () => {
    if (transactionType === TransactionType.INCOME) return "text-emerald-500";
    return "text-slate-900";
  };

  const getAmountPrefix = () => {
    if (transactionType === TransactionType.INCOME) return "+";
    return "";
  };

  const timeString = new Date(transactionTime).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return (
    <div
      className="flex items-center justify-between py-3 px-4 active:bg-gray-50 transition-colors cursor-pointer"
      onClick={() => navigate(`/detail/${id}`)}
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-xl text-gray-600">
          <div className={icon} />
        </div>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-slate-900">
            {counterparty || "未知商家"}
          </span>
          <span className="text-xs text-slate-400">{timeString}</span>
        </div>
      </div>
      <div className={`font-semibold ${getAmountColor()}`}>
        {getAmountPrefix()}¥{Math.abs(amount).toFixed(2)}
      </div>
    </div>
  );
};

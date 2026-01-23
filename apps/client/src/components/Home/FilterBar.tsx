import { DatePicker, Popup } from "antd-mobile";
import { useState } from "react";

interface FilterBarProps {
  year?: number;
  month?: number;
  type?: string;
  onFilterChange: (year: number, month: number) => void;
  onTypeChange: (type?: string) => void;
  onReset: () => void;
  totalIncome: number;
  totalExpense: number;
}

export const FilterBar = ({
  year,
  month,
  type,
  onFilterChange,
  onTypeChange,
  onReset,
  totalIncome,
  totalExpense,
}: FilterBarProps) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const [typeVisible, setTypeVisible] = useState(false);

  return (
    <>
      <div className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <div className="flex flex-col px-4 py-2 gap-2">
          {/* Header row: Totals and Reset */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">
                  支出
                </span>
                <span className="text-lg font-bold text-slate-900 leading-none">
                  ¥
                  {Math.abs(totalExpense).toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
              <div className="h-3 w-[1px] bg-gray-200" />
              <div className="flex items-baseline gap-1">
                <span className="text-[10px] text-slate-400 uppercase font-medium">
                  收入
                </span>
                <span className="text-sm font-semibold text-slate-600 leading-none">
                  ¥
                  {totalIncome.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </span>
              </div>
            </div>

            <button
              className="text-[10px] font-medium text-slate-400 hover:text-primary transition-colors bg-slate-50 px-2 py-1 rounded"
              onClick={onReset}
            >
              清除
            </button>
          </div>

          {/* Filter row: Date and Type selectors */}
          <div className="flex gap-2 pb-1">
            <button
              className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex-1 justify-between group"
              onClick={() => setPickerVisible(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="i-mdi-calendar-month-outline text-slate-400 text-sm" />
                <span className="text-xs font-semibold text-slate-700">
                  {year !== undefined && month !== undefined
                    ? `${year}年${month + 1}月`
                    : "全部时间"}
                </span>
              </div>
              <div className="i-mdi-chevron-down text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>

            <button
              className="flex items-center gap-1 bg-slate-100/50 hover:bg-slate-100 px-3 py-1.5 rounded-lg transition-colors flex-1 justify-between group"
              onClick={() => setTypeVisible(true)}
            >
              <div className="flex items-center gap-1.5">
                <div className="i-mdi-filter-variant text-slate-400 text-sm" />
                <span className="text-xs font-semibold text-slate-700">
                  {type === "income"
                    ? "只看收入"
                    : type === "expense"
                      ? "只看支出"
                      : "全部类型"}
                </span>
              </div>
              <div className="i-mdi-chevron-down text-slate-300 group-hover:text-slate-500 transition-colors" />
            </button>
          </div>
        </div>
      </div>

      <DatePicker
        visible={pickerVisible}
        onClose={() => setPickerVisible(false)}
        precision="month"
        onConfirm={(val) => {
          onFilterChange(val.getFullYear(), val.getMonth());
        }}
        value={
          year !== undefined && month !== undefined
            ? new Date(year, month)
            : new Date()
        }
      />

      <Popup
        visible={typeVisible}
        onMaskClick={() => setTypeVisible(false)}
        bodyStyle={{
          borderTopLeftRadius: "16px",
          borderTopRightRadius: "16px",
        }}
      >
        <div className="flex flex-col bg-slate-50">
          <div className="p-4 text-center border-b border-gray-100 font-bold text-slate-800">
            选择交易类型
          </div>
          <div className="flex flex-col p-6 gap-3">
            <button
              className={`p-4 rounded-xl text-center transition-all ${!type ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" : "bg-white text-slate-600 border border-slate-100"}`}
              onClick={() => {
                onTypeChange(undefined);
                setTypeVisible(false);
              }}
            >
              <span className="font-semibold text-sm">全部类型</span>
            </button>
            <button
              className={`p-4 rounded-xl text-center transition-all ${type === "expense" ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" : "bg-white text-slate-600 border border-slate-100"}`}
              onClick={() => {
                onTypeChange("expense");
                setTypeVisible(false);
              }}
            >
              <span className="font-semibold text-sm">只看支出</span>
            </button>
            <button
              className={`p-4 rounded-xl text-center transition-all ${type === "income" ? "bg-primary text-white shadow-lg shadow-primary/20 scale-[1.02]" : "bg-white text-slate-600 border border-slate-100"}`}
              onClick={() => {
                onTypeChange("income");
                setTypeVisible(false);
              }}
            >
              <span className="font-semibold text-sm">只看收入</span>
            </button>
            <button
              className="p-4 rounded-xl text-center text-slate-400 text-sm mt-2 font-medium"
              onClick={() => setTypeVisible(false)}
            >
              取消
            </button>
          </div>
        </div>
      </Popup>
    </>
  );
};

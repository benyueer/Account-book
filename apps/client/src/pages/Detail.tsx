import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { NavBar, DotLoading, ErrorBlock, Card, List } from "antd-mobile";
import { transactionService } from "../api/transactions";
import type { Transaction } from "@account-book/types";
import { useSystemStore } from "../stores/system.store";

const Detail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { hideTabBar, showTabBar } = useSystemStore();

  useEffect(() => {
    hideTabBar();
    return () => {
      showTabBar();
    };
  }, [hideTabBar, showTabBar]);

  useEffect(() => {
    const fetchTransaction = async () => {
      if (!id) {
        setError("交易 ID 丢失");
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const data = await transactionService.findOne(id);
        setTransaction(data);
      } catch (err: any) {
        console.error("Failed to fetch transaction:", err);
        setError(err.response?.data?.message || "无法加载交易详情");
      } finally {
        setLoading(false);
      }
    };

    fetchTransaction();
  }, [id]);

  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex flex-col items-center justify-center py-20">
          <DotLoading color="primary" />
          <span className="text-xs text-slate-400 mt-2">加载中...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="p-4">
          <ErrorBlock
            status="disconnected"
            title="查询失败"
            description={error}
          />
        </div>
      );
    }

    if (!transaction) {
      return (
        <div className="p-4">
          <ErrorBlock
            status="empty"
            title="未找到交易"
            description="该笔交易记录可能已被删除"
          />
        </div>
      );
    }

    return (
      <div className="p-4 space-y-4 h-full overflow-y-auto">
        <div className="flex flex-col items-center py-6 bg-white rounded-2xl shadow-sm border border-slate-50">
          <span className="text-xs text-slate-400 mb-1">
            {transaction.transactionType === "income" ? "收入金额" : "支出金额"}
          </span>
          <span
            className={`text-3xl font-bold ${transaction.transactionType === "income" ? "text-green-500" : "text-slate-900"}`}
          >
            {transaction.transactionType === "income" ? "+" : "-"}¥
            {Number(transaction.amount).toFixed(2)}
          </span>
        </div>

        <Card title="基础信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item
              extra={transaction.transactionType === "income" ? "收入" : "支出"}
            >
              交易类型
            </List.Item>
            <List.Item
              extra={new Date(transaction.transactionTime).toLocaleString()}
            >
              交易时间
            </List.Item>
            {transaction.transactionCategory && (
              <List.Item extra={transaction.transactionCategory}>
                分类
              </List.Item>
            )}
            {transaction.paymentMethod && (
              <List.Item extra={transaction.paymentMethod}>支付方式</List.Item>
            )}
            {transaction.transactionStatus && (
              <List.Item extra={transaction.transactionStatus}>
                交易状态
              </List.Item>
            )}
          </List>
        </Card>

        <Card title="对方信息" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm">
            <List.Item extra={transaction.counterparty || "无"}>
              交易对方
            </List.Item>
            {transaction.counterpartyAccount && (
              <List.Item extra={transaction.counterpartyAccount}>
                对方账号
              </List.Item>
            )}
            {transaction.productDescription && (
              <List.Item extra={transaction.productDescription}>
                商品说明
              </List.Item>
            )}
          </List>
        </Card>

        <Card title="订单流水" className="rounded-2xl border-none shadow-sm">
          <List className="--font-size-sm font-mono">
            {transaction.transactionOrderNumber && (
              <List.Item extra={transaction.transactionOrderNumber}>
                交易单号
              </List.Item>
            )}
            {transaction.merchantOrderNumber && (
              <List.Item extra={transaction.merchantOrderNumber}>
                商家单号
              </List.Item>
            )}
            {transaction.sourceCard && (
              <List.Item extra={transaction.sourceCard}>来源账户</List.Item>
            )}
          </List>
        </Card>

        {transaction.notes && (
          <Card title="备注" className="rounded-2xl border-none shadow-sm pb-2">
            <div className="text-sm text-slate-600 px-3">
              {transaction.notes}
            </div>
          </Card>
        )}
        <div className="h-20"></div>
      </div>
    );
  };

  return (
    <div className="h-screen bg-slate-50">
      <NavBar
        onBack={() => navigate(-1)}
        className="bg-white border-b border-slate-100"
      >
        交易详情
      </NavBar>
      {renderContent()}
    </div>
  );
};

export default Detail;

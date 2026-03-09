import type { Card as CardInterface } from "@account-book/types";
import { Button, Modal, Toast, NavBar, Empty } from "antd-mobile";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useCards, useRemoveCard } from "../../hooks/api/useCards";
import { useSystemStore } from "../../stores/system.store";
import { getBankTheme, getBankLogo } from "../../config/bankTheme";

export default function Cards() {
  const navigate = useNavigate();
  const { data: cards = [], isLoading: loading } = useCards();
  const { mutateAsync: removeCard } = useRemoveCard();

  const { hideTabBar, showTabBar } = useSystemStore();

  useEffect(() => {
    hideTabBar();
    return () => {
      showTabBar();
    };
  }, [hideTabBar, showTabBar]);

  const groupedCards = useMemo(() => {
    const groups: Record<string, CardInterface[]> = {};
    cards.forEach((card) => {
      if (!groups[card.bankName]) {
        groups[card.bankName] = [];
      }
      groups[card.bankName].push(card);
    });
    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [cards]);

  const handleDelete = async (id: string) => {
    Modal.confirm({
      content: "确定要删除这张卡片吗？相关的交易记录将失去关联。",
      onConfirm: async () => {
        try {
          await removeCard(id);
          Toast.show({ icon: "success", content: "删除成功" });
        } catch (error) {
          Toast.show({ icon: "fail", content: "删除失败" });
        }
      },
    });
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      className="fixed inset-0 z-50 flex flex-col bg-slate-50 overflow-hidden"
    >
      <NavBar
        onBack={() => navigate(-1)}
        className="bg-white border-b border-slate-100"
      >
        卡片管理
      </NavBar>

      <div className="flex-1 overflow-y-auto p-4 pb-20">
        <AnimatePresence mode="popLayout">
          {loading ? (
            <div className="flex justify-center py-10 text-slate-400 text-xs">
              加载中...
            </div>
          ) : cards.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-20"
            >
              <Empty description="暂无卡片数据" />
            </motion.div>
          ) : (
            groupedCards.map(([bankName, bankCards]) => (
              <div key={bankName} className="mb-6">
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className="w-1.5 h-4 bg-primary rounded-full" />
                  <h3 className="text-sm font-semibold text-slate-800">
                    {bankName}
                  </h3>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {bankCards.map((card) => (
                    <motion.div
                      layout
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      className="relative overflow-hidden rounded-2xl p-5 text-white shadow-lg"
                      style={{
                        background: getBankTheme(card.bankName, card.cardType),
                      }}
                    >
                      {/* 背景装饰 */}
                      <div className="absolute top--10 right--10 w-40 h-40 bg-white/10 rounded-full blur-3xl" />

                      <div className="relative flex flex-col h-32 justify-between">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-md">
                              {(() => {
                                const localLogo = getBankLogo(card.bankName);
                                const logoSrc = localLogo || card.bankLogo;
                                return logoSrc ? (
                                  <img
                                    src={logoSrc}
                                    alt=""
                                    className="w-6 h-6 object-contain"
                                  />
                                ) : (
                                  <div className="i-mdi-bank text-xl" />
                                );
                              })()}
                            </div>
                            <div>
                              <div className="text-sm font-medium opacity-90">
                                {card.bankName}
                              </div>
                              <div className="text-[10px] uppercase tracking-wider opacity-60">
                                {card.cardType === "credit"
                                  ? "信用卡"
                                  : "借记卡"}
                              </div>
                            </div>
                          </div>
                          <Button
                            fill="none"
                            className="p-0 min-w-0 h-auto text-white/60 hover:text-white"
                            onClick={() => handleDelete(card.id)}
                          >
                            <div className="i-mdi-trash-can-outline text-lg" />
                          </Button>
                        </div>

                        <div className="flex justify-between items-end">
                          <div className="space-y-1">
                            <div className="text-xs opacity-60">余额</div>
                            <div className="text-xl font-bold font-mono">
                              ¥{" "}
                              {Number(card.balance).toLocaleString("zh-CN", {
                                minimumFractionDigits: 2,
                              })}
                            </div>
                          </div>
                          <div className="text-lg font-mono tracking-widest opacity-90">
                            **** {card.lastFourDigits}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))
          )}
        </AnimatePresence>
      </div>

      <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-xl border-t border-slate-100 flex gap-4">
        <Button
          block
          color="primary"
          className="rounded-xl h-12 font-medium"
          onClick={() => navigate("/profile/cards/new")}
        >
          <div className="flex items-center justify-center gap-2">
            <div className="i-mdi-plus text-lg" />
            添加新卡片
          </div>
        </Button>
      </div>
    </motion.div>
  );
}

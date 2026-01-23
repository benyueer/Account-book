import { motion, LayoutGroup } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import { useSystemStore } from "../../stores/system.store";

const tabs = [
  { path: "/", label: "账单", icon: "i-mdi-wallet-outline" },
  { path: "/statistics", label: "统计", icon: "i-mdi-chart-bar" },
  { path: "/profile", label: "我的", icon: "i-mdi-account-outline" },
];

export const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tabBarVisible } = useSystemStore();

  return (
    <LayoutGroup id="sidebar-layout">
      {/* 居中定位容器：负责 fixed 定位和水平居中 */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] z-100 flex justify-center">
        {/* 动画容器：负责 y 轴位移和透明度 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: tabBarVisible ? 0 : 100,
            opacity: tabBarVisible ? 1 : 0,
          }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="w-full h-[64px] bg-white/25 backdrop-blur-xl rounded-2xl flex justify-around items-center px-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] overflow-hidden border border-white/20 ring-1 ring-white/30"
        >
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path;
            return (
              <div
                key={tab.path}
                className={`flex flex-col items-center justify-center cursor-pointer py-1 px-4 relative z-1 transition-colors duration-300 ${
                  isActive ? "text-indigo-600" : "text-slate-500"
                }`}
                onClick={() => navigate(tab.path)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue/20 rounded-full -z-10 shadow-sm"
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                )}

                <div className={`text-2xl mb-0.5 ${tab.icon} relative z-10`} />
                <div className="text-[10px] font-medium relative z-10">
                  {tab.label}
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </LayoutGroup>
  );
};

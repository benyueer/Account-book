import { motion } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";

const tabs = [
  { path: "/", label: "账单", icon: "i-mdi-wallet-outline" },
  { path: "/statistics", label: "统计", icon: "i-mdi-chart-bar" },
  { path: "/profile", label: "我的", icon: "i-mdi-account-outline" },
];

export const TabBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-[400px] h-[64px] bg-white/25 backdrop-blur-xl rounded-2xl flex justify-around items-center px-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] z-100 overflow-hidden border border-white/20 ring-1 ring-white/30">
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
                className="absolute inset-0 bg-blue/60 rounded-xl -z-10 shadow-sm"
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20
                }}
              />
            )}

            <div className={`text-2xl mb-0.5 ${tab.icon} relative z-10`} />
            <div className="text-[10px] font-medium relative z-10">{tab.label}</div>
          </div>
        );
      })}
    </div>
  );
};

import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router-dom";
import LiquidGlass from "../LiquidGlass";

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
      <AnimatePresence>
        {tabs.map((tab, index) => {
          const isActive = location.pathname === tab.path;
          return (
            <div
              key={tab.path}
              className={`flex flex-col items-center justify-center cursor-pointer py-1 px-4 relative z-1 transition-colors duration-300 ${
                isActive ? "text-indigo-600" : "text-slate-500"
              }`}
              onClick={() => navigate(tab.path)}
            >
              {/* Liquid glass effect */}
              {/* {isActive && (
                <div className="absolute inset-0 z-10 rounded-xl overflow-hidden">
                  <LiquidGlass
                  >
                    <div className="w-10 h-10"></div>
                  </LiquidGlass>
                </div>
              )} */}

              <div className={`text-2xl mb-0.5 ${tab.icon}`} />
              <div className="text-[10px] font-medium">{tab.label}</div>
            </div>
          );
        })}
      </AnimatePresence>
    </div>
  );
};

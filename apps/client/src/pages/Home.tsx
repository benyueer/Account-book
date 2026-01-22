import { motion } from "framer-motion";
import LiquidGlass from "liquid-glass-react";

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 min-h-full"
    >
      <h1 className="mb-4 text-2xl font-bold">账目列表</h1>
      <div className="flex flex-col gap-2">
        <div className="border border-white/10 rounded-xl bg-white/5 p-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span>日常饮食</span>
            <span className="text-red-400">-¥25.00</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

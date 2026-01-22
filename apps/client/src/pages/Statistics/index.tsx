import { motion } from "framer-motion";

export default function Statistics() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 min-h-full"
    >
      <h1 className="text-2xl font-600 mb-6 text-slate-800">统计</h1>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="h-[200px] bg-gradient-to-br from-indigo-500 to-violet-500 rounded-2xl flex items-center justify-center text-white font-600 mb-5 shadow-sm"
      >
        消费趋势图
      </motion.div>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div>本月支出</div>
          <div className="text-xl font-bold text-red-500">¥0.00</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="bg-white rounded-xl p-4 shadow-sm"
        >
          <div>本月收入</div>
          <div className="text-xl font-bold text-emerald-500">¥0.00</div>
        </motion.div>
      </div>

      {/* 这里可以添加更多统计内容 */}
    </motion.div>
  );
}

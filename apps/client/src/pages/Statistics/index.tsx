import { motion } from 'framer-motion'

export default function Statistics() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-full p-4"
    >
      <h1 className="mb-6 text-2xl text-slate-800 font-600">统计</h1>

      <motion.div
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="mb-5 h-[200px] flex items-center justify-center rounded-2xl from-indigo-500 to-violet-500 bg-gradient-to-br text-white font-600 shadow-sm"
      >
        消费趋势图
      </motion.div>

      <div className="grid grid-cols-2 mb-5 gap-4">
        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl bg-white p-4 shadow-sm"
        >
          <div>本月支出</div>
          <div className="text-xl text-red-500 font-bold">¥0.00</div>
        </motion.div>

        <motion.div
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          className="rounded-xl bg-white p-4 shadow-sm"
        >
          <div>本月收入</div>
          <div className="text-xl text-emerald-500 font-bold">¥0.00</div>
        </motion.div>
      </div>

      {/* 这里可以添加更多统计内容 */}
    </motion.div>
  )
}

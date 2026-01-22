import { motion } from "framer-motion";

export default function Profile() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="p-4 min-h-full"
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="bg-white rounded-2xl p-6 flex items-center mb-5 shadow-sm"
      >
        <div className="w-[60px] h-[60px] rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white text-2xl font-bold mr-4">
          用
        </div>
        <div className="flex-1">
          <h2 className="text-lg font-600 m-0 mb-1 text-slate-800">用户名</h2>
          <p className="text-sm text-slate-500 m-0">user@example.com</p>
        </div>
      </motion.div>

      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        <MenuItem icon="📊" text="月度报告" />
        <MenuItem icon="⚙️" text="设置" />
        <MenuItem icon="❓" text="帮助与反馈" isLast />
      </div>
    </motion.div>
  );
}

function MenuItem({
  icon,
  text,
  isLast = false,
}: {
  icon: string;
  text: string;
  isLast?: boolean;
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      className={`p-4 px-5 flex items-center justify-between cursor-pointer active:bg-slate-50 ${
        !isLast ? "border-b border-slate-100" : ""
      }`}
    >
      <div className="flex items-center">
        <span className="text-xl mr-3">{icon}</span>
        <span className="flex-1 text-base text-slate-800">{text}</span>
      </div>
      <span className="text-slate-400">›</span>
    </motion.div>
  );
}

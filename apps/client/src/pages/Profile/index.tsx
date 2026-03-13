import { motion } from 'framer-motion'
import { Outlet, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../stores/auth.store.ts'

export default function Profile() {
  const navigate = useNavigate()
  const user = useAuthStore(state => state.user)
  const logout = useAuthStore(state => state.logout)

  const handleLogout = () => {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      transition={{ duration: 0.3 }}
      className="min-h-full p-4"
    >
      <motion.div
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.98 }}
        className="mb-5 flex items-center rounded-2xl bg-white p-6 shadow-sm"
      >
        <div className="mr-4 h-[60px] w-[60px] flex items-center justify-center rounded-full from-indigo-500 to-violet-500 bg-gradient-to-br text-2xl text-white font-bold">
          用
        </div>
        <div className="flex-1">
          <h2 className="m-0 mb-1 text-lg text-slate-800 font-600">{user?.name}</h2>
        </div>
      </motion.div>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">
        <MenuItem icon="💳" text="卡片管理" onClick={async () => navigate('/profile/cards')} />
        <MenuItem
          icon="📥"
          text="导入账单"
          onClick={async () => navigate('/profile/import-records')}
        />
      </div>

      <motion.div
        whileTap={{ scale: 0.98 }}
        onClick={handleLogout}
        className="mt-6 flex cursor-pointer items-center justify-center rounded-2xl bg-white p-4 text-red-500 shadow-sm active:bg-red-50"
      >
        <span className="mr-2 text-xl">🚪</span>
        <span className="text-base font-500">退出登录</span>
      </motion.div>
      <Outlet />
    </motion.div>
  )
}

function MenuItem({
  icon,
  text,
  isLast = false,
  onClick,
}: {
  icon: string
  text: string
  isLast?: boolean
  onClick?: () => void
}) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={`flex cursor-pointer items-center justify-between p-4 px-5 active:bg-slate-50 ${
        !isLast ? 'border-b border-slate-100' : ''
      }`}
    >
      <div className="flex items-center">
        <span className="mr-3 text-xl">{icon}</span>
        <span className="flex-1 text-base text-slate-800">{text}</span>
      </div>
      <span className="text-slate-400">›</span>
    </motion.div>
  )
}

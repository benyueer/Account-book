import { LayoutGroup, motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSystemStore } from '../../stores/system.store'

const tabs = [
  { path: '/', label: '账单', icon: 'i-mdi-wallet-outline' },
  { path: '/statistics', label: '统计', icon: 'i-mdi-chart-bar' },
  { path: '/profile', label: '我的', icon: 'i-mdi-account-outline' },
]

export function TabBar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { tabBarVisible } = useSystemStore()

  return (
    <LayoutGroup id="sidebar-layout">
      {/* 居中定位容器：负责 fixed 定位和水平居中 */}
      <div className="fixed bottom-6 left-1/2 z-100 max-w-[400px] w-[90%] flex justify-center -translate-x-1/2">
        {/* 动画容器：负责 y 轴位移和透明度 */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{
            y: tabBarVisible ? 0 : 100,
            opacity: tabBarVisible ? 1 : 0,
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="h-[64px] w-full flex items-center justify-around overflow-hidden border border-white/20 rounded-2xl bg-white/25 px-2 shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] ring-1 ring-white/30 backdrop-blur-xl"
        >
          {tabs.map((tab) => {
            const isActive = location.pathname === tab.path
            return (
              <div
                key={tab.path}
                className={`relative z-1 flex flex-col cursor-pointer items-center justify-center px-4 py-1 transition-colors duration-300 ${
                  isActive ? 'text-indigo-600' : 'text-slate-500'
                }`}
                onClick={async () => navigate(tab.path)}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 rounded-full bg-blue/20 shadow-sm -z-10"
                    transition={{
                      type: 'spring',
                      stiffness: 300,
                      damping: 20,
                    }}
                  />
                )}

                <div className={`mb-0.5 text-2xl ${tab.icon} relative z-10`} />
                <div className="relative z-10 text-[10px] font-medium">
                  {tab.label}
                </div>
              </div>
            )
          })}
        </motion.div>
      </div>
    </LayoutGroup>
  )
}

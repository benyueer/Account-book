import { Outlet } from 'react-router-dom'
import { useSystemStore } from '../../stores/system.store'
import { TabBar } from './TabBar'

export function Layout() {
  const tabBarVisible = useSystemStore(state => state.tabBarVisible)

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-slate-50">
      <main className="mx-auto w-full">
        <Outlet />
      </main>
      {tabBarVisible && <TabBar key="tabbar" />}
    </div>
  )
}

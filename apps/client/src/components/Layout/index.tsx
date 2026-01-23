import { Outlet } from "react-router-dom";
import { TabBar } from "./TabBar";
import { useSystemStore } from "../../stores/system.store";

export const Layout = () => {
  const tabBarVisible = useSystemStore((state) => state.tabBarVisible);

  return (
    <div className="min-h-screen bg-slate-50 relative pb-[100px] overflow-x-hidden w-full">
      <main className="mx-auto w-full">
        <Outlet />
      </main>
      {tabBarVisible && <TabBar key="tabbar" />}
    </div>
  );
};

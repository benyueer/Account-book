import { Outlet } from "react-router-dom";
import { TabBar } from "./TabBar";

export const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-50 relative pb-[100px] overflow-x-hidden w-full">
      <main className="px-4 pb-[100px] max-w-[600px] mx-auto w-full">
        <Outlet />
      </main>
      <TabBar />
    </div>
  );
};

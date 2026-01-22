import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
// PWA 自动更新逻辑
import { registerSW } from "virtual:pwa-register";
import { router } from "./router/index.tsx";
import "./index.css";

import "virtual:uno.css";

const queryClient = new QueryClient();

registerSW({
  onOfflineReady() {
    console.warn("App ready to work offline");
  },
  onNeedRefresh() {
    console.warn("New content available, click to refresh");
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>,
);

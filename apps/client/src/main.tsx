import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { registerSW } from "virtual:pwa-register";
import { router } from "./router/index.tsx";
import "./index.css";

import "virtual:uno.css";
import { AliveScope } from "react-activation";

const queryClient = new QueryClient();

registerSW({
  onOfflineReady() {
    console.warn("App ready to work offline");
  },
  onNeedRefresh() {
    console.warn("New content available, click to refresh");
  },
});

const container = document.getElementById("root");
const root = createRoot(container!);

root.render(
  <QueryClientProvider client={queryClient}>
    <AliveScope>
      <RouterProvider router={router} />
    </AliveScope>
  </QueryClientProvider>,
);

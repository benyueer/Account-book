import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toast, unstableSetRender } from 'antd-mobile'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { registerSW } from 'virtual:pwa-register'
import { router } from './router/index.tsx'
import './index.css'

import 'virtual:uno.css'

unstableSetRender((node, container) => {
  const containerExt = container as any
  containerExt._reactRoot ||= createRoot(container)
  const root = containerExt._reactRoot
  root.render(node)
  return async () => {
    await new Promise((resolve) => setTimeout(resolve, 0))
    root.unmount()
  }
})

function handleGlobalError(error: any) {
  const message = error.message || '请求失败，请稍后重试'
  Toast.show({
    content: message,
    position: 'top',
  })
}

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleGlobalError,
  }),
  mutationCache: new MutationCache({
    onError: handleGlobalError,
  }),
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

registerSW({
  onOfflineReady() {
    console.warn('App ready to work offline')
  },
  onNeedRefresh() {
    console.warn('New content available, click to refresh')
  },
})

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
  </QueryClientProvider>,
)

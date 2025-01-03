import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/layout/main-layout/index.tsx'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AnalysisProvider } from './components/context-provider.tsx'
import { ThemeProvider } from './components/theme-provider.tsx'
import { Toaster } from './components/ui/sonner.tsx'
import './index.css'
import Analysis from './pages/analysis/index.tsx'
import Items from './pages/analysis/items/index.tsx'
import Students from './pages/analysis/students/student-table/index.tsx'
import { ResetPasswordPage } from './pages/authorization/reset-password.tsx'
import { SignInPage } from './pages/authorization/sign-in.tsx'
import { SignUpPage } from './pages/authorization/sign-up.tsx'
import { VerifyMailPage } from './pages/authorization/verify-mail.tsx'
import DashBoard from './pages/dashboard/index.tsx'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      refetchOnMount: false,
    },
  },
})

const mainRoutes = [
  { index: true, element: <DashBoard /> },
  { path: 'settings', element: <div>Settings</div> },
  { path: 'analysis/:id', element: <Analysis /> },
  { path: 'analysis/:id/students', element: <Students /> },
  { path: 'analysis/:id/items', element: <Items /> },
  { path: 'history', element: <div>History</div> },
]

const authRoutes = [
  { path: 'signin', element: <SignInPage /> },
  { path: 'signup', element: <SignUpPage /> },
  { path: 'forgot-password', element: <ResetPasswordPage /> },
  { path: 'verify-mail', element: <VerifyMailPage /> },
]

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <div>Not Found</div>,
    children: mainRoutes,
  },
  ...authRoutes,
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <AnalysisProvider>
          <RouterProvider router={router} />
        </AnalysisProvider>
      </ThemeProvider>
      <Toaster />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
)

import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router'
import type { ReactNode } from 'react'
import { ThemeProvider } from '@/components/theme-provider'
import '@/globals.css'
import '@fontsource/inter'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: "Jean Gérard Bousiquot - Software Engineer & Mentor",
      },
    ],
  }),
  component: RootComponent,
})

function RootComponent() {
  return (
    <RootDocument>
      <Outlet />
    </RootDocument>
  )
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <div className="max-w-7xl mx-auto bg-background shadow-xl min-h-screen">
            {children}
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  )
}

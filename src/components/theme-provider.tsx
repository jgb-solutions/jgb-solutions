import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

export type ResolvedTheme = 'dark' | 'light'
export type Theme = ResolvedTheme | 'system'

interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

interface ThemeProviderState {
  theme: Theme
  resolvedTheme: ResolvedTheme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeProviderState = {
  theme: 'system',
  resolvedTheme: 'light',
  setTheme: () => null,
}

const ThemeProviderContext = createContext<ThemeProviderState>(initialState)

const isBrowser = typeof window !== 'undefined'

export function ThemeProvider({
  children,
  defaultTheme = 'system',
  storageKey = 'vite-ui-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    if (isBrowser) {
      const stored = localStorage.getItem(storageKey) as Theme
      if (stored) setTheme(stored)
    }
  }, [storageKey])
  const [resolvedTheme, setResolvedTheme] = useState<ResolvedTheme>('light')

  useEffect(() => {
    const root = window.document.documentElement
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    function updateTheme() {
      root.classList.remove('light', 'dark')
      if (theme === 'system') {
        const systemTheme = mediaQuery.matches ? 'dark' : 'light'
        setResolvedTheme(systemTheme)
        root.classList.add(systemTheme)
        return
      }

      setResolvedTheme(theme)
      root.classList.add(theme)
    }

    mediaQuery.addEventListener('change', updateTheme)
    updateTheme()

    return () => mediaQuery.removeEventListener('change', updateTheme)
  }, [theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      setTheme: (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme)
        setTheme(newTheme)
      },
    }),
    [theme, resolvedTheme, storageKey]
  )

  return (
    <ThemeProviderContext.Provider value={value}>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function() {
              try {
                var storageKey = "${storageKey}";
                var defaultTheme = "${defaultTheme}";
                var theme = localStorage.getItem(storageKey);
                var support = window.matchMedia("(prefers-color-scheme: dark)").matches === true;

                var systemTheme = support ? "dark" : "light";
                var effectiveTheme = theme === "system" ? systemTheme : (theme || defaultTheme);

                if (effectiveTheme === "dark") {
                  document.documentElement.classList.add("dark");
                } else {
                  document.documentElement.classList.remove("dark");
                }
              } catch (e) {}
            })()
          `,
        }}
      />
      {children}
    </ThemeProviderContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeProviderContext)

  if (context === undefined) throw new Error('useTheme must be used within a ThemeProvider')

  return context
}

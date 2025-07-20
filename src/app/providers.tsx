import { ThemeProvider } from 'next-themes';

// A wrapper that bootstraps next-themes and any other providers
export const AppProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
);

import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import { Fira_Code } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';

import { TodoStoreProvider } from '@/providers/todo-store-provider';

const fira = Fira_Code({ subsets: ['cyrillic'] });

export const metadata: Metadata = {
  title: 'Todo App',
};

const theme = createTheme({
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <head>
        <meta charSet="UTF-8"/>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <title>ToDo app</title>

        <ColorSchemeScript/>
      </head>
    <body className={fira.className}>
      <TodoStoreProvider>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </TodoStoreProvider>
    </body>
    </html>
  );
}

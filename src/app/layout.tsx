import type { Metadata } from 'next';
import { MantineProvider, ColorSchemeScript, createTheme } from '@mantine/core';
import { Inter } from 'next/font/google';
import '@mantine/core/styles.css';
import './globals.css';

import { TodoStoreProvider } from '@/providers/todo-store-provider';

const inter = Inter({ subsets: ['latin'] });

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
    <body className={inter.className}>
      <TodoStoreProvider>
        <MantineProvider theme={theme}>
          {children}
        </MantineProvider>
      </TodoStoreProvider>
    </body>
    </html>
  );
}

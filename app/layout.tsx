import type { Metadata } from 'next';
import './styles/globals.scss';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Pomo Stamp',
  description: 'A nice pomodoro stamp app',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body><Providers>{children}</Providers></body>
    </html>
  );
}

import type { Metadata } from 'next';
import './styles/globals.scss';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Pomo Stamp — 小さな集中を記録する',
  description: '毎日の集中と達成を、シンプルに記録するPomodoroログ',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

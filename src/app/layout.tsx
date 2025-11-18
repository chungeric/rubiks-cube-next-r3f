import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import '../styles/globals.scss';

const jetBrainsMono = JetBrains_Mono({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "R3F Rubik's Cube",
  description: "A Rubik's Cube built with React Three Fiber",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jetBrainsMono.className}>{children}</body>
    </html>
  );
}

import '@/app/globals.css';
import { Inter } from 'next/font/google';
import type { Metadata } from "next";


const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "CampusCart",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Add your favicon here */}
        <link rel="icon" href="/images/images.png" />
        <title>CampusCart</title>
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}

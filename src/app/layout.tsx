"use client";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import UserInterceptorProvider from "@/service/network/UserInterceptorProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient();

  return (
    <html lang="en" className="bg-white">
      <UserInterceptorProvider />
      <QueryClientProvider client={queryClient}>
        <body className={inter.className}>{children}</body>
      </QueryClientProvider>
    </html>
  );
}

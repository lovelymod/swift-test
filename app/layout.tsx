import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.scss";

import { AntdRegistry } from "@ant-design/nextjs-registry";

import Topbar from "@/components/Topbar";
import ReduxProvider from "@/providers/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Swift Test",
  description: "Phichak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      <AntdRegistry>
        <html lang="en">
          <body className={inter.className}>
            <Topbar />
            {children}
          </body>
        </html>
      </AntdRegistry>
    </ReduxProvider>
  );
}

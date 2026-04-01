import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "motoquan | 摩托产业媒体平台",
  description: "以明亮、现代的行业媒体风格呈现新车发布、产业快讯、技术工程、装备指南与改装工场内容。"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}

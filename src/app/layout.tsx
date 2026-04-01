import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "摩托圈 | Motorcycle Circle",
  description: "面向摩托产业从业者与高频骑士的内容平台。聚焦新车发布、行业快讯、技术工程、装备指南与改装工场。"
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

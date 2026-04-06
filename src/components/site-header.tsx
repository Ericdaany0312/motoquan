'use client';
import { useState } from "react";
import Link from "next/link";
import { categoryMeta } from "@/lib/articles";
import { CategoryIcon } from "./category-icon";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export function SiteHeader() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push("/");
    router.refresh();
  };

  return (
    <>
      {/* ===== HEADER ===== */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E4E6EF]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
              <img
                src="/motoquan-logo.png"
                alt="摩托圈"
                className="h-[50px] w-auto"
              />
              <div className="hidden sm:block">
                <span className="text-sm font-semibold text-[#1A1A2E]">摩托圈</span>
                <span className="ml-2 text-xs text-[#9CA3AF] tracking-widest">Moto Circle</span>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden xl:flex items-center gap-2 whitespace-nowrap">
              <Link
                href="/"
                className="px-4 py-2 text-sm font-medium text-[#6B7280] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
              >
                首页
              </Link>
              <Link
                href="/articles"
                className="px-4 py-2 text-sm font-medium text-[#6B7280] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
              >
                文章流
              </Link>
              <Link
                href="/businesses"
                className="px-4 py-2 text-sm font-medium text-[#6B7280] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
              >
                供应商黄页
              </Link>
              {user ? (
                <>
                  <Link
                    href="/user"
                    className="px-4 py-2 text-sm font-medium text-[#FF6B35] rounded-full transition-colors hover:bg-[#FF6B35]/10"
                  >
                    用户中心
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="px-4 py-2 text-sm font-medium text-[#9CA3AF] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
                  >
                    退出
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="px-4 py-2 text-sm font-medium text-[#9CA3AF] rounded-full transition-colors hover:bg-[#F5F6FA] hover:text-[#1A1A2E]"
                >
                  登录
                </Link>
              )}
            </nav>

            {/* Hamburger */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="xl:hidden p-2 rounded-lg hover:bg-[#F5F6FA] transition"
              aria-label="菜单"
            >
              {mobileOpen ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#1A1A2E" strokeWidth="2.5">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* ===== CATEGORY STRIP — second row on mobile, beside nav on desktop ===== */}
      <div className="border-b border-[#F5F6FA] bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Desktop: shown beside logo area */}
          <div className="hidden xl:flex items-center gap-1 py-2 overflow-x-auto">
            <Link
              href="/articles"
              className="flex min-w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-[#1A1A2E] text-white transition-colors hover:bg-[#2d2d4a]"
            >
              全部
            </Link>
            {categoryMeta.map((item) => (
              <Link
                key={item.label}
                href={`/articles?category=${encodeURIComponent(item.label)}`}
                className="flex min-w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-colors hover:opacity-80 whitespace-nowrap"
                style={{ backgroundColor: item.softColor, color: item.color }}
              >
                <CategoryIcon icon={item.icon} className="w-3.5 h-3.5" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile: horizontally scrollable second row */}
          <div className="xl:hidden hide-scrollbar flex items-center gap-1.5 py-2 overflow-x-auto">
            <Link
              href="/articles"
              className="flex min-w-fit items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold bg-[#1A1A2E] text-white flex-shrink-0"
            >
              全部
            </Link>
            {categoryMeta.map((item) => (
              <Link
                key={item.label}
                href={`/articles?category=${encodeURIComponent(item.label)}`}
                className="flex min-w-fit items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold transition-colors hover:opacity-80 flex-shrink-0"
                style={{ backgroundColor: item.softColor, color: item.color }}
              >
                <CategoryIcon icon={item.icon} className="w-3 h-3" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ===== MOBILE MENU (overlay) ===== */}
      {mobileOpen && (
        <div className="xl:hidden fixed inset-0 top-[104px] bg-white z-50 overflow-y-auto">
          <div className="mx-auto max-w-7xl px-4 py-5">
            <nav className="space-y-1">
              {[
                { label: "首页", href: "/" },
                { label: "文章流", href: "/articles" },
                { label: "供应商黄页", href: "/businesses" },
                ...(user
                  ? [
                      { label: "用户中心", href: "/user" },
                      { label: "退出", href: "#", action: "signout" },
                    ]
                  : [{ label: "登录", href: "/login" }]),
              ].map((item) =>
                item.action === "signout" ? (
                  <button
                    key={item.label}
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-3 text-sm font-medium text-[#6B7280] rounded-lg hover:bg-[#F5F6FA] transition"
                  >
                    {item.label}
                  </button>
                ) : (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-3 text-sm font-medium text-[#6B7280] rounded-lg hover:bg-[#F5F6FA] transition"
                  >
                    {item.label}
                  </Link>
                )
              )}
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

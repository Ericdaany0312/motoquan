import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md rounded-[32px] border border-white/10 bg-white/[0.03] p-8 text-center">
        <p className="text-xs tracking-[0.24em] text-accent">404</p>
        <h1 className="mt-3 text-3xl font-semibold text-white">页面未找到</h1>
        <p className="mt-4 text-sm leading-7 text-inkMuted">
          该内容可能已下线或链接有误，请返回内容列表继续浏览。
        </p>
        <Link
          href="/articles"
          className="mt-6 inline-flex rounded-full bg-accentStrong px-5 py-3 text-sm text-white"
        >
          返回文章列表
        </Link>
      </div>
    </div>
  );
}

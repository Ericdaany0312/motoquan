import Link from "next/link";
import { CategoryIcon } from "@/components/category-icon";
import { categoryMeta } from "@/lib/articles";

type CategoryTabsProps = {
  categories: string[];
  current: string;
  basePath: string;
};

export function CategoryTabs({ categories, current, basePath }: CategoryTabsProps) {
  const tabs = ["全部", ...categories];

  return (
    <div className="hide-scrollbar flex gap-3 overflow-x-auto pb-1">
      {tabs.map((tab) => {
        const href = tab === "全部" ? basePath : `${basePath}?category=${encodeURIComponent(tab)}`;
        const active = tab === current;
        const meta = categoryMeta.find((item) => item.label === tab);

        return (
          <Link
            key={tab}
            href={href}
            className={[
              "flex min-w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-medium transition",
              active
                ? "border-transparent text-white shadow-card"
                : "border-line bg-surface text-heading hover:-translate-y-0.5 hover:border-heading/10"
            ].join(" ")}
            style={
              active
                ? { backgroundColor: meta?.color ?? "#1A1A2E" }
                : meta
                  ? { backgroundColor: meta.softColor }
                  : { backgroundColor: "#FFFFFF" }
            }
          >
            {meta ? (
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/80">
                <CategoryIcon icon={meta.icon} className="h-3.5 w-3.5" />
              </span>
            ) : (
              <span className="h-2.5 w-2.5 rounded-full bg-secondary" />
            )}
            <span>{tab}</span>
          </Link>
        );
      })}
    </div>
  );
}

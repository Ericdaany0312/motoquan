type CategoryIconName = "wheel" | "engine" | "helmet" | "wrench" | "flash";

type CategoryIconProps = {
  icon: CategoryIconName;
  className?: string;
};

export function CategoryIcon({ icon, className }: CategoryIconProps) {
  const classes = className ?? "h-4 w-4";

  switch (icon) {
    case "wheel":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={classes}>
          <circle cx="12" cy="12" r="7" />
          <circle cx="12" cy="12" r="2.5" />
          <path d="M12 5v4M5 12h4M12 15v4M15 12h4M7.2 7.2l2.8 2.8M16.8 7.2 14 10M7.2 16.8 10 14M16.8 16.8 14 14" />
        </svg>
      );
    case "engine":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={classes}>
          <path d="M4 10h7l2-2h3l1 2h3v7h-4l-2 2H8l-2-2H4z" />
          <path d="M8 10V7h5M17 10V7M10 14h4" />
        </svg>
      );
    case "helmet":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={classes}>
          <path d="M5 14a7 7 0 1 1 14 0v2h-6l-2 3H8v-3H5z" />
          <path d="M13 10h4" />
        </svg>
      );
    case "wrench":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={classes}>
          <path d="M14 5a4 4 0 0 0 5 5L11 18l-4 1 1-4 8-8Z" />
          <path d="m13 6 5 5" />
        </svg>
      );
    case "flash":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className={classes}>
          <path d="M13 2 5 13h5l-1 9 8-11h-5z" />
        </svg>
      );
  }
}

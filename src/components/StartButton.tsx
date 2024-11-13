import Link from "next/link";

type Size = "small" | "medium" | "large" | "huge";

type SuccessType = {
  size: Size;
  href: string;
};

export default function StartButton({ href, size }: SuccessType) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md transition-all cursor-pointer flex gap-1";

  const sizeClasses: Record<Size, string> = {
    small: "px-2 py-1 text-sm",
    medium: "px-6 py-2",
    large: "px-6 py-3 text-lg",
    huge: "px-6 py-4 text-lg md:text-2xl lg:text-3xl",
  };

  const variantClasses = {
    default: "bg-yellow-200 hover:bg-yellow-300 text-black",
  };

  const classes = `${baseClasses} ${variantClasses.default} ${sizeClasses[size]}`;

  return (
    <div className="">
      <Link href={href} className={classes}>
        Create recording
      </Link>
    </div>
  );
}

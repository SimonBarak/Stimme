import Link from "next/link";

type Size = "small" | "medium" | "large" | "huge";

type SuccessType = {
  size: Size;
  href: string;
  text: string;
  variant: "default" | "bold";
};

export default function StartButton({
  href,
  size,
  text,
  variant,
}: SuccessType) {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl transition-all cursor-pointer flex gap-1 font-medium tracking-wide antialiased text-center leading-none";

  const sizeClasses: Record<Size, string> = {
    small: "px-2 py-1 text-sm",
    medium: "px-6 py-4",
    large: "px-6 py-4 text-lg",
    huge: "px-6 py-4 text-lg md:text-2xl lg:text-3xl",
  };

  const variantClasses = {
    default: "bg-yellow-200 hover:bg-yellow-300 text-black",
    bold: "bg-black hover:bg-gray-700 text-white",
  };

  const classes = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]}`;

  return (
    <div className="">
      <Link href={href} className={classes}>
        {text}
      </Link>
    </div>
  );
}

import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";
import React from "react";

const buttonVariants = {
  base: "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  variants: {
    default: "bg-green-500 text-green-600-foreground hover:bg-green-600/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-green-600 underline-offset-4 hover:underline",
  },
  sizes: {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  },
};

const cn = (...classes) => twMerge(classes.filter(Boolean).join(" "));

const Button = forwardRef(
  (
    {
      className,
      variant = "default",
      size = "default",
      asChild = false,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? "span" : "button";

    const variantClasses = buttonVariants.variants[variant] || "";
    const sizeClasses = buttonVariants.sizes[size] || "";
    const combinedClasses = cn(
      buttonVariants.base,
      variantClasses,
      sizeClasses,
      className
    );

    return (
      <Comp ref={ref} className={combinedClasses} {...props}>
        {children}
      </Comp>
    );
  }
);

Button.displayName = "Button";

export { Button };

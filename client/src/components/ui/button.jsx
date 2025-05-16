import React from "react"
import { cn } from "@/lib/utils"

// interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
//   variant?: "primary" | "secondary" | "outline" | "ghost" | "link" | "danger"
//   size?: "sm" | "md" | "lg" | "icon"
//   isLoading?: boolean
//   leftIcon?: React.ReactNode
//   rightIcon?: React.ReactNode
// }

const Button =(
  
    {
      className,
      children,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      disabled,
      ...props
    },
    ref,
  ) => {
    const variants = {
      primary: "bg-orange-500 hover:bg-orange-600 text-white",
      secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800",
      outline: "border border-gray-300 hover:bg-gray-100 text-gray-800",
      ghost: "hover:bg-gray-100 text-gray-800",
      link: "text-orange-500 hover:underline p-0 h-auto",
      danger: "bg-red-500 hover:bg-red-600 text-white",
    }

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded",
      md: "text-sm px-4 py-2 rounded-md",
      lg: "text-base px-6 py-3 rounded-md",
      icon: "p-2 rounded-md",
    }

    return (
      <button
        className={cn(
          "font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none",
          variants[variant],
          sizes[size],
          className,
        )}
        disabled={disabled || isLoading}
        ref={ref}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
      </button>
    )
  }


// Button.displayName = "Button"

export { Button }

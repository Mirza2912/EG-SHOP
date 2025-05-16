import React from "react"
import { cn } from "@/lib/utils"

// interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
//   size?: "xs" | "sm" | "md" | "lg" | "xl"
// }

const Avatar = (
  ({ className, size = "md", ...props }, ref) => {
    const sizeClasses = {
      xs: "h-6 w-6",
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    }

    return (
      <div
        className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}
        ref={ref}
        {...props}
      />
    )
  }
)

Avatar.displayName = "Avatar"

// interface AvatarImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {}

const AvatarImage = (
  ({ className, ...props }, ref) => {
    return (
      <img
        className={cn("h-full w-full object-cover", className)}
        ref={ref}
        {...props}
      />
    )
  }
)

AvatarImage.displayName = "AvatarImage"

// interface AvatarFallbackProps extends React.HTMLAttributes<HTMLDivElement> {}

const AvatarFallback = (
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "h-full w-full flex items-center justify-center bg-gray-200 text-gray-700 font-medium",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)

AvatarFallback.displayName = "AvatarFallback"

export { Avatar, AvatarImage, AvatarFallback }

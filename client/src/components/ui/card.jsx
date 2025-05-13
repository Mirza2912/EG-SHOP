import React from "react";
import { cn } from "@/lib/utils";

// interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
//   padding?: "none" | "sm" | "md" | "lg"
//   bordered?: boolean
//   hoverable?: boolean
// }

const Card = React.forwardRef(
  (
    {
      className,
      children,
      padding = "md",
      bordered = true,
      hoverable = false,
      ...props
    },
    ref
  ) => {
    const paddingMap = {
      none: "p-0",
      sm: "p-3",
      md: "p-5",
      lg: "p-7",
    };

    return (
      <div
        className={cn(
          "bg-white rounded-lg shadow-sm",
          bordered && "border border-gray-200",
          hoverable && "transition-shadow duration-200 hover:shadow-md",
          paddingMap[padding],
          className
        )}
        ref={ref}
        {...props}
      >
        {children}
      </div>
    );
  }
);
// Card.displayName = "Card"

// interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardHeader = ({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex flex-col space-y-1.5 pb-4 border-b border-gray-200 mb-4",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

// CardHeader.displayName = "CardHeader"

// interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const CardTitle = ({ className, children, ...props }, ref) => {
  return (
    <h3 className={cn("text-lg font-semibold", className)} ref={ref} {...props}>
      {children}
    </h3>
  );
};

// CardTitle.displayName = "CardTitle"

// interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {}

const CardDescription = React.forwardRef(
  ({ className, children, ...props }, ref) => {
    return (
      <p
        className={cn("text-sm text-gray-500", className)}
        ref={ref}
        {...props}
      >
        {children}
      </p>
    );
  }
);

// CardDescription.displayName = "CardDescription"

// interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardContent = ({ className, children, ...props }, ref) => {
  return (
    <div className={cn("", className)} ref={ref} {...props}>
      {children}
    </div>
  );
};

// CardContent.displayName = "CardContent"

// interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {}

const CardFooter = ({ className, children, ...props }, ref) => {
  return (
    <div
      className={cn(
        "flex items-center pt-4 border-t border-gray-200 mt-4",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </div>
  );
};

// CardFooter.displayName = "CardFooter"

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};

import React from "react"
import { cn } from "@/lib/utils"

// export interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
//   label?: string
//   description?: string
// }

const Checkbox = React.forwardRef(
  ({ className, label, description, ...props }, ref) => {
    return (
      <div className="flex items-start">
        <div className="flex items-center h-5">
          <input
            type="checkbox"
            className={cn("h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500", className)}
            ref={ref}
            {...props}
          />
        </div>
        {(label || description) && (
          <div className="ml-3 text-sm">
            {label && (
              <label htmlFor={props.id} className="font-medium text-gray-700">
                {label}
              </label>
            )}
            {description && <p className="text-gray-500">{description}</p>}
          </div>
        )}
      </div>
    )
  }
)

// Checkbox.displayName = "Checkbox"

export { Checkbox }

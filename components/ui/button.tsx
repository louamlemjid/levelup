import * as React from "react"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined" | "text"
  size?: "sm" | "md" | "lg"
  disabled?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "filled", size = "md", disabled = false, ...props }, ref) => {
    return (
      <button
        className={cn(
          // Base styles - sharp edges, modern typography
          "inline-flex items-center justify-center whitespace-nowrap font-medium",
          "transition-all duration-200 ease-in-out",
          "focus:outline-none focus:ring-2 focus:ring-offset-2",
          "active:scale-95",
          "disabled:pointer-events-none disabled:opacity-50",
          
          // Size variants
          {
            "h-8 px-3 text-xs": size === "sm",
            "h-10 px-4 text-sm": size === "md", 
            "h-12 px-6 text-base": size === "lg",
          },
          
          // Variant styles
          {
            // Filled variant
            "bg-foreground text-background hover:bg-foreground/90 focus:ring-foreground/20":
              variant === "filled" && !disabled,
            
            // Outlined variant  
            "border-2 border-foreground text-foreground bg-transparent hover:bg-foreground hover:text-background focus:ring-foreground/20":
              variant === "outlined" && !disabled,
            
            // Text variant
            "text-foreground bg-transparent hover:bg-foreground/10 focus:ring-foreground/20":
              variant === "text" && !disabled,
            
            // Disabled styles for all variants
            "bg-foreground/30 text-background/60 cursor-not-allowed":
              variant === "filled" && disabled,
            "border-2 border-foreground/30 text-foreground/30 bg-transparent cursor-not-allowed":
              variant === "outlined" && disabled,
            "text-foreground/30 bg-transparent cursor-not-allowed":
              variant === "text" && disabled,
          },
          
          className
        )}
        disabled={disabled}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }

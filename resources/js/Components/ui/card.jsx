import * as React from "react"
import { cn } from "@/lib/utils"

const Card = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "div",
    {
      ref,
      className: cn("rounded-lg border bg-card text-card-foreground shadow-sm", className),
      ...props,
    },
    props.children
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "div",
    {
      ref,
      className: cn("flex flex-col space-y-1.5 p-6", className),
      ...props,
    },
    props.children
  )
)
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "h2",
    {
      ref,
      className: cn("text-2xl font-semibold leading-none tracking-tight", className),
      ...props,
    },
    props.children
  )
)
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "p",
    {
      ref,
      className: cn("text-sm text-muted-foreground", className),
      ...props,
    },
    props.children
  )
)
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "div",
    {
      ref,
      className: cn("p-6 pt-0", className),
      ...props,
    },
    props.children
  )
)
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef(({ className, ...props }, ref) =>
  React.createElement(
    "div",
    {
      ref,
      className: cn("flex items-center p-6 pt-0", className),
      ...props,
    },
    props.children
  )
)
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }

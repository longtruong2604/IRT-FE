import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        destructive:
          'border-transparent bg-red-500 text-neutral-50 shadow hover:bg-red-500/80 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/80',
        outline: 'text-neutral-950 dark:text-neutral-50',

        veryEasy:
          'border-transparent bg-[#B3E5FC] text-[#3b8ddf] hover:bg-[#B3E5FC]/80 dark:bg-[#A3D4EC] dark:text-[#2b7dcf] dark:hover:bg-[#A3D4EC]/80',
        easy: 'border-transparent bg-[#C1ECFFC2] text-[#38BDF8] hover:bg-[#C1ECFFC2]/80 dark:bg-[#A9D8E7] dark:text-[#3098C8] dark:hover:bg-[#A9D8E7]/80',
        medium:
          'border-transparent bg-[#E9FAEF] text-[#24D164] hover:bg-[#E9FAEF]/80 dark:bg-[#D1F2D8] dark:text-[#1CA754] dark:hover:bg-[#D1F2D8]/80',
        hard: 'border-transparent bg-[#FFECDE] text-[#F6A723] hover:bg-[#FFECDE]/80 dark:bg-[#F4D6C5] dark:text-[#E76314] dark:hover:bg-[#F4D6C5]/80',
        veryHard:
          'border-transparent bg-[#FFEAEA] text-[#EF4444] hover:bg-[#FFEAEA]/80 dark:bg-[#F2CACA] dark:text-[#D83333] dark:hover:bg-[#F2CACA]/80',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
)

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }

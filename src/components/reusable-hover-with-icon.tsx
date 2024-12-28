import { ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'
import { CircleHelp } from 'lucide-react'

const HoverCardIcon = ({
  icon,
  children,
  size = 13,
  className = '',
}: {
  icon?: ReactNode
  size?: number
  children: ReactNode
  className?: string
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <span
          className={`text-gray-500 transition-colors duration-200 hover:text-blue-500 ${className}`}
        >
          {icon ? icon : <CircleHelp size={size} />}
        </span>
      </HoverCardTrigger>
      <HoverCardContent className="text-[14px] font-semibold leading-[1.6] tracking-[0.2px] text-muted-foreground">
        {children}
      </HoverCardContent>
    </HoverCard>
  )
}

export default HoverCardIcon

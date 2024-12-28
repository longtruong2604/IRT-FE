import { ReactNode } from 'react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from './ui/hover-card'

const HoverCardText = ({
  children,
  content,
  className = '',
}: {
  content: ReactNode
  children: ReactNode
  className?: string
}) => {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className={className}>{children}</div>
      </HoverCardTrigger>
      <HoverCardContent>{content}</HoverCardContent>
    </HoverCard>
  )
}

export default HoverCardText

import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { Item } from './MOCK_DATA'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'item_no',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Câu
          <ArrowUpDown />
        </Button>
      )
    },
    size: 150,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('item_no')}</div>
    ),
  },
  {
    accessorKey: 'key',
    header: 'Đáp án',
    size: 150,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('key')}</div>
    ),
  },
  {
    accessorKey: 'p_difficulty',
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Độ khó
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">
        {row.getValue('p_difficulty')}
      </div>
    ),
  },
  {
    accessorKey: 'p_discrimination',
    size: 200,
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Độ phân cách
          <ArrowUpDown />
        </Button>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('p_discrimination')}</div>
    ),
  },
  {
    accessorKey: 'difficulty',
    header: 'Phân loại',
    size: 200,
    cell: ({ row }) => {
      const value = row.getValue('p_difficulty') as number
      let displayValue, variant: BadgeProps['variant']
      if (value < 0.1) {
        displayValue = 'Quá dễ'
        variant = 'veryEasy'
      } else if (value < 0.3) {
        displayValue = 'Dễ'
        variant = 'easy'
      } else if (value < 0.5) {
        displayValue = 'Trung bình'
        variant = 'medium'
      } else if (value < 0.7) {
        displayValue = 'Khó'
        variant = 'hard'
      } else {
        displayValue = 'Quá khó'
        variant = 'veryHard'
      }
      return (
        <HoverCard>
          <HoverCardTrigger className="flex items-center justify-center">
            <Badge variant={variant}>{displayValue}</Badge>
          </HoverCardTrigger>
          <HoverCardContent>Có nghĩa là như thế nào</HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    accessorKey: 'discrimination',
    header: 'Phân cách',
    size: 200,
    cell: ({ row }) => {
      const value = row.getValue('p_discrimination') as number
      let displayValue, variant: BadgeProps['variant']
      if (value < 0.2) {
        displayValue = 'Kém'
        variant = 'veryHard'
      } else if (value <= 0.7) {
        displayValue = 'Tốt'
        variant = 'medium'
      } else {
        displayValue = 'Tạm được'
        variant = 'hard'
      }
      return (
        <HoverCard>
          <HoverCardTrigger className="flex items-center justify-center">
            <Badge variant={variant}>{displayValue}</Badge>
          </HoverCardTrigger>
          <HoverCardContent>Có nghĩa là như thế nào</HoverCardContent>
        </HoverCard>
      )
    },
  },
  {
    id: 'actions',
    enableHiding: false,
    size: 50,
    cell: () => {
      return (
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="sm" className="w-9 p-0">
            <ChevronDown className="h-4 w-4" />
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      )
    },
  },
]

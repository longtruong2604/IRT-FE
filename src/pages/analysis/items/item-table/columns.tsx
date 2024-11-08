import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import { Item } from './MOCK_DATA'
import { Badge } from '@/components/ui/badge'

export const columns: ColumnDef<Item>[] = [
  {
    accessorKey: 'item_no',
    header: 'Câu',
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue('item_no')}</div>
    ),
  },
  {
    accessorKey: 'key',
    header: 'Đáp án',
    cell: ({ row }) => <div className="capitalize">{row.getValue('key')}</div>,
  },
  {
    accessorKey: 'p_difficulty',
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
      <div className="capitalize">{row.getValue('p_difficulty')}</div>
    ),
  },
  {
    accessorKey: 'p_discrimination',
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
      <div className="lowercase">{row.getValue('p_discrimination')}</div>
    ),
  },
  {
    accessorKey: 'difficulty',
    header: 'Phân loại',
    cell: ({ row }) => {
      const value = row.getValue('p_difficulty') as number
      let displayValue
      if (value > 0.1 && value < 0.5) {
        displayValue = 'Easy'
      } else if (value >= 0.5) {
        displayValue = 'Medium'
      } else {
        displayValue = 'Hard'
      }
      return <Badge>{displayValue}</Badge>
    },
  },
  {
    accessorKey: 'discrimination',
    header: 'Phân cách',
    cell: ({ row }) => {
      const value = row.getValue('p_discrimination') as number
      let displayValue
      if (value > 0.1 && value < 0.5) {
        displayValue = 'Kém'
      } else if (value >= 0.5) {
        displayValue = 'Tốt'
      } else {
        displayValue = 'Tạm được'
      }
      return <Badge>{displayValue}</Badge>
    },
  },
  {
    id: 'actions',
    enableHiding: false,
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

import { Badge, BadgeProps } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CollapsibleTrigger } from '@/components/ui/collapsible'
import { ColumnDef } from '@tanstack/react-table'
import { ArrowUpDown, ChevronDown } from 'lucide-react'
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { OptionDetails } from '@/types/ctt-analysis.type'

type ColumnsType = {
  difficulty: number
  difficulty_category: string
  discrimination: number
  discrimination_category: string
  r_pbis: number
  options: {
    [optionKey: string]: OptionDetails
  }
  id: string
}

export const columns: ColumnDef<ColumnsType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }
                className="relative flex items-center justify-center" // Padding to make space for the arrow
              >
                <span className="absolute -right-2 flex items-center">
                  <ArrowUpDown />
                </span>
                Câu
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>Câu hỏi</HoverCardContent>
          </HoverCard>
        </div>
      )
    },
    size: 150,
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('id')}</div>
    ),
  },
  // {
  //   accessorKey: 'key',
  //   header: 'Đáp án',
  //   size: 150,
  //   cell: ({ row }) => {
  //     const options = row.original.options
  //     const getCorrectAnswer = (
  //       options: Record<string, OptionDetails>
  //     ): string | null => {
  //       for (const key in options) {
  //         if (options[key]?.correct_answer === 1) {
  //           return key
  //         }
  //       }
  //       return null
  //     }

  //     const correctAnswerKey = getCorrectAnswer(options)

  //     return (
  //       <div className="text-center capitalize">
  //         {correctAnswerKey !== null ? `Option ${correctAnswerKey}` : 'N/A'}
  //       </div>
  //     )
  //   },
  // },
  {
    accessorKey: 'difficulty',
    size: 200,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center justify-center"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }
              >
                Độ khó
                <span className="absolute -right-2 flex items-center">
                  <ArrowUpDown />
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>Độ khó:...</HoverCardContent>
          </HoverCard>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-center capitalize">{row.getValue('difficulty')}</div>
    ),
  },
  {
    accessorKey: 'discrimination',
    size: 200,
    header: ({ column }) => {
      return (
        <div className="flex items-center justify-center">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center justify-center"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }
              >
                Độ phân cách
                <span className="absolute -right-2 flex items-center">
                  <ArrowUpDown />
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>Có nghĩa là gì</HoverCardContent>
          </HoverCard>
        </div>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('discrimination')}</div>
    ),
  },
  {
    accessorKey: 'difficulty_group',
    header: ({ column }) => {
      const difficultyOptions = [
        { label: 'Tất cả', value: null }, // No filter, show all
        { label: 'Quá Khó', value: { min: 0, max: 0.25 } },
        { label: 'Khó', value: { min: 0.25, max: 0.5 } },
        // { label: 'Trung bình', value: { min: 0.3, max: 0.5 } },
        { label: 'Dễ', value: { min: 0.5, max: 0.75 } },
        { label: 'Quá Dễ', value: { min: 0.75, max: 1 } },
      ]
      return (
        <DropdownMenu>
          <HoverCard>
            <div className="flex items-center justify-center">
              <HoverCardTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center justify-center"
                  >
                    <p>Độ khó</p>
                    <span className="absolute -right-2 flex items-center">
                      <ArrowUpDown />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </HoverCardTrigger>
              <DropdownMenuContent className="w-30">
                {/* Dropdown items for each difficulty option */}
                {difficultyOptions.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={() => column.setFilterValue(item.value)}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
            <HoverCardContent>Có nghĩa là gì</HoverCardContent>
          </HoverCard>
        </DropdownMenu>
      )
    },
    size: 200,
    cell: ({ row }) => {
      const value = row.getValue('difficulty') as number
      let displayValue, variant: BadgeProps['variant']
      if (value < 0.25) {
        displayValue = 'Quá Khó'
        variant = 'veryHard'
      } else if (value < 0.5) {
        displayValue = 'Khó'
        variant = 'hard'
      } else if (value < 0.75) {
        displayValue = 'Dễ'
        variant = 'easy'
      } else {
        displayValue = 'Quá Dễ'
        variant = 'veryEasy'
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
    filterFn: (row, _, value) => {
      console.log('row', row)
      const pDifficulty = row.getValue('difficulty') as number
      if (!value) {
        return true // No filter, include all rows
      }

      // If a difficulty range is selected, check if p_difficulty falls within the range
      if (value.min !== undefined && value.max !== undefined) {
        return pDifficulty >= value.min && pDifficulty < value.max
      }
      return false // Default case: no match
    },
  },
  {
    accessorKey: 'discrimination_group',
    header: ({ column }) => {
      // Define the discrimination categories and their numeric ranges
      const discriminationOptions = [
        { label: 'Tất cả', value: null }, // No filter, show all
        { label: 'Kém', value: { min: -5, max: 0.1 } },
        { label: 'Tạm được', value: { min: 0.1, max: 0.3 } },
        { label: 'Tốt', value: { min: 0.3, max: 1 } },
        // { label: 'Tạm được', value: { min: 0.7, max: 1 } },
      ]

      return (
        <DropdownMenu>
          <HoverCard>
            <div className="flex items-center justify-center">
              <HoverCardTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative flex items-center justify-center"
                  >
                    <p>Phân cách</p>
                    <span className="absolute -right-2 flex items-center">
                      <ArrowUpDown />
                    </span>
                  </Button>
                </DropdownMenuTrigger>
              </HoverCardTrigger>
              <DropdownMenuContent className="w-30">
                {/* Dropdown items for each discrimination option */}
                {discriminationOptions.map((item) => (
                  <DropdownMenuItem
                    key={item.label}
                    onClick={() => column.setFilterValue(item.value)}
                  >
                    <span>{item.label}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </div>
            <HoverCardContent>Có nghĩa là gì</HoverCardContent>
          </HoverCard>
        </DropdownMenu>
      )
    },
    size: 200,
    cell: ({ row }) => {
      const value = row.getValue('discrimination') as number
      let displayValue, variant: BadgeProps['variant']

      // Categorize discrimination based on the numeric value of discrimination
      if (value < 0.1) {
        displayValue = 'Kém'
        variant = 'veryHard'
      } else if (value >= 0.1 && value < 0.3) {
        displayValue = 'Tạm được'
        variant = 'hard'
      } else if (value >= 0.3) {
        displayValue = 'Tốt'
        variant = 'medium'
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
    // Custom filter function based on discrimination
    filterFn: (row, _, value) => {
      const pDiscrimination = row.getValue('discrimination') as number
      if (!value) {
        return true // No filter, include all rows
      }

      // If a discrimination range is selected, check if discrimination falls within the range
      if (value.min !== undefined && value.max !== undefined) {
        return pDiscrimination >= value.min && pDiscrimination < value.max
      }
      return false // Default case: no match
    },
  },
  {
    accessorKey: 'r_pbis',
    size: 200,
    header: ({ column }) => {
      return (
        <HoverCard>
          <div className="flex items-center justify-center">
            <HoverCardTrigger asChild>
              <Button
                variant="ghost"
                className="relative flex items-center justify-center"
                onClick={() =>
                  column.toggleSorting(column.getIsSorted() === 'asc')
                }
              >
                Hệ số r_pbis
                <span className="absolute -right-2 flex items-center">
                  <ArrowUpDown />
                </span>
              </Button>
            </HoverCardTrigger>
            <HoverCardContent>Có nghĩa là gì</HoverCardContent>
          </div>
        </HoverCard>
      )
    },
    cell: ({ row }) => (
      <div className="text-center">{row.getValue('r_pbis')}</div>
    ),
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

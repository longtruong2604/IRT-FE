import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'

type DataType = {
  name: keyof typeof CellRestrain
  A: number
  B: number
  C: number
  D: number
}[]

const data: DataType = [
  {
    name: 'Phân cách',
    A: 0.1,
    B: 0.5,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'Độ khó',
    A: 0.3,
    B: 0.6,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'rpbis',
    A: 0.1,
    B: 0.9,
    C: 0.9,
    D: 0.5,
  },
  {
    name: 'Tỉ lệ',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
  {
    name: 'Nhóm cao',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
  {
    name: 'Nhóm thấp',
    A: 0.1,
    B: 0.1,
    C: 0.7,
    D: 0.1,
  },
]

const CellRestrain = {
  'Nhóm cao': {
    first: 0.2,
    second: 0.7,
  },
  'Độ khó': {
    first: 0.2,
    second: 0.7,
  },
  rpbis: {
    first: 0.2,
    second: 0.7,
  },
  'Tỉ lệ': {
    first: 0.2,
    second: 0.7,
  },
  'Nhóm thấp': {
    first: 0.2,
    second: 0.7,
  },
  'Phân cách': {
    first: 0.2,
    second: 0.7,
  },
} as const

const CellItem = (key: keyof typeof CellRestrain, value: number) => {
  const { first, second } = CellRestrain[key]
  let className = ''
  if (value < first || value > second) {
    className = 'text-red-500'
  } else {
    className = 'text-green-500'
  }

  return (
    <TableCell className={cn('font-semibold', className)}>{value}</TableCell>
  )
}

export function MetricsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Chỉ số</TableHead>
          <TableHead>A</TableHead>
          <TableHead>B</TableHead>
          <TableHead>C</TableHead>
          <TableHead>D</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item) => (
          <TableRow key={item.name}>
            <TableCell className="font-medium">{item.name}</TableCell>
            {CellItem(item.name, item.A)}
            {CellItem(item.name, item.B)}
            {CellItem(item.name, item.C)}
            {CellItem(item.name, item.D)}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

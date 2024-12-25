import {
  LineChart,
  Line,
  CartesianGrid,
  Legend,
  XAxis,
  YAxis,
  Label,
} from 'recharts'

import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { Card, CardContent } from '@/components/ui/card'

const chartConfig = {
  group: {
    label: 'Nhóm',
    color: 'hsl(var(--chart-1))',
  },
  A: {
    label: 'A',
    color: 'hsl(var(--chart-A))',
  },
  B: {
    label: 'B',
    color: 'hsl(var(--chart-B))',
  },
  C: {
    label: 'C',
    color: 'hsl(var(--chart-C))',
  },
  D: {
    label: 'D',
    color: 'hsl(var(--chart-D))',
  },
} satisfies ChartConfig

export function CustomAreaChart<T>({ data }: { data: T[] }) {
  return (
    <Card className="">
      <CardContent className="p-4 pb-0">
        <ChartContainer config={chartConfig} className="">
          <LineChart
            accessibilityLayer
            data={data}
            margin={{
              left: 0,
              right: 10,
              bottom: 25,
              top: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="group"
              tickLine={false}
              // axisLine={false}
              tickMargin={8}
              height={25}
              tickFormatter={(value) => value.slice(0, 3)}
            >
              <Label position="bottom" value={'Nhóm'} offset={5} />
            </XAxis>
            <YAxis width={30} tickLine={false} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dot" />}
            />
            <Line
              dataKey="A"
              type="natural"
              stroke="hsl(var(--chart-C))"
              strokeWidth={2.5} // Thicker for emphasis
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="B"
              type="natural"
              stroke="hsl(var(--chart-B))"
              strokeDasharray="5 5" // Dotted line for differentiation
              strokeWidth={1.5}
              dot={{ r: 3 }}
              activeDot={{ r: 4 }}
            />
            <Line
              dataKey="C"
              type="natural"
              stroke="hsl(var(--chart-A))"
              strokeDasharray="5 5" // Dashed line for differentiation
              strokeWidth={1.5}
              dot={{ r: 3 }}
              activeDot={{ r: 4 }}
            />
            <Line
              dataKey="D"
              type="natural"
              stroke="hsl(var(--chart-D))"
              strokeDasharray="5 3" // Smaller dashes
              strokeWidth={1.5}
              dot={{ r: 3 }}
              activeDot={{ r: 4 }}
            />
            <Legend
              formatter={(value) => (value === 'A' ? `A (Correct)` : value)}
              verticalAlign="top"
              wrapperStyle={{ paddingBottom: 10 }}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

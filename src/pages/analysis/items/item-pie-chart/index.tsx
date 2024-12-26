import { Label, Legend, Pie, PieChart } from 'recharts'

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import { getStatsLabel } from '@/lib/utils'
import { RelevantKeys } from '@/types/ctt-analysis.type'
import { useState } from 'react'

const groupData: Record<
  RelevantKeys,
  { group: string; count: number; fill: string }[]
> = {
  difficulty: [
    { group: 'easy', count: 100, fill: 'var(--very-good-text)' },
    { group: 'medium', count: 200, fill: 'var(--bad-text)' },
    { group: 'hard', count: 300, fill: 'var(--very-bad-text)' },
  ],
  discrimination: [
    { group: 'easy', count: 300, fill: 'var(--very-good-text)' },
    { group: 'medium', count: 200, fill: 'var(--bad-text)' },
    { group: 'hard', count: 100, fill: 'var(--very-bad-text)' },
  ],
  r_pbis: [
    { group: 'easy', count: 200, fill: 'var(--very-good-text)' },
    { group: 'medium', count: 100, fill: 'var(--bad-text)' },
    { group: 'hard', count: 300, fill: 'var(--very-bad-text)' },
  ],
}

const chartConfig = {
  count: {
    label: 'Count',
  },
  easy: {
    label: 'Dễ',
    color: 'var(--very-good-text)',
  },
  medium: {
    label: 'Trung bình',
    color: 'var(--bad-text)',
  },
  hard: {
    label: 'Khó',
    color: 'var(--very-bad-text)',
  },
} satisfies ChartConfig

export function ItemPieChart() {
  const [selectedGroup, setSelectedGroup] = useState('difficulty')

  const currentData = groupData[selectedGroup as keyof typeof groupData]

  // const totalCount = React.useMemo(() => {
  //   return currentData.reduce((acc, curr) => acc + curr.count, 0)
  // }, [currentData])

  return (
    <Card className="flex h-fit flex-col">
      <CardHeader className="pb-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-l font-semibold">Phân loại</CardTitle>
          <Select value={selectedGroup} onValueChange={setSelectedGroup}>
            <SelectTrigger className="w-[140px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(groupData).map(([key, _]) => (
                <SelectItem key={key} value={key}>
                  {getStatsLabel(key as RelevantKeys)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="flex-1 pb-5">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={currentData}
              dataKey="count"
              nameKey="group"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {/* {totalCount.toLocaleString()} */}
                          60
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Câu hỏi
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
            <Legend />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

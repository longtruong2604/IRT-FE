import { CustomAreaChart } from '@/components/chart/area-chart'
import { ReusableTable } from '@/components/table/reusable-table'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { useGetItemsResultQuery } from '@/queries/useAnalyze'
import { useParams } from 'react-router-dom'
import { columns } from './columns'
import { MetricsTable } from './metric-table'
import { useMemo } from 'react'

const chartData = [
  { group: '1', A: 10, B: 20, C: 43, D: 60 },
  { group: '2', A: 15, B: 10, C: 137, D: 48 },
  { group: '3', A: 20, B: 25, C: 61, D: 177 },
  { group: '4', A: 5, B: 30, C: 145, D: 78 },
  { group: '5', A: 20, B: 35, C: 26, D: 96 },
]

const ItemTable = () => {
  const { id } = useParams() as { id: string }
  const getItemsResult = useGetItemsResultQuery(id)

  const responseArray = useMemo(() => {
    const data = getItemsResult.data?.data || {}
    return Object.entries(data).map(([key, value]) => ({
      id: key,
      ...value,
    }))
  }, [getItemsResult.data])

  const collapsibleContent = (row: number) => (
    <CollapsibleContent asChild>
      <tr>
        <td colSpan={3} className="p-5">
          <MetricsTable data={responseArray[row].options} />
        </td>
        <td colSpan={4}>
          <CustomAreaChart<(typeof chartData)[number]> data={chartData} />
        </td>
      </tr>
    </CollapsibleContent>
  )

  return (
    <ReusableTable<(typeof responseArray)[number]>
      key={responseArray.length}
      columns={columns}
      data={responseArray}
      collapsibleContent={collapsibleContent}
      isPending={getItemsResult.isPending}
    />
  )
}
export default ItemTable

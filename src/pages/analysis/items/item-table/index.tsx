import { CustomAreaChart } from '@/components/chart/area-chart'
import { ReusableTable } from '@/components/table/reusable-table'
import { CollapsibleContent } from '@/components/ui/collapsible'
import { useGetItemsResultQuery } from '@/queries/useAnalyze'
import { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { columns } from './columns'
import { MetricsTable } from './metric-table'
import { Skeleton } from '@/components/ui/skeleton'

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
]

const ItemTable = () => {
  const { id } = useParams() as { id: string }
  const { data: itemData, isLoading } = useGetItemsResultQuery(id)

  const data = itemData?.data || {}
  const responseArray = useMemo(
    () =>
      Object.entries(data).map(([key, value]) => ({
        id: key,
        ...value,
      })),
    [data]
  )
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
    <>
      {isLoading ? (
        <Skeleton className="h-[600px] w-[1030px] rounded-full" />
      ) : (
        <ReusableTable<(typeof responseArray)[number]>
          columns={columns}
          data={responseArray}
          collapsibleContent={collapsibleContent}
        />
      )}
    </>
  )
}
export default ItemTable

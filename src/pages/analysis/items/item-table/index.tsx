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
      <>
        <tr>
          <td colSpan={7} className="rounded-md border p-5">
            <div className="flex flex-col gap-4">
              <div className="text-lg font-semibold text-gray-800">
                {responseArray[row].content.question}
              </div>
              <div className="grid grid-cols-4 gap-4">
                {responseArray[row].content.option.map((option) => (
                  <div className="rounded-md border border-blue-200 bg-blue-50 p-3 text-center font-medium text-blue-600 shadow-sm">
                    {option}
                  </div>
                ))}
              </div>
            </div>
          </td>
        </tr>

        <tr>
          <td colSpan={7} className="p-5">
            <div className="flex items-center gap-4">
              <div className="basis-[50%]">
                <MetricsTable data={responseArray[row].options} />
              </div>
              <div className="basis-[50%]">
                <CustomAreaChart<(typeof chartData)[number]> data={chartData} />
              </div>
            </div>
          </td>
        </tr>
      </>
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

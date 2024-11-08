import { ItemPieChart } from './item-pie-chart'
import { DataTableDemo } from './item-table'

const Items = () => {
  return (
    <div className="flex gap-5 p-5">
      <DataTableDemo />
      <ItemPieChart />
    </div>
  )
}
export default Items

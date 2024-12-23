import { ItemPieChart } from './item-pie-chart'
import ItemTable from './item-table'
import ReviewQuestionsCard from './review-question-card'

const Items = () => {
  return (
    <div className="flex gap-5 p-5">
      <ItemTable />
      <div className="flex flex-col gap-5">
        <ReviewQuestionsCard />
        <ItemPieChart />
      </div>
    </div>
  )
}
export default Items

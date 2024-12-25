import { ItemPieChart } from './item-pie-chart'
import ItemTable from './item-table'
import ReviewQuestionsCard from './review-question-card'

const Items = () => {
  return (
    <div className="flex gap-5 p-5">
      <div className="grow">
        <ItemTable />
      </div>
      <div className="flex shrink-0 basis-[270px] flex-col gap-5">
        <ReviewQuestionsCard />
        <ItemPieChart />
      </div>
    </div>
  )
}
export default Items

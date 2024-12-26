import { Blocks, ChartNoAxesColumn, GraduationCap, Split } from 'lucide-react'
import { BarLineChart } from './bar-line-chart'
import { LargeBarChart } from './barchart'
import OverallData from './overall-data'
import { useParams } from 'react-router-dom'
import { useGetGeneralDetailsQuery } from '@/queries/useAnalyze'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { HoverCard, HoverCardContent } from '@/components/ui/hover-card'
import { HoverCardTrigger } from '@radix-ui/react-hover-card'

const OverallStats = [
  {
    icon: <GraduationCap color="#F6A723" />,
    title: 'Điểm trung bình',
    tootlTip: 'Điểm trung bình của học sinh',
    name: 'average_score',
    bgColor: '#FFFBEB',
  },
  {
    icon: <Blocks color="#007AFF" />,
    title: 'Độ khó',
    tootlTip: 'Độ khó của câu hỏi',
    name: 'average_difficulty',
    bgColor: '#EFF6FF',
  },
  {
    icon: <Split color="#ED4F9D" />,
    name: 'average_discrimination',
    tootlTip: 'Độ phân cách của câu hỏi',
    title: 'Độ phân cách',
    bgColor: '#FDF2F8',
  },
  {
    icon: <ChartNoAxesColumn color="#38BDF8" />,
    title: 'Hệ số R_PBIS',
    tootlTip: 'Hệ số tương quan giữa điểm số và câu hỏi',
    name: 'average_rpbis',
    bgColor: '#F8FAFC',
  },
] as const

const placeholderData: CTTGeneralDetails = {
  general: {
    total_students: 0,
    total_questions: 0,
    total_option: 0,
  },
  histogram: {
    score: [],
    difficulty: [],
    discrimination: [],
    r_pbis: [],
  },
  average: {
    average_score: 0,
    average_difficulty: 0,
    average_discrimination: 0,
    average_rpbis: 0,
  },
}

const Analysis = () => {
  const { id } = useParams()
  const getGeneralDetails = useGetGeneralDetailsQuery(id!)
  const {
    data: { general, histogram, average },
  } = getGeneralDetails.data ?? { data: placeholderData }

  return (
    <div className="m-10 grid grid-cols-12 gap-4">
      {OverallStats.map((stat, index) => (
        <HoverCard>
          <HoverCardTrigger asChild>
            <div
              key={index}
              className="col-span-3 flex items-center justify-center gap-5 rounded-lg border border-neutral-200 bg-background py-6 text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
            >
              <div
                className={`flex size-[48px] items-center justify-center rounded-lg`}
                style={{ backgroundColor: stat.bgColor }}
              >
                {stat.icon}
              </div>
              <div className="flex flex-col gap-1">
                <div className="text-[24px] font-bold leading-[1.25] tracking-[0.2px]">
                  {average[stat.name]}
                </div>
                <div className="text-[14px] font-semibold leading-[1.6] tracking-[0.2px] text-muted-foreground">
                  {stat.title}
                </div>
              </div>
            </div>
          </HoverCardTrigger>
          <HoverCardContent>{stat.tootlTip}</HoverCardContent>
        </HoverCard>
      ))}

      <div className="col-span-8 rounded-lg bg-background">
        <LargeBarChart data={histogram.score} />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <OverallData data={general} />
      </div>

      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố độ phân cách'}
          data={histogram.discrimination}
          type="discrimination"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố độ khó'}
          data={histogram.difficulty}
          type="difficulty"
        />
      </div>
      <div className="col-span-4 rounded-lg bg-background">
        <BarLineChart
          isLoading={getGeneralDetails.isLoading}
          name={'Biểu đồ phân bố hệ số tương quan'}
          data={histogram.r_pbis}
          type="r_pbis"
        />
      </div>
    </div>
  )
}
export default Analysis

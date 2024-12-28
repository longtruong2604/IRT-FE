import HoverCardIcon from '@/components/reusable-hover-with-icon'
import { Button } from '@/components/ui/button'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { Blocks, ChartNoAxesColumn, GraduationCap, Split } from 'lucide-react'
import { useState } from 'react'

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

const AverageDetails = ({
  average,
  total_questions,
}: {
  average: CTTGeneralDetails['average']
  total_questions: number
}) => {
  const [showOutOfTen, setShowOutOfTen] = useState(true)

  const calculateScore = (value: number, name: string) => {
    if (name === 'average_score') {
      return showOutOfTen
        ? ((value / total_questions) * 10).toFixed(3)
        : value.toFixed(3)
    }
    return value.toFixed(3)
  }
  return (
    <>
      {OverallStats.map((stat, index) => (
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
            <div className="flex gap-1 text-[24px] font-bold leading-[1.25] tracking-[0.2px]">
              {calculateScore(average[stat.name], stat.name)}
              {stat.name === 'average_score' && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => setShowOutOfTen(!showOutOfTen)}
                >
                  {showOutOfTen ? '/ 10' : `/ ${total_questions}`}
                </Button>
              )}
              <HoverCardIcon className="">{stat.tootlTip}</HoverCardIcon>
            </div>
            <div className="flex gap-1 text-[14px] font-semibold leading-[1.6] tracking-[0.2px] text-muted-foreground">
              {stat.title}
              <HoverCardIcon size={11} className="">
                {stat.tootlTip}
              </HoverCardIcon>
            </div>
          </div>
        </div>
      ))}
    </>
  )
}
export default AverageDetails

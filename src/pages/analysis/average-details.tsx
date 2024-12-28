import HoverCardIcon from '@/components/reusable-hover-with-icon'
import { Button } from '@/components/ui/button'
import { CTTGeneralDetails } from '@/types/ctt-analysis.type'
import { MathJax, MathJaxContext } from 'better-react-mathjax'
import { Blocks, ChartNoAxesColumn, GraduationCap, Split } from 'lucide-react'
import { useState } from 'react'

const OverallStats = [
  {
    icon: <GraduationCap color="#F6A723" />,
    title: 'Điểm trung bình',
    tootlTip:
      'Điểm trung bình của học sinh trong bài kiểm tra. Điểm cao cho thấy bài kiểm tra dễ, điểm thấp cho thấy bài kiểm tra khó hoặc thí sinh chưa nắm vững kiến thức.',
    name: 'average_score',
    bgColor: '#FFFBEB',
  },
  {
    icon: <Blocks color="#007AFF" />,
    title: 'Độ khó',
    tootlTip: (
      <MathJaxContext>
        <div className="flex flex-col gap-2 text-center">
          <p>
            Chỉ số độ khó đo lường tỷ lệ thí sinh trả
            <br />
            lời đúng một câu hỏi trên tổng thí sinh:
          </p>
          <MathJax>
            {
              '\\(p = \\frac{\\text{Số lượng thí sinh đúng}}{\\text{Tổng số thí sinh}}\\)'
            }
          </MathJax>
          <p>
            Câu hỏi càng dễ khi độ gần 1 (tỉ lệ đúng cao),
            <br />
            câu hỏi khó khi gần 0 (tỉ lệ chọn đúng thấp).
          </p>
        </div>
      </MathJaxContext>
    ),
    name: 'average_difficulty',
    bgColor: '#EFF6FF',
  },
  {
    icon: <Split color="#ED4F9D" />,
    name: 'average_discrimination',
    tootlTip: (
      <MathJaxContext>
        <div className="flex w-full flex-col gap-2 text-center">
          <p>
            Độ phân cách thể hiện khả năng phân biệt của một câu hỏi
            <br />
            giữa thí sinh có năng lực cao và năng lực thấp:
          </p>
          <MathJax>
            {
              '\\(\\text{Độ p.cách} = \\text{Tỉ lệ nhóm cao trả lời đúng} - \\text{Tỉ lệ nhóm thấp trả lời đúng}\\)'
            }
          </MathJax>
          <p>
            Câu hỏi có độ phân cách càng cao có nghĩa là câu hỏi đó phân biệt
            <br />
            tốt giữa nhóm thí sinh có năng lực cao và thấp.
          </p>
        </div>
      </MathJaxContext>
    ),
    title: 'Độ phân cách',
    bgColor: '#FDF2F8',
  },
  {
    icon: <ChartNoAxesColumn color="#38BDF8" />,
    title: 'Hệ số R_PBIS',
    tootlTip: (
      <MathJaxContext>
        <div className="flex flex-col gap-2">
          <p>
            Chỉ số tương quan đo lường mối liên hệ giữa điểm câu hỏi và điểm số
            tổng thể, dao động từ −1.0 đến 1.0:
          </p>
          <MathJax className="text-center">
            {
              '\\(r_{pbis} = \\frac{\\bar{X}_1 - \\bar{X}_0}{s} \\cdot \\sqrt{\\frac{p(1-p)}{n}}\\)'
            }
          </MathJax>
          <p>Trong đó:</p>
          <ul>
            <li>
              <MathJax>
                {'\\(\\bar{X}_1\\)'}: Điểm trung bình của nhóm thí sinh trả lời
                đúng câu hỏi.
              </MathJax>
            </li>
            <li>
              <MathJax>
                {'\\(\\bar{X}_0\\)'}: Điểm trung bình của nhóm thí sinh trả lời
                sai câu hỏi.
              </MathJax>
            </li>
            <li>
              <MathJax>
                {'\\(s\\)'}: Độ lệch chuẩn của điểm số tổng thể.
              </MathJax>
            </li>
            <li>
              <MathJax>
                {'\\(p\\)'}: Tỷ lệ thí sinh trả lời đúng câu hỏi.
              </MathJax>
            </li>
            <li>
              <MathJax>{'\\(n\\)'}: Tổng số thí sinh.</MathJax>
            </li>
          </ul>
        </div>
        <p className="mt-2">
          Giá trị cao: Câu hỏi tốt, phân biệt rõ giữa thí sinh giỏi và yếu.
          <br />
          Giá trị âm: Câu hỏi kém chất lượng, thí sinh yếu trả lời đúng nhiều
          hơn thí sinh giỏi, có thể do nhầm lẫn hoặc đáp án sai.
        </p>
      </MathJaxContext>
    ),
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
              {/* <HoverCardIcon className="">{stat.tootlTip}</HoverCardIcon> */}
            </div>
            <div className="flex gap-1 text-[14px] font-semibold leading-[1.6] tracking-[0.2px] text-muted-foreground">
              {stat.title}
              <HoverCardIcon size={11} className="w-fit max-w-[500px]">
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

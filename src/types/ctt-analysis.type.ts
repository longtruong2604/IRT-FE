export type CTTAnalysis = {
  [key: string]: {
    difficulty: number
    difficulty_category: string
    discrimination: number
    discrimination_category: string
    r_pbis: number
    options: {
      [optionKey: string]: OptionDetails
    }
  }
}

export type CTTGeneralDetails = Readonly<{
  general: {
    total_students: number
    total_questions: number
    total_option: number
  }
  histogram: {
    score: Record<string, number>[]
    difficulty: Record<string, number>[]
    discrimination: Record<string, number>[]
    r_pbis: Record<string, number>[]
  }
  average: AverageDetails
}>

export type OptionDetails = Readonly<{
  selected_by: number
  top_selected: number
  bottom_selected: number
  ratio: number
  discrimination: number
  r_pbis: number
}>

export type AverageDetails = Readonly<{
  average_score: number
  average_discrimination: number
  average_difficulty: number
  average_rpbis: number
}>

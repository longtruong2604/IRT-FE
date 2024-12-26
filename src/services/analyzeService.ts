import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/popup-dialog'
import { CTTAnalysisResult, CTTGeneralDetails } from '@/types/ctt-analysis.type'

export const cttAnalyzeService = {
  analyze({
    projectName,
    numberOfChoices,
    numberOfGroup,
    groupPercentage,
    correlationRpbis,
    questionFile,
    answerFile,
    questionSetFile,
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysisResult>> {
    console.log(
      projectName,
      numberOfChoices,
      numberOfGroup,
      groupPercentage,
      correlationRpbis,
      questionFile,
      answerFile,
      questionSetFile
    )
    const formData = new FormData()
    formData.append('exam_file', questionFile[0])
    formData.append('result_file', answerFile[0])
    formData.append('question_bank_file', questionSetFile[0])

    return http.post<CTTAnalysisResult>('/ctt/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getResult(id: string): Promise<ApiResponse<CTTAnalysisResult>> {
    return http.get<CTTAnalysisResult>(`/ctt/items/${id}`)
  },

  getGeneralDetails(id: string): Promise<ApiResponse<CTTGeneralDetails>> {
    return http.get<CTTGeneralDetails>(`/ctt/general-detail/${id}`)
  },

  // getAverageDetails(id: string): Promise<ApiResponse<AverageDetails>> {
  //   console.log('getAverageDetails')
  //   return http.get<AverageDetails>(`/ctt/average-detail/${id}`)
  // },
}

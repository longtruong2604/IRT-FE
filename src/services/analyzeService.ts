import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/create-analysis-form'
import { CTTAnalysisResult, CTTGeneralDetails } from '@/types/ctt-analysis.type'

export const cttAnalyzeService = {
  analyze({
    projectName,
    numberOfGroup,
    groupPercentage,
    correlationRpbis,
    questionFile,
    answerFile,
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysisResult>> {
    console.log(
      projectName,
      numberOfGroup,
      groupPercentage,
      correlationRpbis,
      questionFile,
      answerFile
    )
    const formData = new FormData()
    formData.append('exam_file', questionFile[0])
    formData.append('result_file', answerFile[0])

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

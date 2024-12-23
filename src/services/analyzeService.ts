import http, { ApiResponse } from '@/lib/httpClient'
import { CTTAnalysisRequest } from '@/pages/dashboard/popup-dialog'
import { CTTAnalysis, CTTGeneralDetails } from '@/types/ctt-analysis.type'

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
  }: CTTAnalysisRequest): Promise<ApiResponse<CTTAnalysis>> {
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
    formData.append('file', answerFile[0])

    return http.post<CTTAnalysis>('/ctt/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
  },
  getResult(id: string): Promise<ApiResponse<CTTAnalysis>> {
    return http.get<CTTAnalysis>(`/ctt/items/${id}`)
  },

  getGeneralDetails(id: string): Promise<ApiResponse<CTTGeneralDetails>> {
    return http.get<CTTGeneralDetails>(`/ctt/general-detail/${id}`)
  },

  // getAverageDetails(id: string): Promise<ApiResponse<AverageDetails>> {
  //   console.log('getAverageDetails')
  //   return http.get<AverageDetails>(`/ctt/average-detail/${id}`)
  // },
}

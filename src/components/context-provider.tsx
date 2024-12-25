import { createContext, useContext, useState, ReactNode } from 'react'

// Define the context type
interface AppProviderType {
  hasCreatedAnalysis: boolean
  setHasCreatedAnalysis: (value: boolean) => void
}

// Create the context
const AppProvider = createContext<AppProviderType | undefined>(undefined)

// Provider component
export const AnalysisProvider = ({ children }: { children: ReactNode }) => {
  const [hasCreatedAnalysis, setHasCreatedAnalysis] = useState<boolean>(false)

  return (
    <AppProvider.Provider value={{ hasCreatedAnalysis, setHasCreatedAnalysis }}>
      {children}
    </AppProvider.Provider>
  )
}

// Custom hook for consuming the context
export const useApp = () => {
  const context = useContext(AppProvider)
  if (!context) {
    throw new Error('useAppProvider must be used within an AnalysisProvider')
  }
  return context
}
